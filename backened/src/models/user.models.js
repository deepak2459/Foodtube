import mongoose, { Schema } from "mongoose"; 

const userSchema = new Schema({
username:{
    type:String,
    required:true,
    
    
},
email:{
    type:String,
    
    
     
     
    required:true,
  },
fullname:{
       type:String,
     
 
     
},
password:{
    type:String,
  
    trim:true,
     
},
 
 
}
,{timestamps:true,}) 

export const User = mongoose.model("User",userSchema)