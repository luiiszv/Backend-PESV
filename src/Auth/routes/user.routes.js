import { Router } from "express";
import { registerUsers, getAllUsers, login, verifyToken } from "../controllers/user.controller.js";
import { validateSchema } from "../../Middleware/ValitarorSchema.js";
import { registerUserSchema, loginSchema } from "../Schema/UsersSchema.js";
import { authMiddleware } from "../../Middleware/ValidateAuth.js";

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64c2f930ae634c2e947b6c99"
 *         name:
 *           type: string
 *           example: "Luis"
 *         lastName:
 *           type: string
 *           example: "Martinez"
 *         role:
 *           type: string
 *           example: "64c2f930ae634c2e947b6c88"
 *         tipoLicencia:
 *           type: string
 *           example: "N/A"
 *         fechaNacimiento:
 *           type: string
 *           format: date
 *           example: "2050-12-10"
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints for user authentication
 */

/**
 * @swagger
 * /auth/users/login:
 *   post:
 *     summary: Login User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: luis@gmail.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
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
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       400:
 *         description: Invalid login credentials
 */
router.post("/login", validateSchema(loginSchema), login);

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
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
 *       500:
 *         description: Server error
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /auth/users/verify:
 *   post:
 *     summary: Verify authentication token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
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
 *                   example:
 *                     userId: "64c2f930ae634c2e947b6c99"
 *                     email: "johndoe@example.com"
 *                     roleId: "64c2f930ae634c2e947b6c88"
 *                     iat: 1738098814
 *                     exp: 1738185214
 *       401:
 *         description: Token not provided or invalid
 *       400:
 *         description: Token verification failed
 */
router.post("/verify", verifyToken);

/**
 * @swagger
 * /auth/users:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []  # Se requiere autenticación con token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastName
 *               - email
 *               - password
 *               - role
 *               - cargo
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *               role:
 *                 type: string
 *                 description: ID del rol del usuario
 *                 example: "64c2f930ae634c2e947b6c99"
 *               cargo:
 *                 type: string
 *                 description: ID del cargo del usuario
 *                 example: "64c2f930ae634c2e947b6c88"
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request (error en los datos enviados)
 *       401:
 *         description: Unauthorized (token no enviado o inválido)

 */
router.post("/", authMiddleware, validateSchema(registerUserSchema), registerUsers);


export default router;
