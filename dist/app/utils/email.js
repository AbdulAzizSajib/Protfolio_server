import nodemailer from "nodemailer";
import { envVars } from "../config/env";
const transporter = nodemailer.createTransport({
    host: envVars.EMAIL_SENDER.SMTP_HOST,
    port: Number(envVars.EMAIL_SENDER.SMTP_PORT),
    secure: Number(envVars.EMAIL_SENDER.SMTP_PORT) === 465,
    auth: {
        user: envVars.EMAIL_SENDER.SMTP_USER,
        pass: envVars.EMAIL_SENDER.SMTP_PASS,
    },
});
export const sendEmail = async (options) => {
    const { to, subject, html } = options;
    await transporter.sendMail({
        from: `"Portfolio Server" <${envVars.EMAIL_SENDER.SMTP_FROM}>`,
        to,
        subject,
        html,
    });
};
//# sourceMappingURL=email.js.map