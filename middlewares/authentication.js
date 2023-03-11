const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const User = require("../models/user");
const httpError = require("../helpers/httpError");

const authentication = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(httpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      next(httpError(401));
    }

    req.user = user;
    next();
  } catch {
    next(httpError(401));
  }
};

module.exports = authentication;


