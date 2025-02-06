import { filterUserByName } from "../controllers/userFilter.controller.js";
import { Router } from "express";
const filterRoutes = Router();




/**
 * @swagger
 * /pesv/filter/users:
 *   post:
 *     summary: Filtros de Usuarios por nombre o número de cédula
 *     tags: [PESV User Filers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         required: true
 *         schema:
 *           type: string
 *         description: |
 *           El término de búsqueda que se utilizará para filtrar los usuarios.
 *           Puede ser parte del nombre del usuario o del número de cédula.
 *     responses:
 *       200:
 *         description: Usuarios encontrados exitosamente
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong in filterUserByName"
 *                 error:
 *                   type: string
 *                   example: "Detailed error message"
 */

filterRoutes.post("/users", filterUserByName);

export default filterRoutes;
