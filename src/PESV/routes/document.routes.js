import { Router } from "express";
import {
  uploadUserDocument,
  uploadVehiculeDocument,
} from "../controllers/document.controller.js";
import { uploadMiddleware } from "../../Middleware/UploadPdf.js";
const routerDocuments = Router();

routerDocuments.post("/uploadUserFile", uploadMiddleware, uploadUserDocument);
routerDocuments.post(
  "/uploadVehiculeFile",
  uploadMiddleware,
  uploadVehiculeDocument
);
