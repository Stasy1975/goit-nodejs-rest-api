const { Schema, model } = require("mongoose");
const Joi = require('joi');

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  avatarURL: {
    type: String,
    required: true
  },
  token: String
})



const registerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    subscription: Joi.string()
})

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

const EmailResendSchema = Joi.object({
  email: Joi.string().required(),
})


const User = model('user', userSchema);

module.exports = {User,  registerSchema,
    loginSchema, EmailResendSchema};