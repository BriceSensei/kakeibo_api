import { config } from "dotenv";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { TwigFormatter } from "./twig";

config();

export class Mail {
    __body?: string;
    __subject?: string;
    from: string = "kakeibo@pandacrp.com";
    to?: string;
    transporter: any;

    get subject(): string {
        if (this.__subject !== undefined) return this.__subject;

        try {
            return RegExp(/<title>(.*)<\/title>/).exec(this.__body!)![1]
        } catch (e) {
            console.error("Error extracting subject from twig template:", e);
            return "Kakeibo Mailer"
        }
    }

    set subject(value: string) { this.__subject = value; }

    set body(value: { path: string, variables: { [key: string]: any } }) {
        const twig = new TwigFormatter(value.path, value.variables)

        twig.format()

        this.__body = twig.body;

    }

    async send() {
        if (!this.transporter) this.connect();

        let mailOptions = {
            from: this.from,
            to: this.to!,
            subject: this.subject,
            html: this.__body,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            return { sucess: true, message: `Email sent successfully to ${this.to} as ${this.from}` }
        } catch (err) {
            return { error: `Error while sending the mail ${err}` }
        }
    }
    connect() {
        try {
            const smtpConfig: SMTPTransport.Options = {
                host: process.env.EMAILHOST,
                port: Number(process.env.EMAILPORT),
                secure: false,
                auth: {
                    user: process.env.EMAILUSER,
                    pass: process.env.EMAILPASS,
                },
            };
            this.transporter = nodemailer.createTransport(smtpConfig);
        } catch (e) {
            return { error: `Error connecting to the server ${e}` }
        }
    }
}