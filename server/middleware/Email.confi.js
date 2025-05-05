
require('dotenv').config();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, 
  auth: {
    user:"ujjwalgaihre45@gmail.com",
    pass:"sddq hqcq umfq wpfd"
  },
});



 module.exports=transporter;