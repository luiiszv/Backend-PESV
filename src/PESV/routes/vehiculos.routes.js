import {
  getAllSelectVehicules,
  getDocsByIdVehiculo,
  editVehicule,
} from "../controllers/vehiculos.controller.js";
import { Router } from "express";

import { authMiddleware } from "../../Middleware/ValidateAuth.js";
const routerVehiculos = Router();
//Obtiene los Inf de los select al registrar un vehiculo
routerVehiculos.get("/", getAllSelectVehicules);
routerVehiculos.get("/documents/:id", authMiddleware, getDocsByIdVehiculo);


/**
 * @swagger
 * /pesv/vehiculos/edit/{id}:
 *   put:
 *     summary: Actualizar información de un vehículo
 *     description: Permite actualizar los datos de un vehículo específico en el sistema del PESV.
 *     tags:
 *       - PESV
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del vehículo a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *                 example: "ABC123"
 *               servicio:
 *                 type: string
 *                 example: "Público"
 *               modeloVehiculo:
 *                 type: number
 *                 example: 2020
 *               idTipoVehiculo:
 *                 type: string
 *                 example: "65bfb39d5e7f4e001c8a1234"
 *               fechaMatricula:
 *                 type: string
 *                 format: date
 *                 example: "2021-05-20"
 *               idClaseVehiculo:
 *                 type: string
 *                 example: "65bfb39d5e7f4e001c8a5678"
 *               color:
 *                 type: string
 *                 example: "Rojo"
 *               idZona:
 *                 type: string
 *                 example: "65bfb39d5e7f4e001c8a9101"
 *               numeroDocumento:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: Vehículo actualizado correctamente.
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
 *                   description: Datos actualizados del vehículo.
 *       400:
 *         description: Datos inválidos o falta el ID del vehículo.
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
 *                   example: "Id del Vehículo es requerido"
 *       404:
 *         description: Vehículo no encontrado.
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
 *                   example: "Vehículo no encontrado"
 *       500:
 *         description: Error en el servidor.
 */
routerVehiculos.put("/edit/:id", authMiddleware, editVehicule);


export default routerVehiculos;
