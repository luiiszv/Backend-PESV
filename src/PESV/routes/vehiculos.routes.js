import { getAllSelectVehicules } from "../controllers/vehiculos.controller.js";
import { Router } from "express";


const routerVehiculos = Router();
//Obtiene los Inf de los select al registrar un vehiculo
routerVehiculos.get('/', getAllSelectVehicules);

export default routerVehiculos;