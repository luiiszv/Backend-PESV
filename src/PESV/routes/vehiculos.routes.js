import { getAllSelectVehicules, getDocsByIdVehiculo } from "../controllers/vehiculos.controller.js";
import { Router } from "express";

import { authMiddleware } from "../../Middleware/ValidateAuth.js";
const routerVehiculos = Router();
//Obtiene los Inf de los select al registrar un vehiculo
routerVehiculos.get('/', getAllSelectVehicules);
routerVehiculos.get('/documents/:id', authMiddleware, getDocsByIdVehiculo);

export default routerVehiculos;