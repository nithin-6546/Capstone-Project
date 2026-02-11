import exp from 'express';
import {register,authenticate} from '../services/authService.js'
import { verifyToken } from '../middlewares/verifyToken.js';
import { checkUser } from '../middlewares/checkUser.js';
import { ArticleModel } from '../models/articleModel.js';
export const userRoute=exp.Router();


//register user
userRoute.post('/users',async(req,res)=>{
    //get user obj from request
    let userObj=req.body;
    //call register
    const newUserObj=await  register({...userObj,role:"USER"});
    //send res
    res.status(201).json({message:"User Created",payload:newUserObj});

})



// read all articles(protected route)
userRoute.get('/users',verifyToken,checkUser,async(req,res)=>{
    //get user obj
    let userId=req.user.userId;
    //read  all articles with active status true
    let allArticles=await ArticleModel.find({isArticleActive:true});
    if(!allArticles){
        return res.status(401).json({message:"Article Not Found"});
    }
    //send res
    res.status(200).json({message:"All articles",payload:allArticles});
})


//add comment to article(protected route)
userRoute.post("/comments",verifyToken,checkUser,async(req,res)=>{
    //get user id to identify the which user is making a request
    //req.user has decoded token object with properties userId and role
    let userId = req.user.userId;
    //get comments from req
    let { articleId, comment } = req.body;
    //check article exists
    let articleDoc= await ArticleModel.findById(articleId);
    if (!articleDoc) {
      return res.status(404).json({ message: "Article not found" });
    }
    //adding comments to the article 
    let updatedArticle =await ArticleModel.findByIdAndUpdate(articleId,{$push: {comments: 
                        {user: userId,
                        comment: comment}}},
                        { new: true });
    //send response
    res.json({ message: "Comment added",payload:updatedArticle });
    
})