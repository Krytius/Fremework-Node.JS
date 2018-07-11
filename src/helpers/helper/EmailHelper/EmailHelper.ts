import Nodemailer = require('nodemailer');
import fs = require('fs');
import EJS = require('ejs');
import { Config } from '../../../Config';
import { Email } from './Email';

export class EmailHelper {

    public transporter;
    public email: Email = new Email();

    constructor() {
        this.transporter = Nodemailer.createTransport({
            host: Config.SMTP.host,
            port: Config.SMTP.port,
            secure: Config.SMTP.secure,
            auth: {
                user: Config.SMTP.auth.user,
                pass: Config.SMTP.auth.pass
            }
        });
    }

	/**
	 * E-mail type text
	 * @param text 
	 */
    setText(text) {
        this.email = new Email();
        this.email.html = text;
    }

	/**
	 * E-mail type html
	 * @param path 
	 * @param data 
	 */
    setHtml(path, data) {
        this.email = new Email();
        let html = EJS.compile(fs.readFileSync(Config.DIR + "/../views/emails/" + path, 'utf8'));
        this.email.html = html(data);
    }

	/**
	 * Send e-mail
	 * @param from 
	 * @param to 
	 * @param subject 
	 */
    send(from, to, subject) {
        this.email.from = from;
        this.email.to = to;
        this.email.subject = subject;

        return new Promise((resolve, reject) => {

            if (!this.email.html) {
                reject("Conteúdo não setado.");
                return;
            }

            this.transporter.sendMail(this.email,
                (error, info) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(info);
                });
        });
    }

}