import { Partner } from "../models/partner.model"; 
import jwt from "jsonwebtoken"

async function check(res,req,next){
    const token = requestAnimationFrame.cookies.token;
       if(!token){
            return res.status(400)
            .json({
                message:"please login"
            })
        }
    try {
      const decoded = jwt.verify(token,"BYjOy3IFq17K2AtdWBsKGBhupnBRlDdR")

      const foodpartner = await Partner.findById(decoded._id) 

      req.partner = foodpartner;
      next();

    } catch (error) {
        return res.status(400)
            .json({
                message:"Invalid Token"
            })
    }
} 

export default check