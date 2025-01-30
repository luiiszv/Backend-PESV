import { Router } from "express";
import { getProfile } from "../controllers/users.controlles.js";


//Auth
import { authMiddleware } from "../../Middleware/ValidateAuth.js"

const routerUser = Router();

routerUser.get('/profile', authMiddleware, getProfile);


export default routerUser;