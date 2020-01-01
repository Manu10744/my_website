const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require('fs');

const router = express.Router();

router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: true }));

router.use(cookieParser('woot'));
router.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false}));

router.use(flash());

// Routing
router.get("/", (req, res) => res.redirect("/de"));
router.get("/:lang/", (req, res) => {
    const selectedLang = req.params.lang;
    const docText = JSON.parse(fs.readFileSync('./resources/lang/' + selectedLang + '.json').toString());

    res.render("index.ejs", { flashMessages: req.flash("success"), docText: docText, language: selectedLang});
});

router.get("/:lang/about", (req, res) => {
    const selectedLang = req.params.lang;
    const docText = JSON.parse(fs.readFileSync('./resources/lang/' + selectedLang + '.json').toString());
    
    res.render("about.ejs", { docText: docText, language: selectedLang });
});

/**
router.get("/offers", (req, res) => {
    res.render("offers.ejs");
});

router.get("/portfolio", (req, res) => {
    res.render("portfolio.ejs");
});

*/

router.post("/send", (req, res) => {
    async function main() {
        let transporter = nodemailer.createTransport({
            host: 'smtp.googlemail.com',
            port: 465,
            secure: true,
            auth: {
                user: "089manu6@gmail.com",
                pass: "jpdgoonzgeeeeayx"
            }
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: req.body.emailFrom,
            to: '089manu6@gmail.com', // list of receivers
            subject: req.body.topic, // Subject line
            text: req.body.emailBody, // plain text body
            html: `
            <p>
            (Nodemailer) You have a new Contact request!
            <h1>Content:</h3>
            <h3>From: ${req.body.emailFrom}</h3>
            <h3>Name: ${req.body.name}</h3>
            <h3>Surname: ${req.body.surname}</h3>
            <h3>Subject: ${req.body.topic}</h3>
            <h3>Message: ${req.body.emailBody}</h3>
            </p>` // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    main().catch(console.error);

    req.flash("success", "Your message was successfully delivered.");
    res.redirect("/");
});

router.get("/:lang/impressum", (req, res) => {
    const selectedLang = req.params.lang;
    const docText = JSON.parse(fs.readFileSync('./resources/lang/' + selectedLang + '.json').toString());
    res.render("impressum.ejs", { docText: docText, language: selectedLang });
})

// Catch everything else because of 404
router.get("/:lang/*", (req, res) => {
    const selectedLang = req.params.lang;
    const docText = JSON.parse(fs.readFileSync('./resources/lang/' + selectedLang + '.json').toString());
    
    res.render("404.ejs", { docText: docText, language: selectedLang });
});

module.exports = router;