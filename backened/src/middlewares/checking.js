import { Partner } from "../models/partner.model.js";
import { User } from "../models/user.models.js"; 
import jwt from "jsonwebtoken"

async function checkAuthMiddleware(req,res,next){
    const token =  req.cookies.token;
       if(!token){
            return res.status(400)
            .json({
                message:"please login"
            })
        }
    try {
      const decoded = await jwt.verify(token,process.env.JWT_SecretKey)
    //   console.log(decoded.id);
      

    //   const foodpartner = await Partner.findById(decoded._id) 
      const foodpartner = await Partner.findById(decoded.id);
    //   console.log(foodpartner);
      

      req.foodpartner = foodpartner;
    //   console.log(req.foodpartner);
      
      next();

    } catch (error) {
        return res.status(400)
            .json({
                message:"Invalid Token"
            })
    }
}  

  
 
async function checkAuthUserMiddleware(req,res,next){
    const token =  req.cookies.token;
       if(!token){
            return res.status(400)
            .json({
                message:"please login"
            })
        }
    try {
      const decoded =   jwt.verify(token,process.env.JWT_SecretKey)
    //   console.log(decoded.id);
      

    //   const foodpartner = await Partner.findById(decoded._id) 
      const user = await User.findById(decoded.id);
    //   console.log(foodpartner);
      

      req.user = user;
    //   console.log(req.foodpartner);
      
      next();

    } catch (error) {
        return res.status(400)
            .json({
                message:"Invalid Token"
            })
    }
} 

export  {checkAuthMiddleware,
  checkAuthUserMiddleware
}