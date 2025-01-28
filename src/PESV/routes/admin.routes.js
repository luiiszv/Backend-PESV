import { Router } from "express";
import { getAllUsers, updateOneUser, createFormPregunta } from "../controllers/admin.controller.js";

const adminRoutes = Router();


/**
 * @swagger
 * tags:
 *   name: PESV
 *   description: Endpoints for user authentication
 */


/**
 * @swagger
 * /auth/users/{id}:
 *   put:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *           example: 12345
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: User not found
 */
adminRoutes.put('admin/', updateOneUser);


export default adminRoutes;
