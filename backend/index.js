
import dotenv from "dotenv";
dotenv.config({});
import cookieParser from "cookie-parser";
import express, { json, urlencoded } from "express";
import cors from "cors";
const app = express();


import userRoute from "./routes/user.route.js";
import urlRoute from "./routes/url.route.js";

import { connectMongoDb } from "./connection.js";
import path from "path";  // for deploy

const _dirname = path.resolve(); // for deploy

connectMongoDb(process.env.MONGODB)
    .then(() => {
        console.log("MongoDb connected");
    })
    .catch((err) => {
        console.log("MongoDb Error : ", err);
    });



//Middlewares
app.use(json());
app.use(urlencoded({ extented: false }));
app.use(cookieParser());

//For allowing the request from FrontEnd
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));
//Routing

app.use("/user", userRoute);
app.use("/", urlRoute);

app.use(express.static(path.join(_dirname, "/frontEnd/dist")));  // for deploy
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontEnd", "dist", "index.html")); // for deploy
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
