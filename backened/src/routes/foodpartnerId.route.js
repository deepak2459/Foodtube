import { Router } from "express"; 
import {checkAuthMiddleware} from "../middlewares/checking.js";
import { getfoodpartnerById } from "../controllers/food.auth.controller.js";
const router = Router()

router.get("/:id",  checkAuthMiddleware,  getfoodpartnerById);

export default router