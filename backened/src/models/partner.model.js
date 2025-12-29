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
       required:true,
},
 address:{
    type:String,
    required:true,
},

contactNumber:{
    type:String,
    required:true,
},


password:{
    type:String,
  
    trim:true,
     
},

 
 
}
,{timestamps:true,}) 

export const Partner = mongoose.model("partner",partnerSchema)