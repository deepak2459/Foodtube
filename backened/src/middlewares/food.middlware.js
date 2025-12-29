import { User } from "../models/user.models"; 
import jwt from "jsonwebtoken"

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

export default checkAuthMiddleware