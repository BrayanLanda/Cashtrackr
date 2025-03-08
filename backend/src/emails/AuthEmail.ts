import { transport } from "../config/nodemailer";

type EmailType = {
    name: string;
    email: string;
    token: string;
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: 'Carolan <admin@cashtrackr,com>',
            to: user.email,
            subject: 'Email Confirmation',
            html: `
                <p>Hello ${user.name}</p>
                <p>Visit the following link</p>
                <a href="#">Confirm Email</a>
                <p>Enter your code: ${user.token}</p>
            `
        });        
    }

    static sendPasswordResetToken = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: 'Carolan <admin@cashtrackr,com>',
            to: user.email,
            subject: 'Reset Password',
            html: `
                <p>Hello ${user.name}</p>
                <p>Visit the following link</p>
                <a href="#">Reset your Password</a>
                <p>Enter your code: ${user.token}</p>
            `
        });        
    }
}