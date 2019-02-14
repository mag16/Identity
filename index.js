const express = require('express');
let app = express();
app.use(require('body-parser').urlencoded());

const CONTACT_ADDRESS = 'developermarcoguzman@gmail.com';

var mailer = require('nodemailer').createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD
    }
});

app.post('/contact', function (req, res) {
    mailer.sendMail({
        from: req.body.from,
        to: [CONTACT_ADDRESS],
        subject: req.body.subject || '[No subject]',
        html: req.body.message || '[No message]',
    }, function (err, info) {
        if (err) return res.status(500).send(err);
        res.json({
            success: true
        });
    })
});

var server = app.listen(3000, function () {
    console.log('Server running at http://localhost:' + server)
});