require("dotenv").config();
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "hotmail",
  name: "smtp.office365.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated email address
    pass: process.env.EMAIL_PASS, // generated password
  },
});

// setup email data with unicode symbols
const sendMail = async (content) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    ...content,
  });
};

module.exports = sendMail;
