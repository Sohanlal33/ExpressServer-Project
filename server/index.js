import authRoutes from "./src/routes/authRoutes.js";
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

//to get the data in json
app.use(express.json());

//to connect to server side app
app.use(cors());

//to get default route to API

app.get("/", (req, res) => {                               //callback function
    return res.send("Hello Here is our server");
})

app.use("/api/auth", authRoutes);

//create server
const server = http.createServer(app)

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is listening on ${PORT}`);
        });
    }).catch(err => {
        console.log('Database connection failed .server not started');
        console.log(err);

    })

//listen to start the server
server.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
});

//node -v,dir-dir,npm init ,
//npm install --save bcryptjs cors dotenv express express-joi-validation joi jsonwebtoken mongoose nodemon socket.io uuid
//in .json file added  "start": "nodemon index.js"  & "type": "module" at bottom after dependencies
//created .env file to update env data
//npm start
//created dir under server-dir(src)-dir(routes)-authRoute.js-edited this file with login and register routes and exported default routes
//after that imported routes to index.js - import authRoutes from "./src/routes/authRoutes.js";--app.use("/api/auth", authRoutes);
//create src-controllers-controllers.js and then create under that auth under that postRegister.js and postLogin.js
//added data in postLogin and Register and then exported that in controller.js-export { postRegister } from "./auth/postRegister.js";
//added in controllers.js import-{postLogin, postRegister} from '../controllers/controller.js',added router.post Login & Register in authRoute.js
//imported joi and joi-validation and created validator in authRoute.js
//added MONGO_URI in .env file with name and pwd and then used mongoose framework for db in index.js
// added exception handling in postRegister.js
//react-reactrouter.com