// Import dependencias externas
import { Router } from "express";

// Import Controladores
import { registerUsers, getAllUsers, login } from "../controllers/user.contollers.js";

// Validaciones
import { validateSchema } from "../../Middleware/ValitarorSchema.js";
import { registerUserSchema, loginSchema } from "../Schema/UsersSchema.js";

//  Router
const router = Router();

//  rutas
router.post("/login", validateSchema(loginSchema), login);
router.get("/", getAllUsers);
router.post("/", validateSchema(registerUserSchema), registerUsers);

// Exportar Router
export default router;
