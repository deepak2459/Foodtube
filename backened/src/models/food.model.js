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
     
 
     
},
 
foodpartner:{
type:mongoose.Schema.Types.ObjectId,
ref:"partner"
},    
 
 
 
}
,{timestamps:true,}) 

export const Food = mongoose.model("Food",foodSchema)