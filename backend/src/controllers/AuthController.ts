import { Request, Response } from "express";
import User from "../models/User";
import { comparePassword, hashPassword } from "../utils/auth";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJwt } from "../utils/jwt";
import { generateToken } from "../utils/token";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                res.status(409).json({ message: 'User already exists' });
                return;
            }
            const user = new User(req.body);
            user.password = await hashPassword(password);
            user.token = generateToken();
            await user.save()

            await AuthEmail.sendConfirmationEmail({
                name: user.name,
                email: user.email,
                token: user.token
            });
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ error: "There was an error creating the user" });
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        const { token } = req.body; 
        const user = await User.findOne({where: { token }});
        if(!user){
            const error = new Error('Token invalid');
            res.status(401).json({ error: error.message });
            return;
        }
        user.confirmed = true;
        user.token = null;
        await user.save();
        res.json("Account confirmed successfully");
    }

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if(!user){
            const error = new Error('User does not exist');
            res.status(404).json({ error: error.message });
            return;
        }

        if(!user.confirmed){
            const error = new Error('User not confirmed');
            res.status(403).json({ error: error.message });
            return;
        }

        const passwordMatch = await comparePassword(password, user.password);
        if(!passwordMatch){
            const error = new Error('Password does not match');
            res.status(401).json({ error: error.message });
            return;
        }

        const token = generateJwt(user.id)
        res.json(token);
    }
}
