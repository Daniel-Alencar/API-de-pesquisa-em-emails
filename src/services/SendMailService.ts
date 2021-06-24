import nodemailer, { Transporter } from 'nodemailer';
import { resolve } from 'path';

class SendMailService {

  private client: Transporter

  constructor() {
    nodemailer.createTestAccount()
    .then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        }
      });

      this.client = transporter;
    });
  }

  async execute(to: string, subject: string, body: string) {
    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");
    const message = await this.client.sendMail({
      to: to,
      subject: subject,
      html: body,
      from: "NPS <noreaply@nps.com.br>",
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();
