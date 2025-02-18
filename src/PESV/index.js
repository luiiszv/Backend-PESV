import { Router } from "express";
import ZonaRoutes from "./routes/zonas.routes.js";
import AdminRoutes from "./routes/admin.routes.js";
import UserRoutes from "./routes/users.routes.js";
import FilterRoutes from "./routes/filters.routes.js";
import VehiculesRoutes from "./routes/vehiculos.routes.js";
import DocumentsRoutes from "./routes/document.routes.js";
import FormulariosRoutes from "./routes/formularios.routes.js";
const routerPESV = Router();


routerPESV.use('/zonas', ZonaRoutes);
routerPESV.use('/admin', AdminRoutes);
routerPESV.use('/user', UserRoutes);
routerPESV.use('/filter', FilterRoutes);
routerPESV.use('/vehiculos', VehiculesRoutes);
routerPESV.use("/documents", DocumentsRoutes);
routerPESV.use("/formularios", FormulariosRoutes);




export default routerPESV;