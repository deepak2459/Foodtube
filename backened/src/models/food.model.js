import mongoose, { model, Schema } from "mongoose"; 

const foodSchema = new Schema({
name:{
    type:String,
    required:true,
    
    
},
description:{
    type:String,
    
    
     
     
    required:true,
  },
video:{
       type:String,
        required:true,
 
     
},
 
foodpartner:{
type:mongoose.Schema.Types.ObjectId,
ref:"partner"
},    
 
 
 
}
,{timestamps:true,}) 

export const FoodModel = mongoose.model("Food",foodSchema) 

// {
   
//     "email":"dgeib@184",
//     "password":"arun135",
//     "username":"deep75",
//     "fullname":"deepak95"   }
 