 
 
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Partner } from "../models/partner.model.js";
import { User } from "../models/user.models.js";
 


// for user 
async function registerUser(req,res)  { 

    const { username,fullname,email,password} = req.body;
    const UserExist = await User.findOne({email}) 
    if(UserExist){
         return res.status(200)
         .json({message:"user already exist try another email"}) 
}  
if (!password) {
  return res.status(400).json({ message: "Password is required" });
}

const pass = await bcrypt.hash(password,10) 

const user = await User.create({
    fullname,
    username,
    email,
    password:pass
}) 

const token = jwt.sign({
 id :  user._id
}
    ,process.env.JWT_SecretKey)

res.cookie("token",token) 

res.status(201)
.json({
    message:"register sucessfully",
    user:{_id:user._id,
    fullname:user.fullname,
    username:user.username,
    email:user.email,}
    

})
} 

async function loggedIn(req,res){
    const {email,password} = req.body;
   const UserExist = await  User.findOne({email})
   if(!UserExist){
    return res.status(201)
    .json({
        message:"invalid username and email"
    })
   } 

   const checkPass =  bcrypt.compare(password,UserExist.password) 
   if(!checkPass){
     return res.status(201)
    .json({
        message:"invalid username and email"
    })
   } 

 const token =  jwt.sign({
    _id:UserExist._id,
   },process.env.JWT_SecretKey) 
 

res.cookie("token",token) 


   return res.status(201)
   .json({
      message:"logged in Sucessfully",
    user:{_id:UserExist._id,
    fullname:UserExist.fullname,
    username:UserExist.username,
    email:UserExist.email,}
   })
} 

function logout(req,res){
   return  res.clearCookie("token")
   .json({message:"logout sucessfully"})

}


//  for partner 
async function registerPartner(req,res)  { 

    const { username,fullname,email,password,restaurantName,address,contactNumber} = req.body;
    const UserExist = await Partner.findOne({email}) 
    if(UserExist){
         return res.status(400)
         .json({message:"user already exist try another email"}) 
}  
if (!password) {
  return res.status(401).json({ message: "Password is required" });
}

const pass = await bcrypt.hash(password,10) 

const part = await Partner.create({
    fullname,
    username,
    email,
    password:pass,
    restaurantName,
    address,
    contactNumber
}) 

const token = jwt.sign({
 id :  part._id
}
    , process.env.JWT_SecretKey)

res.cookie("token",token) 

res.status(201)
.json({
    message:"register sucessfully",
    partner:{_id:part._id,
    fullname:part.fullname,
    username:part.username,
    email:part.email,
    restaurantName:part.restaurantName,
    address:part.address,
    contactNumber:part.contactNumber,
  }

})
} 

async function loggedInPartner(req,res){
    const {email,password} = req.body;
   const UserExist = await Partner.findOne({email})
   if(!UserExist){
    return res.status(401)
    .json({
        message:"invalid username and email"
    })
   } 

   const checkPass = await bcrypt.compare(password,UserExist.password) 
   if(!checkPass){
     return res.status(401)
    .json({
        message:"invalid username and email"
    })
   } 

//    jwt.sign({
//     id:UserExist._id,
//    },process.env.JWT_SecretKey) 
const token = jwt.sign(
  {   id: UserExist._id  },
  process.env.JWT_SecretKey
);

res.cookie("token",token) 


   return res.status(201)
   .json({
      message:"logged in Sucessfully",
    partner:{_id:UserExist._id,
    fullname:UserExist.fullname,
    username:UserExist.username,
    email:UserExist.email,}
   })
} 

 function logout_Partner(req,res){
   return  res.clearCookie("token")
   .json({message:"logout sucessfully"})

} 

async function authcheck(req,res){ 
   const user = await User.findById(req.user.id).select("-password");
   return res.json({ user });
  
} 

export {registerUser,authcheck,loggedIn,logout,loggedInPartner,registerPartner,logout_Partner}