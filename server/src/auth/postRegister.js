import User from "../models/User";
import bcrypt from "bcrypt.js";
import jwt from "jsonwebtoken";

export const postRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.exists({ email });

        if (userExistst) {
            return res.status(409).send("E-mail already in use ");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        })
        //create JWT token 

        const token = jwt.sign(
            //user details which would like to encrypt in JWT token
            {
                userId: user._Id,
                email,
            },
            //secret
            process.env.TOKEN_KEY,
            //config
            {
                expiresIn: "8h",
            }
        );
        //send success response back to the user with data of register user and JWT
        return res.status(201).json({
            userDetails: {
                email,
                username,
                token,
            },
        });


    } catch (err) {
        console.log(err)
        return res.status(500).send("Error occured.Please try again")
    }
    //return res.send("user has been added to database");
};