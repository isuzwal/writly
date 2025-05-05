const Verification_Email_Template =require("../Template/Email-template")
const transporter  =require("./Email.confi")
 const Sendingverfiactioncode=async(email,verificationCode,username)=>{
    try{
        const response= await transporter.sendMail({
              from: `Writly  neyuj24@gmail.com`,
              to:email, 
              subject: "Verify your Email ",
              text: "Verify your  Email to access writly", 
              html: Verification_Email_Template.replace("{username}",username).replace("{verificationCode}",verificationCode), 
            });
            console.log("Email send",response)
             return response
    }catch(e){
        console.log("Error",e)
    }
}
module.exports=Sendingverfiactioncode;