import { Router } from "express";
import { createDesplazamiento, getAllDesplazamientos } from "../controllers/desplazamientos.controller.js";
import { registerDesplazamientos } from "../schemas/Desplazamientos.schema.js";
import { validateSchema } from "../../Middleware/ValitarorSchema.js";
import { authMiddleware } from "../../Middleware/ValidateAuth.js";

const router = Router();

router.post("/", authMiddleware, validateSchema(registerDesplazamientos), createDesplazamiento);

router.get("", getAllDesplazamientos);



export default router;