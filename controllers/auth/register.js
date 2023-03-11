const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
// const nanoid = require("nanoid");

const User = require("../../models/user");
const httpError = require("../../helpers/httpError");
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
    // const verificationToken = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL});
    console.log(newUser)

    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } 
;

module.exports = register;