import mongoose  from "mongoose"; 


function connectDb(){
    mongoose.connect("mongodb+srv://zomato_reel:Deepak%402005@cluster0.ss03c7u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    
    .then(()=>{
        console.log("Mongodb Connected Sucessfully");
        
    })
    .catch((err)=>{
        console.log(`the errpr is coming:${err}`)
    })
}


export default connectDb