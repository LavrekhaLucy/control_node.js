import nodemailer, {Transporter} from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import {configs} from '../configs/config';
import {emailConstants} from '../constants/email.constant';
import {EmailTypeEnum} from '../enums/email-type.enum';
import {EmailTypeToPayload} from '../types/email-type-to-payload.type';
import {ICar} from '../interfaces/car-interface';

export class EmailService {
    private transporter: Transporter;

    constructor() {

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            from: 'No reply',
            auth: {
                user: configs.SMTP_EMAIL,
                pass: configs.SMTP_PASSWORD,
            },
        });

        const hbsOptions = {
            viewEngine: {
                extname: '.hbs',
                defaultLayout: 'main',
                layoutsDir: path.join(process.cwd(), 'src', 'templates', 'layouts'),
                partialsDir: path.join(process.cwd(), 'src', 'templates', 'partials'),
            },
            viewPath: path.join(process.cwd(), 'src', 'templates', 'views'),
            extName: '.hbs',
        };


        this.transporter.use('compile', hbs(hbsOptions));
    }

    public async sendMail<T extends EmailTypeEnum>(
        type: T,
        to: string,
        context: EmailTypeToPayload[T]
        ): Promise<void> {
        const {subject, template} = emailConstants[type];
        const mailOptions = {
            from: `"No Reply" <${configs.SMTP_EMAIL}>`,
            to,
            subject,
            template,
            context: {
                ...context,
                frontUrl: configs.APP_FRONT_URL,
            },
        };

        await this.transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to} with template "${template}"`);
    }


    public async sendToManager(car: ICar, seller: { name: string; email: string }): Promise<void> {
        try {
            const message = `
                <p><b>Авто потребує ручної перевірки:</b></p>
                <ul>
                    <li>ID авто: ${car._id}</li>
                    <li>Назва: ${car.title}</li>
                    <li>Продавець: ${seller.name} (${seller.email})</li>
                    <li>Причина: оголошення не пройшло автоматичну модерацію (${car.editAttempts} спроб редагування або підозріла лексика)</li>
                    <li>Поточний статус: ${car.adStatus}</li>
                </ul>
                <p>Будь ласка, перевірте оголошення та прийміть рішення щодо його активації.</p>
            `;

            const mailOptions = {
                from: `"No Reply" <${configs.SMTP_EMAIL}>`,
                to: configs.SMTP_MANAGER_EMAIL,
                subject: `URGENT: Ad Moderation Required: ${car.title} (ID: ${car._id})`,
                html: message,
            };

            // from: `"No Reply" <${configs.SMTP_EMAIL}>`,
            //     to: configs.SMTP_MANAGER_EMAIL,
            //     subject: `🚨 Модерація оголошення: ${car.title} (ID: ${car._id})`,
            //     html: message,



            await this.transporter.sendMail(mailOptions);
            console.log('Message to manager sent successfully!');
        } catch (error) {
            console.error('Error sending message to manager:', error);
            throw error;
        }
    }
//     export const sendEmailToManager = async (car: ICar, seller: { name: string; email: string }) => {
//         const message = `
// Авто потребує ручної перевірки:
// - ID авто: ${car._id}
// - Назва: ${car.title}
// - Продавець: ${seller.name} (${seller.email})
// - Причина: оголошення не пройшло автоматичну модерацію (${car.editAttempts} спроб редагування або підозріла лексика)
// - Поточний статус: ${car.status}
//
// Будь ласка, перевірте оголошення та прийміть рішення щодо його активації.
//     `;
//
//         // Тут можна підключити реальну відправку email через nodemailer
//         console.log("Відправлено повідомлення менеджеру:\n", message);
//     };



}
export const emailService = new EmailService();

