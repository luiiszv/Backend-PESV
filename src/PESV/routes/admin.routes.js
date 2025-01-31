import { Router } from "express";
import {
  getAllUsers,
  updateOneUser,
  createFormPregunta,
  changeStatusPregunta,
  getAllFormPreguntas,
  getUserById,
  getVehiclosByUser,
  getPreguntaById,
} from "../controllers/admin.controller.js";

const adminRoutes = Router();

//AuthMiddlewares
import { authMiddleware } from "../../Middleware/ValidateAuth.js";
import { authAdminMiddleware } from "../../Middleware/ValidateAdmin.js";

//Validate Schema
import { regiterPreguntasSchema } from "../schemas/Preguntas.schema.js";
import { validateSchema } from "../../Middleware/ValitarorSchema.js";

/**
 * @swagger
 * tags:
 *   name: PESV
 *   description: Endpoints for PESV operations
 */

/**
 * @swagger
 * /pesv/admin/users:
 *   put:
 *     summary: Update a user by ID
 *     tags: [PESV]
 *     security:
 *       - BearerAuth: []  # Se requiere Auth Token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the user
 *                 example: Yose Doe
 *               lastName:
 *                 type: string
 *                 example: Martinez
 *               email:
 *                 type: string
 *                 description: The updated email of the user
 *                 example: johndoe@gmail.com
 *               role:
 *                 type: string
 *                 example: "64c2f930ae634c2e947b6c88"
 *               tipoLicencia:
 *                 type: string
 *                 example: A2
 *               cargo:
 *                 type: string
 *                 example: "64c2f930ae634c2e947b6c81"
 *               numeroDocumento:
 *                 type: string
 *                 example: "1122334455"
 *               password:
 *                 type: string
 *                 example: password123
 *               active:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: User successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid data provided
 */

adminRoutes.put("/users", authMiddleware, updateOneUser);

/**
 * @swagger
 * /pesv/admin/users:
 *   get:
 *     summary: Get all users With all the information
 *     tags: [PESV]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
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
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */

adminRoutes.get("/users", authMiddleware, getAllUsers);

/**
 * @swagger
 * /pesv/admin/users/{id}:
 *   get:
 *     summary: Obtiene los datos de un usuario específico.
 *     description: Retorna la información de un usuario en base a su ID.
 *     tags:
 *       - PESV
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a buscar.
 *     responses:
 *       200:
 *         description: Datos del usuario obtenidos correctamente.
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
 *                     nombre:
 *                       type: string
 *                       example: "luis Martinez"
 *                     email:
 *                       type: string
 *                       example: "luis@example.com"
 *                     rol:
 *                       type: string
 *                       example: "Administrador"
 *       400:
 *         description: ID de usuario inválido.
 *       401:
 *         description: No autorizado, token no válido o no presente.
 *       403:
 *         description: No tiene permisos para acceder a esta información.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
adminRoutes.get("/users/:id", authMiddleware, getUserById);

/**
 * @swagger
 * /admin/preguntas/{id}:
 *   put:
 *     summary: Cambia el estado de una pregunta específica.
 *     description: Alterna el estado de una pregunta identificada por su ID.
 *     tags:
 *       - PESV Administración de Preguntas
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta que se desea actualizar.
 *     responses:
 *       200:
 *         description: Estado de la pregunta actualizado correctamente.
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
 *                   example: "El estado de la pregunta ha sido actualizado"
 *                 nuevoEstado:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: ID de pregunta inválido.
 *       401:
 *         description: No autorizado, token no válido o no presente.
 *       403:
 *         description: El usuario no tiene permisos para acceder a esta información.
 *       404:
 *         description: La pregunta no fue encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
adminRoutes.put(
  "/preguntas/:id",
  authMiddleware,
  authAdminMiddleware,
  changeStatusPregunta
);

/**
 * @swagger
 * /pesv/admin/preguntas:
 *   get:
 *     summary: Obtiene todas las preguntas registradas en el sistema.
 *     description: Devuelve una lista con todas las preguntas disponibles.
 *     tags:
 *       - PESV Administración de Preguntas
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de preguntas obtenida correctamente.
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
 *                       id:
 *                         type: string
 *                         example: "60a2f4981b865c1a4cfb65e3"
 *                       titulo:
 *                         type: string
 *                         example: "¿Cuál es tu color favorito?"
 *                       determinancia:
 *                         type: boolean
 *                         example: false
 *                       estado:
 *                         type: boolean
 *                         example: true
 *       404:
 *         description: No hay preguntas registradas aún.
 *       401:
 *         description: No autorizado, token no válido o no presente.
 *       403:
 *         description: El usuario no tiene permisos para acceder a esta información.
 *       500:
 *         description: Error interno del servidor.
 */
adminRoutes.get(
  "/preguntas",
  authMiddleware,
  authAdminMiddleware,
  getAllFormPreguntas
);

/**
 * @swagger
 * /pesv/admin/preguntas/{id}:
 *   get:
 *     summary: Obtener una pregunta por ID
 *     tags:
 *       - PESV Administración de Preguntas
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta a obtener
 *     responses:
 *       200:
 *         description: Pregunta obtenida exitosamente
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
 *                       example: "64c2f930ae634c2e947b6c99"
 *                     pregunta:
 *                       type: string
 *                       example: "¿Cómo te sientes hoy?"
 *                     opciones:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Bien", "Regular", "Mal"]
 *       400:
 *         description: Solicitud incorrecta, ID inválido
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
 *                   example: "ID inválido"
 *       404:
 *         description: Pregunta no encontrada
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
 *                   example: "Pregunta no encontrada"
 */

adminRoutes.get(
  "/preguntas/:id",
  authMiddleware,
  authAdminMiddleware,
  getPreguntaById
);

/**
 * @swagger
 * /pesv/admin/preguntas:
 *   post:
 *     summary: Crea una nueva pregunta en el sistema.
 *     description: Permite a un administrador registrar una nueva pregunta.
 *     tags:
 *       - PESV Administración de Preguntas
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - claseVehiculo
 *               - preguntaTexto
 *               - determinancia
 *             properties:
 *               claseVehiculo:
 *                 type: string
 *                 description: ID de la clase de vehículo asociado a la pregunta.
 *                 example: "60a2f4981b865c1a4cfb65e3"
 *               preguntaTexto:
 *                 type: string
 *                 description: Texto de la pregunta a registrar.
 *                 example: "¿Cuál es el estado del vehículo?"
 *               determinancia:
 *                 type: boolean
 *                 description: Indica si la pregunta es determinante.
 *                 example: true
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente.
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
 *                   example: "Pregunta creada exitosamente"
 *       400:
 *         description: Datos inválidos o ID de clase de vehículo incorrecto.
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
 *                   example: "Id Vehiculo no es valido"
 *       401:
 *         description: No autorizado, token no válido o no presente.
 *       403:
 *         description: El usuario no tiene permisos para esta acción.
 *       500:
 *         description: Error interno del servidor.
 */

adminRoutes.post(
  "/preguntas",
  authMiddleware,
  authAdminMiddleware,
  validateSchema(regiterPreguntasSchema),
  createFormPregunta
);

//UserVehiculos

/**
 * @swagger
 * /admin/user/{id}/vehiculos:
 *   get:
 *     summary: Obtiene los vehículos asociados a un usuario.
 *     description: Retorna la lista de vehículos registrados para un usuario específico.
 *     tags:
 *       - PESV User Vehiculos
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario del cual se quieren obtener los vehículos.
 *     responses:
 *       200:
 *         description: Lista de vehículos obtenida correctamente.
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
 *                       id:
 *                         type: string
 *                         example: "60a2f4981b865c1a4cfb65e3"
 *                       ownerId:
 *                         type: string
 *                         example: "60a2f4981b865c1a4cfb65e1"
 *                       claseVehiculo:
 *                         type: string
 *                         example: "10a2f4981b865c1a4cfb65b3"
 *                       zona:
 *                         type: string
 *                         example: "50a2f4981v865c1a4cfb65b1"
 *                       tipoVehiculo:
 *                         type: string
 *                         example: "20a2f4981b865c1a4cfb65e1"
 *                       servicio:
 *                         type: string
 *                         example: "Público"
 *                       capacidadVehiculo:
 *                         type: integer
 *                         example: 4
 *                       noChasis:
 *                         type: string
 *                         example: "CHS1234567890"
 *                       noMotor:
 *                         type: string
 *                         example: "MTR9876543210"
 *                       modeloVehiculo:
 *                         type: integer
 *                         example: 2022
 *                       color:
 *                         type: string
 *                         example: "Azul"
 *                       fechaMatricula:
 *                         type: string
 *                         format: date
 *                         example: "2021-06-15"
 *                       placa:
 *                         type: string
 *                         example: "ABC-123"
 *                       VehicleEmpresa:
 *                         type: string
 *                         example: "Empresa de Transporte XYZ"
 *                       estadoVehiculo:
 *                         type: string
 *                         example: "Activo"
 *                       fechaCreacion:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-01-01T10:30:00Z"
 *       400:
 *         description: ID de usuario inválido.
 *       401:
 *         description: No autorizado, token no válido o no presente.
 *       403:
 *         description: El usuario no tiene permisos para acceder a esta información.
 *       404:
 *         description: El usuario no tiene vehículos registrados.
 *       500:
 *         description: Error interno del servidor.
 */
adminRoutes.get(
  "/user/:id/vehiculos",
  authMiddleware,
  authAdminMiddleware,
  getVehiclosByUser
);

export default adminRoutes;
