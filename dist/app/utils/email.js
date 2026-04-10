"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const transporter = nodemailer_1.default.createTransport({
    host: env_1.envVars.EMAIL_SENDER.SMTP_HOST,
    port: Number(env_1.envVars.EMAIL_SENDER.SMTP_PORT),
    secure: Number(env_1.envVars.EMAIL_SENDER.SMTP_PORT) === 465,
    auth: {
        user: env_1.envVars.EMAIL_SENDER.SMTP_USER,
        pass: env_1.envVars.EMAIL_SENDER.SMTP_PASS,
    },
});
const sendEmail = async (options) => {
    const { to, subject, html } = options;
    await transporter.sendMail({
        from: `"Portfolio Server" <${env_1.envVars.EMAIL_SENDER.SMTP_FROM}>`,
        to,
        subject,
        html,
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map