const sgMail = require('@sendgrid/mail');
require("dotenv").config();

const { SG_API_KEY } = process.env;

sgMail.setApiKey(SG_API_KEY);

const sendVerifycation = async (data) => {
    try {
        const msg = {...data, from: "fomina@ua.fm"}
        await sgMail.send(msg)
    } catch (error) {
        console.error(error)
    }
}

module.exports = sendVerifycation;