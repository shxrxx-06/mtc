import express from "express";
import cors from "cors";
import logger from "pino-http";
import pretty from "pino-pretty";
import router from "./router.js";
import {createUser, userLogin} from "./handlers/user.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const stream = pretty({
    colorize: true,
});
app.use(logger(stream));

app.post('/signup/user', createUser)
app.post('/login', userLogin)


// app.use("/api", jwt({secret: process.env.SECRET_KEY, algorithms: ["HS256"]}),router);
app.use("/api", router);

app.get('/', (req, res) => {
    res.json({msg: "hello"})
})

export default app;
