const nodemailer = require("nodemailer");
require("dotenv").config();
const hostName = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const transporter = nodemailer.createTransport({
  host: hostName,
  port: port,
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports = transporter;
