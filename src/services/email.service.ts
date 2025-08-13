import nodemailer, {Transporter} from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import {configs} from '../configs/config';
import {emailConstants} from '../constants/email.constant';
import {EmailTypeEnum} from '../enums/email-type.enum';
import {EmailTypeToPayload} from '../types/email-type-to-payload.type';

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


    public async sendToManager(message: string): Promise<void> {
        try {
            const mailOptions = {
                from: `"No Reply" <${configs.SMTP_EMAIL}>`,
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

