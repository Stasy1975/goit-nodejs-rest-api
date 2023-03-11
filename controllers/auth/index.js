const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const subscription = require('./subscription')
const current = require('./current')
const updateAvatar = require('./updateAvator')
const verify = require('./verify')
const resendTokenEmail = require('./resendTokenEmail');





module.exports = {
register,
login,
logout,
subscription,
current,
updateAvatar,
verify,
resendTokenEmail,

}