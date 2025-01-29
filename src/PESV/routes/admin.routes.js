import { Router } from "express";
import {
  getAllUsers,
  updateOneUser,
  createFormPregunta,
} from "../controllers/admin.controller.js";

const adminRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: PESV
 *   description: Endpoints for PESV operations
 */

/**
 * @swagger
 * /pesv/users/{id}:
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
 *                 example: johndoe@example.com
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */
adminRoutes.put("/pesv/users/:id", updateOneUser);


export default adminRoutes;
