const User = require("../../models/user");
const httpError = require("../../helpers/httpError");
const sendVerifycation = require('../../helpers/verifyAuth')


const resendTokenEmail = async (req, res) => {
    const { email } = req.body;
    const user = User.findOne({ email });
  
    if (!user) {
      throw httpError(400, "Missing required field email");
    }
    if (user.verify) {
      throw (httpError(400, "Verification has already been passed"));
    }

    const verifyEmail = {
      to: email,
      subject: "Please verify your email",
      html: `<a target=_blank href="http://localhost:7000/api/users/verify/${user.verificationToken}">Verify email</a>`,
    };

      await sendVerifycation(verifyEmail);
      
      res.json({
          message: "Verify email resend"
      })
  } ;

module.exports = resendTokenEmail;