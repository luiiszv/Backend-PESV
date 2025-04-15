import { Router } from "express";
import ZonaRoutes from "./routes/zonas.routes.js";
import AdminRoutes from "./routes/admin.routes.js";
import UserRoutes from "./routes/users.routes.js";
import FilterRoutes from "./routes/filters.routes.js";
import VehiculesRoutes from "./routes/vehiculos.routes.js";
import DocumentsRoutes from "./routes/document.routes.js";
import FormulariosRoutes from "./routes/formularios.routes.js";
import PreguntasRoutes from "./routes/preguntas.routes.js";
import NotificaionesRoutes from "./routes/notificacion.routes.js";
import FormulariosPreOperacional from "./routes/formPreoperacional.routes.js";
import DashboardRoutes from "./routes/dashboard.routes.js";
import DesplazamientosRoutes from "./routes/desplazamientos.routes.js";


const routerPESV = Router();


routerPESV.use('/zonas', ZonaRoutes);
routerPESV.use('/admin', AdminRoutes);
routerPESV.use('/user', UserRoutes);
routerPESV.use('/filter', FilterRoutes);
routerPESV.use('/vehiculos', VehiculesRoutes);
routerPESV.use("/documents", DocumentsRoutes);
routerPESV.use("/formularios", FormulariosRoutes);
routerPESV.use("/preguntas", PreguntasRoutes);
routerPESV.use("/notificaciones", NotificaionesRoutes);
routerPESV.use("/preoperacional", FormulariosPreOperacional);
routerPESV.use("/dashboard", DashboardRoutes);
routerPESV.use("/desplazamientos", DesplazamientosRoutes);









export default routerPESV;