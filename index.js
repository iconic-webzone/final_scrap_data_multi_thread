import dotenv from 'dotenv';
import connectDB from './src/db/index.js';
import { app } from './app.js';
import path  from 'path';

const __dirname = path.resolve();

dotenv.config({
    path:'./.env'
})



app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,"src/views","index.html"))
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at port:${process.env.PORT}`);
    })
})