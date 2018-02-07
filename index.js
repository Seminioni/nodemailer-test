'use strict';
const fs = require('fs');
const nodemailer = require('nodemailer');
const template = fs.readFileSync('./projects/kilogram_alpha/build/index.html',{encoding:'utf-8'});

const getReceiversString = (list = 'seminioni@gmail.com') => {
    return list.join(',');
}

const getUniqueNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: '',
          pass: ''
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Mike Syomin 👻" <amazonseller5@mail.ru>', // // paste here sender name e.g Mike Syomin
        to: getReceiversString(receiversList), // list of receivers 
        subject: `Тестовое письмо по рассылке ${getUniqueNumber(0, 10000)}`, // Subject line
        html:  template// html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
