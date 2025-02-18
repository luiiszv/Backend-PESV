import { Router } from "express";
import userRoutes from "./routes/user.routes.js";

const routerAuth = Router();

routerAuth.use('/users', userRoutes);
export default routerAuth;



