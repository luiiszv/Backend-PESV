import {
  getEstadisticasVehiculosDash,
  getEstadisticasFormsDash,
  getAllDataDash
} from "../controllers/dashboard.controller.js";
import { Router } from "express";

const routerDash = Router();

import { authMiddleware } from "../../Middleware/ValidateAuth.js";
import { authAdminMiddleware } from "../../Middleware/ValidateAdmin.js";


/**
 * @swagger
 * /pesv/dashboard/vehiculos:
 *   get:
 *     summary: Obtiene estadísticas de los vehículos registrados.
 *     tags: [Info Dashboard]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas de los vehículos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalVehiculos:
 *                   type: integer
 *                   description: Número total de vehículos registrados.
 *                 vehiculosEnUso:
 *                   type: integer
 *                   description: Número de vehículos actualmente en uso.
 *                 vehiculosInactivos:
 *                   type: integer
 *                   description: Número de vehículos inactivos.
 *                 vehiculosEmpresa:
 *                   type: integer
 *                   description: Número de vehículos pertenecientes a la empresa.
 *                 vehiculosPorServicio:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Tipo de servicio del vehículo (Público/Particular).
 *                       cantidad:
 *                         type: integer
 *                         description: Cantidad de vehículos por tipo de servicio.
 *                 vehiculosPorZona:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Identificador de la zona.
 *                       cantidad:
 *                         type: integer
 *                         description: Cantidad de vehículos por zona.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 *       500:
 *         description: Error interno del servidor.
 */
routerDash.get(
  "/vehiculos",
  authMiddleware,
  authAdminMiddleware,
  getEstadisticasVehiculosDash
);


/**
 * @swagger
 * /pesv/dashboard/formularios:
 *   post:
 *     summary: Registrar un formulario preoperacional
 *     description: Permite a un usuario registrar un formulario preoperacional con sus respuestas. Si alguna pregunta determinante tiene una respuesta "false", el estado del formulario será "completado_con_errores".
 *     tags:
 *       - PESV FormPreoperacional
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario:
 *                 type: string
 *                 description: ID del usuario que completa el formulario.
 *                 example: "65d4a8e5f2b5a71a9c8d1234"
 *               formularioId:
 *                 type: string
 *                 description: ID del formulario preoperacional.
 *                 example: "65d4a8e5f2b5a71a9c8d5678"
 *               respuestas:
 *                 type: array
 *                 description: Array de respuestas a las preguntas del formulario.
 *                 items:
 *                   type: object
 *                   properties:
 *                     idPregunta:
 *                       type: string
 *                       description: ID de la pregunta.
 *                       example: "65d4a8e5f2b5a71a9c8d9012"
 *                     respuesta:
 *                       type: boolean
 *                       description: Respuesta a la pregunta (true o false).
 *                       example: true
 *     responses:
 *       200:
 *         description: Formulario registrado con éxito.
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
 *                   description: Datos del formulario registrado.
 *       400:
 *         description: Error en la solicitud (por ejemplo, usuario o formulario no encontrado, pregunta inválida).
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
 *                   example: "El usuario no fue encontrado."
 *       500:
 *         description: Error interno del servidor.
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
 *                   example: "Error interno del servidor."
 */
routerDash.get(
  "/formularios",
  authMiddleware,
  authAdminMiddleware,
  getEstadisticasFormsDash
);


routerDash.get('/data', authMiddleware, authAdminMiddleware, getAllDataDash);

export default routerDash;
