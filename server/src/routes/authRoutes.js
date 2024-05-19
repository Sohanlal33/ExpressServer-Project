import express from "express";
import Joi from "joi";
import ExpressValidation from "express-joi-validation";
import { postLogin, postRegister } from "../controllers/controllers.js";

const router = express.Router();

const validator = ExpressValidation.createValidator({});

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(),
    password: Joi.string().min(6).max(12).required(),
    email: Joi.string().email().required(),
});

const LoginSchema = Joi.object({
    password: Joi.string().min(6).max(12).required(),
    email: Joi.string().email().required(),
});


router.post("/register", (req, res) => {
    return res.send("this is register route");
});
router.post("/register", validator.body(registerSchema), postRegister);

router.post("/login", validator.body(LoginSchema), postLogin);

export default router;