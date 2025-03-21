import { Router } from "express";
import { getProfile } from "../controllers/users.controller.js";

//Auth
import { authMiddleware } from "../../Middleware/ValidateAuth.js";
import {
  getPreguntasByVehiculesActive,
  createVehiculo,
  getUserVehiculos,
  getSelectRegisterUser,
  getDocsByIdUser
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
 *               - idActividadVehiculo
 *               - idClaseVehiculo
 *             properties:
 *               placa:
 *                 type: string
 *                 description: Placa del vehículo.
 *               idZona:
 *                 type: string
 *                 description: Zona del vehículo.
 *               idActividadVehiculo:
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
 * /pesv/user/select-register:
 *   get:
 *     summary: Obtiene las opciones de selección para el registro de usuarios.
 *     description: Retorna listas de cargos, roles y tipos de licencia para ser usados en el formulario de registro.
 *     tags:
 *       - PESV User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente.
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
 *                     selectCargos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "60b8d6f5f2d4b00f88888888"
 *                           nombre:
 *                             type: string
 *                             example: "Administrador"
 *                     selectRoles:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "60b8d6f5f2d4b00f99999999"
 *                           nombre:
 *                             type: string
 *                             example: "Supervisor"
 *                     selectTipoLicencia:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "A2"
 *       401:
 *         description: No autorizado. Se requiere un token válido.
 *       500:
 *         description: Error interno del servidor.
 */
routerUser.get('/select-register', authMiddleware, getSelectRegisterUser);



routerUser.get("/documents/:id", authMiddleware, getDocsByIdUser);




export default routerUser;
