import { Router } from "express";
import ZonaRoutes from "./routes/zonas.routes.js";
const routerPESV = Router();


routerPESV.use('/zonas', ZonaRoutes)


export default routerPESV;