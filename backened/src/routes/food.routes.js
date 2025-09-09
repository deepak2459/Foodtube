import { Router } from "express";
import check from "../middlewares/checking.js";
 


const router = Router()

router.post("/",check)