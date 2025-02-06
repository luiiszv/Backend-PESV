import { Router } from "express";
import ZonaRoutes from "./routes/zonas.routes.js";
import AdminRoutes from "./routes/admin.routes.js";
import UserRoutes from "./routes/users.routes.js";
import FilterRoutes from "./routes/filters.routes.js";
const routerPESV = Router();


routerPESV.use('/zonas', ZonaRoutes);
routerPESV.use('/admin', AdminRoutes);
routerPESV.use('/user', UserRoutes);
routerPESV.use('/filter', FilterRoutes);




export default routerPESV;