import { Router } from "express";
import { getAllZonas } from "../controllers/zonas.controller.js";
const routerZonas = Router();

routerZonas.get('/', getAllZonas);

export default routerZonas;

