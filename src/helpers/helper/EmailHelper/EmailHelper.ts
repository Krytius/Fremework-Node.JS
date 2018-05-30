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

    setText(text) {
        this.email = new Email();
        this.email.html = text;
    }

    setHtml(path, data) {
        this.email = new Email();
        let html = EJS.compile(fs.readFileSync(Config.DIR + "/../views/emails/" + path, 'utf8'));
        this.email.html = html(data);
    }

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