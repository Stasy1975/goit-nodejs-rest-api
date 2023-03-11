const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const {nanoid} = require("nanoid");

const User = require("../../models/user");
const httpError = require("../../helpers/httpError");
const  sendVerifycation = require("../../helpers/verifyAuth");
console.log(httpError)

const register = async (req, res) => {
 
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user)

    if (user) {
      throw httpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const verifyEmail = {
      to: email,
      subject: "Please verify your email",
      html: `<a href="http://localhost:7000/api/users/verify/${verificationToken}">Verify email</a>`
    }

    await sendVerifycation(verifyEmail);

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken});
    console.log(newUser)

    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } 
;

module.exports = register;