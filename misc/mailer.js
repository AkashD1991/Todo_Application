const nodemailer = require('nodemailer');
require('dotenv').config();

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }

});

module.exports = {
        sendEmail(from, to, subject, html) {
            return new Promise((resolve, reject) => {
                    transport.sendMail({ from, subject, to, html }, (err, info) => {
                            if (err) {
                                console.log('something wrong happen');
                                reject(err);
                            }else{
                                console.log(object);
                                resolve(info);
                            }
                            })
                    })
            }
        }