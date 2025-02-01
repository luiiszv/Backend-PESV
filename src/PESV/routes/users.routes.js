import { Router } from "express";
import { getProfile } from "../controllers/users.controller.js";

//Auth
import { authMiddleware } from "../../Middleware/ValidateAuth.js";
import { getPreguntasByUserVehiculesActive } from "../controllers/users.controller.js";

const routerUser = Router();

/**
 * @swagger
 * /pesv/user/profile:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado.
 *     description: Devuelve la información del perfil del usuario que realiza la solicitud.
 *     tags:
 *       - PESV User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60a2f4981b865c1a4cfb65e3"
 *                     name:
 *                       type: string
 *                       example: "Juan Pérez"
 *                     email:
 *                       type: string
 *                       example: "juan.perez@example.com"
 *                     role:
 *                       type: string
 *                       example: "Admin"
 *       401:
 *         description: No autorizado, token no válido o no presente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No autorizado"
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Perfil no encontrado"
 */

routerUser.get("/profile", authMiddleware, getProfile);




//preguntas de acuerdo al los vehiculos que tiene asignados y que esten en un estado activo 👇
routerUser.get("/preguntas",authMiddleware, getPreguntasByUserVehiculesActive);


export default routerUser;
