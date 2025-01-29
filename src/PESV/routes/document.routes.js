import { Router } from "express";
import {
  uploadUserDocument,
  uploadVehiculeDocument,
} from "../controllers/document.controller.js";
import { uploadMiddleware } from "../../Middleware/UploadPdf.js";

const routerDocuments = Router();

/**
 * @swagger
 * tags:
 *   name: PESV Documents
 *   description: Endpoints for PESV document operations
 */

/**
 * @swagger
 * /pesv/users/{id_user}/documents:
 *   post:
 *     summary: Upload a user document
 *     tags: [PESV Documents]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
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
 *                   example: "File uploaded successfully"
 *       400:
 *         description: Bad request, missing file or incorrect format
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
 *                   example: "Bad request"
 */
routerDocuments.post("/uploadUserFile", uploadMiddleware, uploadUserDocument);

/**
 * @swagger
 * /pesv/vehiculos/{id_user}/documents:
 *   post:
 *     summary: Upload a vehicle document
 *     tags: [PESV Documents]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
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
 *                   example: "File uploaded successfully"
 *       400:
 *         description: Bad request, missing file or incorrect format
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
 *                   example: "Bad request"
 */
routerDocuments.post("/uploadVehiculeFile", uploadMiddleware, uploadVehiculeDocument);

export default routerDocuments;
