import mongoose  from "mongoose"; 


async function connectDb(){
  await  mongoose.connect(process.env.MONGOOSE_URI )
    
    .then(()=>{
        console.log("Mongodb Connected Sucessfully");
        
    })
    .catch((err)=>{
        console.log(`the error r is coming:${err}`)
    })
}


export default connectDb