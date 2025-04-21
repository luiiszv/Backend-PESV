import {
  getFormulariosDiarios,
  getFormulariosDiariosErrores,
  getFormularioPreoperacionalById,
  registerFormPreOperaconal,
  getVehiculosFaltantes,
  marcarFomrsFaltanes,
  registerFormPreOperaconalNoAplica,
  updatePreoperaconal,
  findPreoperaconal,
  deletePreoperacional
} from "../controllers/formPreoperacional.controller.js";
import { Router } from "express";
const router = Router();
//Validationes
import { authMiddleware } from "../../Middleware/ValidateAuth.js";
import { authAdminMiddleware } from "../../Middleware/ValidateAdmin.js";

import { validateSchema } from "../../Middleware/ValitarorSchema.js";
import { registerFormularioPreOperacionalSchema } from "../schemas/FormularioPreoperacional.js";



//Fun para marcar formualrios preoperacionales faltantes
router.post("/marcar-faltantes-pesv", authMiddleware, authAdminMiddleware, marcarFomrsFaltanes);

router.get("/vehiculos-faltantes", authMiddleware, getVehiculosFaltantes);

/**
 * @swagger
 * tags:
 *   - name: Formulario de respuesta preoperacional
 *     description: Endpoints relacionados con los formularios preoperacionales respondidos por los usuarios.
 *
 * /pesv/preoperacional/diarios:
 *   get:
 *     tags:
 *       - Formulario de respuesta preoperacional
 *     summary: Obtiene los formularios preoperacionales respondidos en una fecha específica.
 *     description: Devuelve una lista de formularios preoperacionales completados en el día indicado.
 *     parameters:
 *       - in: query
 *         name: fecha
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha en formato YYYY-MM-DD para consultar los formularios de ese día.
 *     responses:
 *       200:
 *         description: Lista de formularios encontrados.
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
 *                     type: object
 *                     properties:
 *                       estadoFormulario:
 *                         type: string
 *                         example: "completado"
 *                       fechaRespuesta:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-21T15:30:00.000Z"
 *                       idUsuario:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Juan"
 *                           lastName:
 *                             type: string
 *                             example: "Pérez"
 *                           email:
 *                             type: string
 *                             example: "juan@example.com"
 *                           numeroDocumento:
 *                             type: string
 *                             example: "12345678"
 *                       formularioId:
 *                         type: object
 *                         properties:
 *                           nombreFormulario:
 *                             type: string
 *                             example: "Inspección Vehicular"
 *       400:
 *         description: Error en la solicitud (fecha faltante o malformateada).
 *       500:
 *         description: Error interno del servidor.
 */

router.get("/diarios", authMiddleware, getFormulariosDiarios);

/**
 * @swagger
 * tags:
 *   - name: Formulario de respuesta preoperacional
 *     description: Endpoints relacionados con los formularios preoperacionales respondidos por los usuarios.
 *
 * /pesv/preoperacional/diarios/error:
 *   get:
 *     tags:
 *       - Formulario de respuesta preoperacional
 *     summary: Obtiene los formularios preoperacionales respondidos en una fecha específica con errores.
 *     description: Devuelve una lista de formularios preoperacionales completados en el día indicado.
 *     parameters:
 *       - in: query
 *         name: fecha
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha en formato YYYY-MM-DD para consultar los formularios de ese día.
 *     responses:
 *       200:
 *         description: Lista de formularios encontrados.
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
 *                     type: object
 *                     properties:
 *                       estadoFormulario:
 *                         type: string
 *                         example: "completado"
 *                       fechaRespuesta:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-21T15:30:00.000Z"
 *                       idUsuario:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Juan"
 *                           lastName:
 *                             type: string
 *                             example: "Pérez"
 *                           email:
 *                             type: string
 *                             example: "juan@example.com"
 *                           numeroDocumento:
 *                             type: string
 *                             example: "12345678"
 *                       formularioId:
 *                         type: object
 *                         properties:
 *                           nombreFormulario:
 *                             type: string
 *                             example: "Inspección Vehicular"
 *       400:
 *         description: Error en la solicitud (fecha faltante o malformateada).
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/diarios/error", authMiddleware, getFormulariosDiariosErrores);

router.get("/:id", authMiddleware, getFormularioPreoperacionalById);




/**
 * @swagger
 * /pesv/preoperacional/:
 *   post:
 *     tags:
 *       - Preoperational Forms
 *     summary: Register a new preoperational form
 *     description: |
 *       Submits a preoperational form with answers and determines its status:
 *       - 'completado' (completed)
 *       - 'no_aplica' (not applicable)
 *       - 'completado_con_errores' (completed with errors)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - formularioId
 *               - respuestas
 *               - idVehiculo
 *             properties:
 *               formularioId:
 *                 type: string
 *                 description: ID of the form template
 *                 example: "611f1f77bcf86cd799439022"
 *               idVehiculo:
 *                 type: string
 *                 description: ID of the vehicle
 *                 example: "611f1f77bcf86cd799439033"
 *               respuestas:
 *                 type: array
 *                 description: Array of question answers
 *                 items:
 *                   type: object
 *                   properties:
 *                     idPregunta:
 *                       type: string
 *                       description: ID of the question
 *                       example: "611f1f77bcf86cd799439044"
 *                     respuesta:
 *                       type: boolean
 *                       description: Answer to the question
 *                       example: true
 *     responses:
 *       200:
 *         description: Form successfully registered
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
 *                   example: "Formulario Registrado"
 *                 data:
 *                   type: object
 *                   description: The created form record
 *       400:
 *         description: Invalid input or missing required data
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
 *                   example: "El formulario no fue encontrado."
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
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
 *                   example: "Error interno del servidor registerFormPreOperaconal"
 */
router.post(
  "/",
  authMiddleware,
  validateSchema(registerFormularioPreOperacionalSchema),
  registerFormPreOperaconal
);



/**
 * @swagger
 * /pesv/preoperacional/no-aplica/:
 *   post:
 *     tags:
 *       - Preoperational Forms
 *     summary: Mark a preoperational form as not applicable
 *     description: Marks a preoperational form as not applicable for a specific vehicle and user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idUsuario
 *               - idVehicle
 *             properties:
 *               idUsuario:
 *                 type: string
 *                 description: ID of the user submitting the form
 *                 example: "507f1f77bcf86cd799439011"
 *               idVehicle:
 *                 type: string
 *                 description: ID of the vehicle
 *                 example: "607f1f77bcf86cd799439022"
 *     responses:
 *       200:
 *         description: Form successfully marked as not applicable
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
 *                   example: "Formulario registrado como no aplica"
 *                 data:
 *                   type: object
 *                   description: The created form record
 *       400:
 *         description: Invalid input or vehicle/user not found
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
 *                   example: "El id del vehiculo no es valido"
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */
router.post(
  "/no-aplica",
  authMiddleware,
  registerFormPreOperaconalNoAplica
);


router.put(
  "/update/:id",
  authMiddleware,
  authAdminMiddleware,
  updatePreoperaconal
);

router.get(
  "/find/:id",
  authMiddleware,
  findPreoperaconal
);

router.delete("/delete/:id", authMiddleware, deletePreoperacional);




export default router;
