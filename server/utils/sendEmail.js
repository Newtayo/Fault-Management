const nodemailer = require("nodemailer");
//method for sending emails
const sendEmail= async({to, subject, html})=> { 
    let textAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user:process.env.USER_NAME,
          pass:process.env.PASSWORD,
        }
    });

        
        return transporter.sendMail({
            from: 'akandeabdul@gmail.com',
            to,
            subject,
            html
        });
    }

module.exports = sendEmail