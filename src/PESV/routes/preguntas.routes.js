import { Router } from "express";
import {
  registerPregunta,
  getPreguntaByID,
  updatePreguntaByid,
  getAllPreguntas,
} from "../controllers/preguntas.controller.js";
import { authMiddleware } from "../../Middleware/ValidateAuth.js";
import { authAdminMiddleware } from "../../Middleware/ValidateAdmin.js";
const preguntasRoutes = Router();
//Validate Shema
import { validateSchema } from "../../Middleware/ValitarorSchema.js";
import { regiterPreguntasSchema } from "../schemas/Preguntas.schema.js";



/**
 * @swagger
 * /pesv/preguntas:
 *   post:
 *     summary: Registra una nueva pregunta
 *     description: Crea una nueva pregunta en la base de datos. Solo los administradores pueden realizar esta acción.
 *     tags:
 *       - PESV Preguntas
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               preguntaTexto:
 *                 type: string
 *                 description: Texto de la pregunta
 *                 example: "Estado Llantas Traseras"
 *               determinancia:
 *                 type: boolean
 *                 description: Indica si la pregunta es determinante
 *                 example: true
 *     responses:
 *       201:
 *         description: Pregunta registrada exitosamente
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
 *                     _id:
 *                       type: string
 *                       example: "65b7c5a9f2a3e8b4d6a1e9c3"
 *                     preguntaTexto:
 *                       type: string
 *                       example: "Estado Llantas Traseras"
 *                     determinancia:
 *                       type: boolean
 *                       example: true
 *                     fechaCreacion:
 *                       type: string
 *                       format: date-time
 *                 message:
 *                   type: string
 *                   example: "Pregunta Registrada"
 *       400:
 *         description: Error en la solicitud (datos inválidos o faltantes)
 *       403:
 *         description: No autorizado (requiere permisos de administrador)
 *       500:
 *         description: Error interno del servidor
 */

preguntasRoutes.post(
  "/",
  authMiddleware,
  authAdminMiddleware,
  validateSchema(regiterPreguntasSchema),
  registerPregunta
);
/**
 * @swagger
 * /pesv/preguntas:
 *   get:
 *     summary: Obtiene todas las preguntas
 *     description: Retorna un listado de todas las preguntas almacenadas en la base de datos.
 *     tags:
 *       - PESV Preguntas
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de preguntas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "65b7c5a9f2a3e8b4d6a1e9c3"
 *                       preguntaTexto:
 *                         type: string
 *                         example: "Estado Llantas Traseras"
 *                       determinancia:
 *                         type: boolean
 *                         example: true
 *                       fechaCreacion:
 *                         type: string
 *                         format: date-time
 *       404:
 *         description: No hay preguntas registradas
 *       500:
 *         description: Error interno del servidor
 */
preguntasRoutes.get("/", authMiddleware, getAllPreguntas);

/**
 * @swagger
 * /pesv/preguntas/{id}:
 *   get:
 *     summary: Obtiene una pregunta por su ID
 *     description: Retorna los datos de una pregunta específica mediante su ID.
 *     tags:
 *       - PESV Preguntas
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta a consultar
 *     responses:
 *       200:
 *         description: Pregunta encontrada correctamente
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
 *                     _id:
 *                       type: string
 *                       example: "65b7c5a9f2a3e8b4d6a1e9c3"
 *                     preguntaTexto:
 *                       type: string
 *                       example: "Estado Llantas Traseras"
 *                     determinancia:
 *                       type: boolean
 *                       example: true
 *                     fechaCreacion:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Error en la solicitud (ID inválido)
 *       404:
 *         description: Pregunta no encontrada
 *       500:
 *         description: Error interno del servidor
 */

preguntasRoutes.get("/:id", authMiddleware, getPreguntaByID);

/**
 * @swagger
 * /pesv/preguntas/update/{id}:
 *   put:
 *     summary: Actualiza una pregunta existente
 *     description: Modifica el texto de la pregunta o su estado de determinancia.
 *     tags:
 *       - PESV Preguntas
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               preguntaTexto:
 *                 type: string
 *                 description: Nuevo texto de la pregunta
 *                 example: "Estado Llantas Traseras"
 *               determinancia:
 *                 type: boolean
 *                 description: Indica si la pregunta es determinante
 *                 example: true
 *     responses:
 *       200:
 *         description: Pregunta actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Pregunta actualizada correctamente"
 *                 data:
 *                   type: object
 *       400:
 *         description: Error en la solicitud (ID inválido o datos incorrectos)
 *       404:
 *         description: Pregunta no encontrada
 *       500:
 *         description: Error interno del servidor
 */

preguntasRoutes.put("/update/:id", authMiddleware, updatePreguntaByid);

export default preguntasRoutes;
