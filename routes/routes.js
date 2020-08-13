const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const secrets = require("../config/secrets.json");
const fs = require("fs");

const router = express.Router();

router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: true }))

router.get("/", (req, res) => { res.redirect("/de"); });

router.get("/:lang", (req, res) => {
    // Redirect to english page if language is neither 'de' nor 'en'
    const selectedLang = (req.params.lang == 'de' || req.params.lang == 'en') ? req.params.lang : res.redirect("/en");
    const docText = JSON.parse(fs.readFileSync('./resources/' + selectedLang + '.json').toString());

    res.render("index.ejs", { docText: docText, language: selectedLang })
});

router.get("/:lang/about", (req, res) => {
    // Redirect to english page if language is neither 'de' nor 'en'
    const selectedLang = (req.params.lang == 'de' || req.params.lang == 'en') ? req.params.lang : res.redirect("/en");
    const docText = JSON.parse(fs.readFileSync('./resources/' + selectedLang + '.json').toString());

    res.render("about.ejs", { docText: docText, language: selectedLang });
})

router.get("/:lang/portfolio", (req, res) => {
    // Redirect to english page if language is neither 'de' nor 'en'
    const selectedLang = (req.params.lang == 'de' || req.params.lang == 'en') ? req.params.lang : res.redirect("/en");
    const docText = JSON.parse(fs.readFileSync('./resources/' + selectedLang + '.json').toString());
    res.render("portfolio.ejs", { docText: docText , language: selectedLang });
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