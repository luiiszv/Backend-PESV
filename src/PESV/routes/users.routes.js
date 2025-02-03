import { Router } from "express";
import { getProfile } from "../controllers/users.controller.js";

//Auth
import { authMiddleware } from "../../Middleware/ValidateAuth.js";
import {
  getPreguntasByVehiculesActive,
  createVehiculo,
  getUserVehiculos,
} from "../controllers/users.controller.js";

import { validateSchema } from "../../Middleware/ValitarorSchema.js";
import { regiterUserVehiculosSchema } from "../schemas/Vehiculos.schema.js";

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


/**
 * @swagger
 * paths:
 *   /pesv/user/vehiculos:
 *     post:
 *       summary: Registrar un nuevo vehículo.
 *       description: Ruta para registrar un vehículo asociado a un usuario.
 *       operationId: createVehiculo
 *       tags:
 *         - PESV User Vehiculos
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: body
 *           name: vehicle
 *           description: Vehículo a registrar.
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *               - placa
 *               - idZona
 *               - idTipoVehiculo
 *               - idClaseVehiculo
 *             properties:
 *               placa:
 *                 type: string
 *                 description: Placa del vehículo.
 *               idZona:
 *                 type: string
 *                 description: Zona del vehículo.
 *               idTipoVehiculo:
 *                 type: string
 *                 description: Tipo de vehículo.
 *               idClaseVehiculo:
 *                 type: string
 *                 description: Clase de vehículo.
 *       responses:
 *         200:
 *           description: Vehículo registrado correctamente.
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: Vehículo registrado.
 *         400:
 *           description: Error al registrar el vehículo.
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: La placa ya existe.
 *               error:
 *                 type: string
 *                 example: Error al registrar.
 */


routerUser.post(
  "/vehiculos",
  authMiddleware,
  validateSchema(regiterUserVehiculosSchema),
  createVehiculo
);

/**
 * @swagger
 * paths:
 *   /pesv/user/vehiculos:
 *     get:
 *       summary: Obtiene los vehículos Propios y asignados de un usuario
 *       description: Retorna la lista de vehículos asociados al usuario autenticado.
 *       tags:
 *         - PESV User Vehiculos
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         "200":
 *           description: Lista de vehículos obtenida exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       description: ID del vehículo
 *                     marca:
 *                       type: string
 *                       description: Marca del vehículo
 *                     modelo:
 *                       type: string
 *                       description: Modelo del vehículo
 *                     placa:
 *                       type: string
 *                       description: Placa del vehículo
 *         "400":
 *           description: Error al obtener los vehículos
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Something went wrong in getVehiculos
 *                   error:
 *                     type: object
 *                     description: Detalles del error
 *       parameters:
 *         - in: header
 *           name: Authorization
 *           required: true
 *           schema:
 *             type: string
 *             example: Bearer <token>
 *           description: Token de autenticación del usuario
 */

routerUser.get("/vehiculos", authMiddleware, getUserVehiculos);

//preguntas de acuerdo al los vehiculos que tiene asignados y que esten en un estado activo 👇

/**
 * @swagger
 * /pesv/user/preguntas/clase-vehiculo/{id}:
 *   get:
 *     summary: Obtiene las preguntas activas para un tipo de vehículo específico.
 *     description: Esta API devuelve las preguntas activas basadas en la clase de vehículo proporcionada en el parámetro `id`.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la clase de vehículo
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *       - PESV User Vehiculos
 *     responses:
 *       200:
 *         description: Respuesta exitosa con las preguntas activas para el tipo de vehículo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       pregunta:
 *                         type: string
 *                       id:
 *                         type: string
 *       400:
 *         description: Error al obtener las preguntas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong in getPreguntasByUserVehiculesActive
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Error details
 *     security:
 *       - bearerAuth: []
 */


routerUser.get("/preguntas/clase-vehiculo/:id", authMiddleware, getPreguntasByVehiculesActive); //pendinete

export default routerUser;
