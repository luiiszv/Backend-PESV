import {
  getEstadisticasVehiculosDash,
  getEstadisticasFormsDash,
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
 *   get:
 *     summary: Obtiene estadísticas de formularios preoperacionales
 *     description: Retorna estadísticas de los formularios contestados en la semana actual, incluyendo el total de formularios, correctos y con errores.
 *     tags:
 *       - Info Dashboard
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas de los formularios agrupados por semana.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 formulariosAgrupados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: object
 *                         properties:
 *                           year:
 *                             type: integer
 *                             example: 2025
 *                           semana:
 *                             type: integer
 *                             example: 8
 *                       totalFormulariosContestados:
 *                         type: integer
 *                         example: 20
 *                       formulariosCorrectos:
 *                         type: integer
 *                         example: 15
 *                       formulariosConErrores:
 *                         type: integer
 *                         example: 5
 *       401:
 *         description: No autorizado - Token inválido o expirado.
 *       500:
 *         description: Error interno del servidor.
 */
routerDash.get(
  "/formularios",
  authMiddleware,
  authAdminMiddleware,
  getEstadisticasFormsDash
);

export default routerDash;
