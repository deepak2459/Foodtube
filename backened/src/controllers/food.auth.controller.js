import { FoodModel } from "../models/food.model.js";
import {  Partner } from "../models/partner.model.js";
import { UploadVideo } from "../Services/server.service.js";
import { v4 as uuidv4 } from "uuid"


async function  foodController(req,res){ 
    const upload = await UploadVideo(req.file.buffer,uuidv4()) 
    
    const createFoodItem = await FoodModel.create({
      name:req.body.name,
      description:req.body.description,
      video:upload.url,
      foodpartner:req.foodpartner.id
    }) 



    
    
   return res.status(201)
   .json({
      message:"created sucessfully",
      food:createFoodItem
   })
   

}

async function getfood(req,res){
   const fooditems = await FoodModel.find({})
   return res.status(200).json({
      message:"fetched successfully",
      food:fooditems
   })
}


async function getfoodpartnerById(req,res){ 
   const foodpartnerId = req.params.id;
   const foodpartner = await Partner.findById(foodpartnerId) 
   const food = await FoodModel.find({foodpartner:foodpartnerId})
   if(!foodpartner){
      return res.status(404).json({
         message:"foodpartner not found"
      })
   }
   return res.status(200).json({
      message:"fetched successfully",
      foodpartner:{
         ...foodpartner.toObject(),
         fooditems:food
      }
     
   })
}
export {foodController,getfood,getfoodpartnerById}