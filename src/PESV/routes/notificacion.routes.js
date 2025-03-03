import { Router } from "express";
const notifyRouter = Router();
import {
  getAllNotificaionesAdmin,
  getAllNotificaionesUser,
  marcaNotificacionesByLeidas,
  getAllNotificaionesByIdUser,
  createNewNotification,
  getEnumsValues,
  generaNotificaciones,
} from "../controllers/notificacion.controller.js";

import { authMiddleware } from "../../Middleware/ValidateAuth.js";
import { validateSchema } from "../../Middleware/ValitarorSchema.js";
import { registerUserNotificacionesSchema } from "../schemas/notificaiones.schema.js";

notifyRouter.get("/enums", authMiddleware, getEnumsValues); //Obtine los enums values de tipo notify

/**
 * @swagger
 * /pesv/notificaciones/:
 *   post:
 *     summary: Crear una nueva notificación
 *     description: Crea una nueva notificación en el sistema.
 *     tags: [PESV Notificaciones]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idUsuario
 *               - tipoNotificacion
 *               - detalle
 *               - enviadoA
 *             properties:
 *               idUsuario:
 *                 type: string
 *                 description: ID del usuario que recibirá la notificación.
 *               tipoNotificacion:
 *                 type: string
 *                 enum:
 *                   - formulario_con_errores
 *                   - vencimiento_documentacion
 *                   - desplazamiento_finalizado
 *                   - mensaje_admin
 *                   - mensaje_usuario
 *                   - recordatorio
 *                 description: Tipo de notificación.
 *               detalle:
 *                 type: string
 *                 description: Descripción detallada de la notificación.
 *                 minLength: 5
 *               enviadoA:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                     - usuario
 *                     - administrador
 *                 description: Destinatarios de la notificación.
 *               leida:
 *                 type: boolean
 *                 default: false
 *                 description: Estado de lectura de la notificación.
 *     responses:
 *       201:
 *         description: Notificación creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/Notificacion"
 *       400:
 *         description: Datos inválidos en la solicitud.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

notifyRouter.post(
  "/",
  authMiddleware,
  validateSchema(registerUserNotificacionesSchema),
  createNewNotification
);


/**
 * @swagger
 * /pesv/notificaciones/admin:
 *   get:
 *     summary: Obtener todas las notificaciones para el administrador.
 *     description: Este endpoint permite al administrador obtener todas las notificaciones del sistema.
 *     tags: [PESV Notificaciones]
 *     security:
 *       - BearerAuth: []  # 🔒 Requiere autenticación con token JWT
 *     responses:
 *       200:
 *         description: Lista de notificaciones obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Notificacion"
 *       404:
 *         description: No hay notificaciones aún.
 */

notifyRouter.get("/admin", authMiddleware, getAllNotificaionesAdmin);
/**
 * @swagger
 * /pesv/notificaciones/user:
 *   get:
 *     summary: Obtener todas las notificaciones del usuario Autenticado.
 *     description: Devuelve todas las notificaciones asociadas al usuario autenticado.
 *     tags: [PESV Notificaciones]
 *     security:
 *       - BearerAuth: []  # 🔒 Requiere autenticación con token JWT
 *     responses:
 *       200:
 *         description: Lista de notificaciones obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Notificacion"
 *       404:
 *         description: No hay notificaciones aún.
 */

/**
 * @swagger
 * /pesv/notificaciones/user/{id}:
 *   get:
 *     summary: Obtener notificaciones de un usuario específico por su ID.
 *     description: Permite al administrador consultar las notificaciones de un usuario en particular mediante su ID.
 *     tags: [PESV Notificaciones]
 *     security:
 *       - BearerAuth: []  # 🔒 Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario cuyas notificaciones se desean obtener.
 *     responses:
 *       200:
 *         description: Lista de notificaciones obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Notificacion"
 *       404:
 *         description: No hay notificaciones para este usuario.
 */
notifyRouter.get("/user/:id", authMiddleware, getAllNotificaionesByIdUser);

notifyRouter.get("/user", authMiddleware, getAllNotificaionesUser);

/**
 * @swagger
 * /pesv/notificaciones/mark/{id}:
 *   put:
 *     summary: Marcar una notificación como leída.
 *     description: Cambia el estado de una notificación a "leída" mediante su ID.
 *     tags: [PESV Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la notificación que se marcará como leída.
 *     responses:
 *       200:
 *         description: Notificación marcada como leída exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: "#/components/schemas/Notificacion"
 *       404:
 *         description: Notificación no encontrada.
 */

notifyRouter.put("/mark/:id", marcaNotificacionesByLeidas);

notifyRouter.get("/temp/admin", generaNotificaciones);

export default notifyRouter;
