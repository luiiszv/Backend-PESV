import { getAllFormualarios, getFormularioById, registerFormualrio } from "../controllers/formularios.controller.js";
import { Router } from "express";
const formualriosRoutes = Router();
import { authMiddleware } from "../../Middleware/ValidateAuth.js";
import { authAdminMiddleware } from "../../Middleware/ValidateAdmin.js";

//Validate Shema
import { validateSchema } from "../../Middleware/ValitarorSchema.js";
import { regiterFormualarioSchema } from "../schemas/Formularios.schema.js";



/**
 * @swagger
 * /pesv/formularios{id}:
 *   get:
 *     summary: Obtener un formulario por ID
 *     tags: [PESV Formularios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del formulario a obtener
 *     responses:
 *       200:
 *         description: Formulario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   format: uuid
 *                   description: ID del formulario
 *                 nombreFormulario:
 *                   type: string
 *                   description: Nombre del formulario
 *                 preguntas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         format: uuid
 *                         description: ID de la pregunta
 *                       descripcion:
 *                         type: string
 *                         description: Texto de la pregunta
 *                 idClaseVehiculo:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       format: uuid
 *                       description: ID de la clase de vehículo
 *                     nombre:
 *                       type: string
 *                       description: Nombre de la clase de vehículo
 *                 estadoFormulario:
 *                   type: boolean
 *                   description: Estado del formulario (activo/inactivo)
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación del formulario
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de última actualización del formulario
 *       400:
 *         description: ID de formulario no válido
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Formulario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

formualriosRoutes.get('/:id', authMiddleware, authAdminMiddleware, getFormularioById);

/**
 * @swagger
 * /pesv/formularios:
 *   get:
 *     summary: Obtener todos los formularios
 *     tags: [PESV Formularios]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de formularios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     format: uuid
 *                     description: ID del formulario
 *                   nombreFormulario:
 *                     type: string
 *                     description: Nombre del formulario
 *                   preguntas:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           format: uuid
 *                           description: ID de la pregunta
 *                         descripcion:
 *                           type: string
 *                           description: Texto de la pregunta
 *                   idClaseVehiculo:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         format: uuid
 *                         description: ID de la clase de vehículo
 *                       nombre:
 *                         type: string
 *                         description: Nombre de la clase de vehículo
 *                   estadoFormulario:
 *                     type: boolean
 *                     description: Estado del formulario (activo/inactivo)
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del formulario
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de última actualización del formulario
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */

formualriosRoutes.get('/', authMiddleware, authAdminMiddleware, getAllFormualarios);


/**
 * @swagger
 * /pesv/formularios:
 *   post:
 *     summary: Registrar un nuevo formulario
 *     tags: [PESV Formularios]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreFormulario
 *               - idClaseVehiculo
 *               - preguntas
 *             properties:
 *               nombreFormulario:
 *                 type: string
 *                 description: Nombre del formulario
 *               idClaseVehiculo:
 *                 type: string
 *                 format: uuid
 *                 description: ID de la clase de vehículo asociada
 *               preguntas:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 description: Lista de IDs de preguntas asociadas
 *     responses:
 *       200:
 *         description: Formulario registrado correctamente
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
 *                   description: Datos del formulario registrado
 *                 message:
 *                   type: string
 *                   example: "Formulario Registrado Correctamente"
 *       400:
 *         description: Datos inválidos en la solicitud
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
formualriosRoutes.post('/', authMiddleware, validateSchema(regiterFormualarioSchema), authAdminMiddleware, registerFormualrio);


export default formualriosRoutes;


