import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";

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
            await user.save();

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
}
