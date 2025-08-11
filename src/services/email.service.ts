import nodemailer, {Transporter} from 'nodemailer';
import { configs } from '../configs/config';

export class EmailService {
    private transporter:Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: configs.SMTP_EMAIL,
                pass: configs.SMTP_PASSWORD,

            },
        });

    }

    async sendToManager(message: string): Promise<void> {
        try {
            const mailOptions = {
                from: configs.SMTP_EMAIL,
                to: configs.SMTP_MANAGER_EMAIL,
                subject: 'URGENT: Ad Moderation Required',
                html: `<p><b>WARNING!</b> Manual ad moderation is required.</p>
               <p>${message}</p>`,
            };

            await this.transporter.sendMail(mailOptions);
            console.log('Message to manager sent successfully!');
        } catch (error) {
            console.error('Error sending message to manager:', error);
            throw error;
        }
    }

}

export const emailService = new EmailService();

