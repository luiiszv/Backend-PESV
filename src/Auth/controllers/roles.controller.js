import { findAllRoles } from "../services/role.service.js";





/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints for user authentication
 */

/**
 * @swagger
 * /auth/roles:
 *   get:
 *     summary: Get All roles
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       400:
 *         description: Invalid credentials
 *       100:
 *         description: Invalid credentials
 */

export const getAllRoles = async (req, res) => {
    try {
        const response = await findAllRoles();
        res.status(200).json(response);

    } catch (error) {
        res
            .status(400)
            .json({ message: "Something went wrong in getAllRoles", error });
    }

}