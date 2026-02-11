import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const verifyToken=async(req,res,next)=>{
    //read token from req
    let token=req.cookies?.token;//{token:" "}
    if(token === undefined){
        return res.status(400).json({message:"Please Login"})
    }
    //verify the validility of the token(decoding token)
    let decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY);
    //store decoded token in req.user so that we can have userid and role
    req.user=decodedToken;
    //forward req to next middleware or routr
    next();
}