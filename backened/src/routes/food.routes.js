import { Router } from "express";
import multer from "multer"
import {checkAuthMiddleware,checkAuthUserMiddleware} from "../middlewares/checking.js";
import { foodController,getfood } from "../controllers/food.auth.controller.js";

 
 
const router = Router() 

const upload = multer({
    storage:multer.memoryStorage()
})

router.post("/",checkAuthMiddleware,upload.single("video"),foodController) 

router.get("/",checkAuthUserMiddleware,getfood)

export default router