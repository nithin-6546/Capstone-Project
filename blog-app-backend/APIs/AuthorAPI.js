import exp from 'express';
import { register,authenticate } from '../services/authService.js';
import { UserTypeModel } from '../models/userModel.js';
import {ArticleModel} from '../models/articleModel.js';
import { checkAuthor } from '../middlewares/checkAuthor.js';
import { verifyToken } from '../middlewares/verifyToken.js';
export const authorRoute=exp.Router();


//register author(public route)
authorRoute.post('/users',async(req,res)=>{
    //get user obj from req
    let userObj=req.body;
    //call register
    let newuserObj=await register({...userObj,role:"AUTHOR"});
    //send res
    res.status(201).json({message:"Author Created",payload:newuserObj});
})




//create article (protected route)
authorRoute.post('/articles',verifyToken,checkAuthor,async(req,res)=>{
    //get article obj from req 
    let articleObj=req.body;
    //create article document
    let newArticleDoc=await new ArticleModel(articleObj);
    //save
    let createdArticleDoc=await newArticleDoc.save();
    res.status(201).json({message:"Article Created",payload:createdArticleDoc});   
})


//read all articles of author(protected route)
authorRoute.get('/articles/:authorId',verifyToken,checkAuthor,async(req,res)=>{
    //get author id
    let authorId=req.params.authorId;
    // //read articles by author which are active
     let allArticles=await ArticleModel.find({author:authorId,isArticleActive:true}).populate("author","firstName email");
    //send res
    res.status(200).json({message:"Articles of Author",payload:allArticles})
})


//edit article(protected route)
authorRoute.put('/articles',verifyToken,checkAuthor,async(req,res)=>{
    //get modified article from req
    let {articleId,title,category,content,author}=req.body;
    //find the article
    let articleFound=await ArticleModel.findOne({_id:articleId,author:author});
    if(!articleFound){
        return res.status(401).json({message:"article not found"});
    }
    //update the article
    let updatedArticle=await ArticleModel.findByIdAndUpdate(articleId,{$set:{title,category,content}},{new:true})
    //send res
    res.status(200).json({message:"Article Updated",payload:updatedArticle})
})



//delete(soft delete)article(protected route)
//soft delete- just make isActiveArticle false 
//hard delete-deleting entirely from the database
authorRoute.delete('/articles/:articleId',verifyToken,checkAuthor,async(req,res)=>{
    //get article id from req
    let ArticleId=req.params.articleId;
    let deletedArticle=await ArticleModel.findOneAndUpdate({_id:ArticleId,author:req.user.userId},{$set:{isArticleActive:false}},{new:true})
    //if article not found
    if(!deletedArticle){
        return res.status(401).json({message:"Article Not Found"});
    }
    res.status(200).json({message:"Article Deleted",payload:deletedArticle});
})