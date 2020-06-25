const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const secrets = require("../config/secrets.json");

const router = express.Router();

router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: true }))

router.get("/", (req, res) => res.render("index.ejs"));

router.get("/about", (req, res) => {
    res.render("about.ejs");
})

router.post("/contact", (req, res) => {
    async function main() {
        let transporter = nodemailer.createTransport({
            host: 'smtp.googlemail.com',
            port: 465,
            secure: true,
            auth: {
                user: secrets.NODEMAILER_TRANSPORT_USER,
                pass: secrets.NODEMAILER_TRANSPORT_PASSWORD
            }
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: req.body.email,
            to: secrets.NODEMAILER_TRANSPORT_USER, // list of receivers
            subject: req.body.topic, // Subject line
            text: req.body.content, // plain text body
            html: 
            `
            <h1>(Nodemailer) New Contact Request
            <p><strong>From:</strong> ${req.body.email}</p>
            <p><strong>Name:</strong> ${req.body.name}</h3>
            <p><strong>Subject:</strong> ${req.body.topic}</p>
            <p><strong>Message:</strong> ${req.body.content}</p>
            ` // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    main().catch(console.error);
    res.redirect("/");
});

module.exports = router;