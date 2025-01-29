import { Router } from "express";
import ZonaRoutes from "./routes/zonas.routes.js";
import AdminRoutes from "./routes/admin.routes.js";
const routerPESV = Router();


routerPESV.use('/zonas', ZonaRoutes);
routerPESV.use('/admin', AdminRoutes);



export default routerPESV;