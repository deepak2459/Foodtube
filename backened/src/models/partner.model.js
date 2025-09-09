import mongoose, { Schema } from "mongoose"; 

const partnerSchema = new Schema({
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

export const Partner = mongoose.model("partner",partnerSchema)