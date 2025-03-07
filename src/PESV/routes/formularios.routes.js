import {
  getAllFormualarios,
  getFormularioById,
  registerFormualrio,
  uplaodFormulario,
  getFormularioByUserAuth
} from "../controllers/formularios.controller.js";
import { Router } from "express";
const formualriosRoutes = Router();
import { authMiddleware } from "../../Middleware/ValidateAuth.js";
import { authAdminMiddleware } from "../../Middleware/ValidateAdmin.js";

//Validate Shema
import { validateSchema } from "../../Middleware/ValitarorSchema.js";
import { regiterFormualarioSchema } from "../schemas/Formularios.schema.js";




formualriosRoutes.get('/vehiculo/:id', authMiddleware, getFormularioByUserAuth);



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

formualriosRoutes.get(
  "/form/:id",
  authMiddleware,
  authAdminMiddleware,
  getFormularioById
);

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

formualriosRoutes.get(
  "/",
  authMiddleware,
  authAdminMiddleware,
  getAllFormualarios
);

/**
 * @swagger
 * /pesv/formularios:
 *   post:
 *     summary: Crea un nuevo formulario y lo marca como activo.
 *       Si ya existe un formulario activo de la misma clase de vehículo, este será desactivado automáticamente y el nuevo formulario tomará su lugar.
 *       
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
formualriosRoutes.post(
  "/",
  authMiddleware,
  validateSchema(regiterFormualarioSchema),
  authAdminMiddleware,
  registerFormualrio
);

/**
 * @swagger
 * /pesv/formularios/update/{id}:
 *   put:
 *     summary: Actualizar un formulario existente
 *     description: |
 *       Permite actualizar la información de un formulario existente.
 *       Se debe proporcionar el ID del formulario y los datos a modificar.
 *       Solo se actualizarán los campos proporcionados en la solicitud.
 *     tags: [PESV Formularios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del formulario a actualizar.
 *         example: "67b503ac3179215fba87d1a0"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreFormulario:
 *                 type: string
 *                 description: 'Nombre del formulario (Ejemplo: "PreOperacional", "PostOperacional")'
 *                 example: "PreOperacional"
 *               idClaseVehiculo:
 *                 type: string
 *                 description: 'ID de la clase de vehículo asociada.'
 *                 example: "67a50fff122183dc3aaddbb3"
 *               preguntas:
 *                 type: array
 *                 description: 'Lista de IDs de preguntas asociadas.'
 *                 items:
 *                   type: string
 *                 example: ["67a0f553be3516ce243fb140", "67a0f553be3516ce243fb141"]
 *               estadoFormulario:
 *                 type: boolean
 *                 description: 'Estado del formulario (activo o inactivo).'
 *                 example: true
 *     responses:
 *       200:
 *         description: 'Formulario actualizado correctamente.'
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
 *                   example: "Formulario actualizado correctamente"
 *                 data:
 *                   type: object
 *                   description: 'Datos actualizados del formulario.'
 *       400:
 *         description: 'Datos inválidos en la solicitud (Ejemplo: ID inválido o formato incorrecto).'
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
 *                   example: "ID de formulario no es válido"
 *       404:
 *         description: 'Formulario no encontrado.'
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
 *                   example: "Formulario no encontrado"
 *       500:
 *         description: 'Error interno del servidor.'
 */

formualriosRoutes.put("/update/:id", authMiddleware, uplaodFormulario);



export default formualriosRoutes;
