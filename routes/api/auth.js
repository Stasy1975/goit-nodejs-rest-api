const express = require('express');
const router = express.Router();

const controller = require('../../controllers/auth');
const ctrlWrapper = require('../../helpers/ctrlWrapper')
const authentication = require('../../middlewares/authentication')
const upload = require('../../middlewares/upload')

const  validation  = require('../../middlewares/validate');
const { registerSchema, loginSchema,EmailResendSchema } = require('../../models/user');


router.post("/register", validation(registerSchema), ctrlWrapper(controller.register) );

router.post("/login", validation(loginSchema), ctrlWrapper(controller.login));

router.get("/current",  ctrlWrapper(controller.current));

router.post("/logout",  ctrlWrapper(controller.logout));

router.patch("/",  ctrlWrapper(controller.subscription));

router.post("/avatars", upload.single('avatar'), ctrlWrapper(controller.upload));

router.patch("/avatars", authentication, upload.single('avatar'), ctrlWrapper(controller.updateAvatar));

router.get("/verify/:verificationToken", ctrlWrapper(controller.verify)); 

router.post("/verify", validation(EmailResendSchema), ctrlWrapper(controller.resendTokenEmail));






module.exports = router;