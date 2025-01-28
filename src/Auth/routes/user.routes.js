// Import dependencias externas
import { Router } from "express";

// Import Controladores
import { registerUsers, getAllUsers, login } from "../controllers/user.controller.js";

// Validaciones
import { validateSchema } from "../../Middleware/ValitarorSchema.js";
import { registerUserSchema, loginSchema } from "../Schema/UsersSchema.js";

//  Router
const router = Router();

//  rutas



router.post("/login", validateSchema(loginSchema), login);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints for user authentication
 */

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get All users
 *     tags: [Auth]
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       400:
 *         description: Invalid credentials
 *       100:
 *         description: Invalid credentials
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints for user authentication
 */

/**
 * @swagger
 * /auth/users:
 *   post:
 *     summary: Register User
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       400:
 *         description: Invalid credentials
 *       100:
 *         description: Invalid credentials
 */
router.post("/", validateSchema(registerUserSchema), registerUsers);

// Exportar Router
export default router;
