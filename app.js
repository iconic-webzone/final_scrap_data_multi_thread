import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import Router from './src/routes/Routes.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use("/csv", Router)



export { app } ;
 