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
 *   name: PESV
 *   description: Endpoints for PESV operations
 */

/**
 * @swagger
 * /pesv/data:
 *   get:
 *     summary: Get PESV data
 *     tags: [PESV]
 *     responses:
 *       200:
 *         description: Successfully retrieved data
 */

routerDocuments.post("/uploadUserFile", uploadMiddleware, uploadUserDocument);
routerDocuments.post(
  "/uploadVehiculeFile",
  uploadMiddleware,
  uploadVehiculeDocument
);
