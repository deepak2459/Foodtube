// import ImageKit from "imagekit";

 
 
// console.log("PUBLIC KEY:", process.env.IMAGEKIT_PUBLIC_KEY ?? "NOT LOADED");
// console.log("PRIVATE KEY:", process.env.IMAGEKIT_PRIVATE_KEY ?? "NOT LOADED");
// console.log("URL ENDPOINT:", process.env.IMAGEKIT_URL_ENDPOINT ?? "NOT LOADED");
 
// const imagekit = new ImageKit({
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT, 
 
// });
 



// async  function UploadVideo(file,filename){
//  const result =  await imagekit.upload({
//      file,
//     fileName: filename,
//  })

//  return result
// } 

// export {UploadVideo}
import dotenv from "dotenv";
dotenv.config(); //
import ImageKit from "imagekit";

console.log("PUBLIC KEY at service load:", process.env.IMAGEKIT_PUBLIC_KEY ?? "NOT LOADED");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function UploadVideo(file, filename) {
  const result = await imagekit.upload({
    file,
    fileName: filename, // correct key
  });
  return result;
} 
// export async function UploadVideo(fileBuffer, originalName) {
//   // Extract file extension, default to .mp4 if not found
//   const ext = path.extname(originalName) || ".mp4";

//   const uploadResponse = await imagekit.upload({
//     file: fileBuffer,
//     fileName: `${Date.now()}_${originalName}${ext}`,
//     folder: "/food_videos",
//   });
//    return uploadResponse;
// }

export { UploadVideo };
