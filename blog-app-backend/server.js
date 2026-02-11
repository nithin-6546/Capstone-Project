import exp from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import {userRoute} from './APIs/UserAPI.js'
import {authorRoute} from './APIs/AuthorAPI.js'
import {adminRoute} from './APIs/AdminAPI.js'
import cookieParser from 'cookie-parser';
import { commonRoute } from './APIs/commonAPI.js';
config() //process.env
const app=exp()

// add body parser middleware
app.use(exp.json())

//add cookieparser middleware
app.use(cookieParser());

//connect APIs
app.use('/user-api',userRoute)
app.use('/author-api',authorRoute)
app.use('/admin-api',adminRoute)
app.use('/common-api',commonRoute);
app.use('/admin-api',adminRoute);
//connect to Database
const connectDb=async()=> {
    try{
    await connect(process.env.DB_URL)
    console.log("Connected to Database");
    app.listen(process.env.PORT,()=> console.log("Server Started"));
    }catch(err){
        console.log("Error in Database Connection",err);
    }  
}
connectDb();

//dealing with invalid path
app.use((req,res,next)=>{
    res.json({  message:`${req.url} is Invalid path`});
})


//error handling middleware
app.use((err,req,res,next)=>{
    res.json({message:"Error has occured",reason:err.message});
})