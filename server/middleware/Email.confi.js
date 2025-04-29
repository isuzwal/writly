
require('dotenv').config();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, 
  auth: {
    user:"neyuj24@gmail.com",
    pass:"ulyf fruk mldw azwy"
  },
});



 module.exports=transporter;