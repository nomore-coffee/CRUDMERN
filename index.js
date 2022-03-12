import express from "express";
import mongoose from "mongoose";
import route from "./route/route.js";
import EventEmitter from "express";
import cors from 'cors';
import bodyParse from 'body-parser';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const app = express();
app.use(cors())
const emitter = new EventEmitter()
emitter.setMaxListeners(1000)


app.use(bodyParse.json({extended :true}));
app.use(bodyParse.urlencoded({extended:true}))
app.use('/user',route)

const PORT = 8000;
// const url = 'mongodb+srv://angry_code:Sharma@9846@cluster0.c7oox.mongodb.net/Cluster0?retryWrites=true&w=majority';
const url ='mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

mongoose.connect(url,{useNewUrlParser: true , useUnifiedTopology : true , useFindAndModify :false}).then(()=>{
    app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
    });
}).catch(error=>{
    console.log('Error:',error.message)
})