import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import Router from './src/routes/Routes.js';
import createWorker from './src/utils/createWorker.js';
const THREAD_COUNT = 4;


createWorker()
const app = express();

app.use(cors({
    credentials: true
}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use("/csv", Router)



export { app } ;
 