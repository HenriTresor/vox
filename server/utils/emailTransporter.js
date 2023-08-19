import nodemailer from 'nodemailer'
import { config } from 'dotenv'

config()

const sendEmail = async (email, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.PORT,
            secure: false,
            service: 'brevo',
            auth: {
                user: process.env.LOGIN,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.LOGIN,
            to: email,
            subject: subject,
            html: html ? html : null,
            text: !html && text
        });
        return true
    } catch (error) {
        return error.message
    }
};

export default sendEmail