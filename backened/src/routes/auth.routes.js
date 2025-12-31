import { loggedIn, authcheck, logout, registerUser ,loggedInPartner,registerPartner,logout_Partner} from "../controllers/auth.controller.js";  
import { Router } from "express"; 
import { checkAuthUserMiddleware } from "../middlewares/checking.js";

const router = Router() 

// for user
router.post("/register/user",registerUser)
router.post("/login/user",loggedIn)
router.post("/logout/user",logout)
router.get("/me",checkAuthUserMiddleware,authcheck)

//  for partner
router.post("/login/partner",loggedInPartner)
router.post("/register/partner",registerPartner)
router.post("/logout/partner",logout_Partner) 




export default router