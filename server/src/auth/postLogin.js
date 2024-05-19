import User from "../../models/User.js";
import bcrypt from 'bcrypt.js'
import jwt from "jsonwebtoken";

export const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email,
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            //create jwt token 
            const token = jwt.sign(
                //user details which would like to encrypt in JWT token
                {
                    userId: user._Id,
                    email: user.email,
                },
                //secret
                process.env.TOKEN_KEY,
                //config
                {
                    expiresIn: "8h",
                }
            );
            //send back response to the user
            return res.status(200).json({
                userDetails:
                {
                    email: user.email,
                    token,
                    username: user.username,
                },
            });
        }

        return res.status(400).send("Invalid credentials.Please try again");
    } catch (err) {
        return res.status(500).send("Something went wrong. Please try again.");
    }
};