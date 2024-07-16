const transporter = require("./smtp.config");
require("dotenv").config();
const sender = process.env.SMTP_SENDER;
const cypherKey = process.env.CYPHER_KEY;
const hbs = require("nodemailer-express-handlebars");
const path=require('path');
const ejs=require('ejs');
const AES = require('crypto-js/aes');

const sendEmail =async (user) => {
  console.log('mail',user);
  const templatePath=path.join(__dirname, "../views/email.ejs");
  const data=await ejs.renderFile(templatePath,user);

  const mailOptions = {
    from: sender,
    to: user.email,
    subject: "New email",
    html: data,
    context: user,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
