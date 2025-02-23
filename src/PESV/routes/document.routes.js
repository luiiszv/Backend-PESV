import { Router } from "express";
import {
  uploadUserDocument,
  uploadVehiculeDocument,
  getAllDocuments,
  downloadDocumentByRuta,
  getDocumetosPorExpirar,
} from "../controllers/document.controller.js";
import {
  uploadVehiculeMiddleware,
  uploadUserMiddleware,
} from "../../Middleware/UploadPdf.js";
import { findTipoDocumentoVehiculos } from "../controllers/tipoDocumento.controller.js";
//Middle
import { authMiddleware } from "../../Middleware/ValidateAuth.js";
import { authAdminMiddleware } from "../../Middleware/ValidateAdmin.js";

const routerDocuments = Router();

routerDocuments.get("/", getAllDocuments);

routerDocuments.get(
  "/tipos/vehiculos",
  authMiddleware,
  authAdminMiddleware,
  findTipoDocumentoVehiculos
);

/**
 * @swagger
 * /pesv/users/uploadUserFile:
 *   post:
 *     summary: Subir documentos de Usuario
 *     description: |
 *       Permite subir múltiples documentos de usuario, como:
 *       - **Licencia de Conducción**
 *       - **Documento de Identidad**
 *
 *       Cada documento debe enviarse con metadatos en formato JSON y el archivo en formato PDF.
 *     tags: [PESV Documents ]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - idUsuario
 *               - licencia
 *               - documento
 *               - licenciaDoc
 *               - documentoDoc
 *             properties:
 *               idUsuario:
 *                 type: string
 *                 description: ID del usuario al que se asociarán los documentos.
 *                 example: "65bfb39d5e7f4e001c8a1234"
 *               licencia:
 *                 type: string
 *                 description: JSON con los metadatos de la Licencia de Conducción.
 *                 example: '{"tipoDocumentoId": "679318760a92a8075e0d81a1", "numeroDocumento": "ABC123456", "fechaExpiracion": "2026-05-10"}'
 *               documento:
 *                 type: string
 *                 description: JSON con los metadatos del Documento de Identidad.
 *                 example: '{"tipoDocumentoId": "679318760a92a8075e0d81a2", "numeroDocumento": "987654321", "fechaExpiracion": "2030-12-31"}'
 *               licenciaDoc:
 *                 type: string
 *                 format: binary
 *                 description: Archivo PDF de la Licencia de Conducción.
 *               documentoDoc:
 *                 type: string
 *                 format: binary
 *                 description: Archivo PDF del Documento de Identidad.
 *     responses:
 *       200:
 *         description: Documentos subidos exitosamente.
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
 *                   example: "Registro exitoso 🚙"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idUsuario:
 *                         type: string
 *                         example: "65bfb39d5e7f4e001c8a1234"
 *                       name:
 *                         type: string
 *                         example: "licencia.pdf"
 *                       ruta:
 *                         type: string
 *                         example: "https://cloudinary.com/licencia.pdf"
 *                       assetId:
 *                         type: string
 *                         example: "asd123fgh456"
 *                       tipoDocumentoId:
 *                         type: string
 *                         example: "679318760a92a8075e0d81a1"
 *                       numeroDocumento:
 *                         type: string
 *                         example: "ABC123456"
 *                       fechaExpiracion:
 *                         type: string
 *                         example: "2026-05-10"
 *       400:
 *         description: Solicitud incorrecta, datos faltantes o archivo inválido.
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
 *                   example: "Id del Usuario es requerido"
 *       500:
 *         description: Error interno del servidor.
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
 *                   example: "Error al subir archivos"
 */
routerDocuments.post(
  "/uploadUserFile",
  uploadUserMiddleware,
  uploadUserDocument
);

/**
 * @swagger
 * /pesv/vehiculos/uploadVehiculeFile:
 *   post:
 *     summary: Subir documentos de un vehículo
 *     description: |
 *       Permite subir múltiples documentos asociados a un vehículo, incluyendo:
 *       - **Tarjeta de Propiedad**
 *       - **SOAT**
 *       - **Tecnomecánica**
 *       - **Póliza**
 *       - **Tarjeta de Operación**
 *
 *       Cada documento incluye metadatos como el ID del tipo de documento, número de documento y fecha de expiración.
 *     tags:
 *       - PESV Documents
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - idVehiculo
 *               - targPropiedad
 *               - soat
 *               - tecnoMecanica
 *               - poliza
 *               - targOperacion
 *               - targPropiedadDoc
 *               - soatDoc
 *               - tecnoMecanicaDoc
 *               - polizaDoc
 *               - targOperacionDoc
 *             properties:
 *               idVehiculo:
 *                 type: string
 *                 description: ID del vehículo al que se asociarán los documentos.
 *                 example: "65bfb39d5e7f4e001c8a1234"
 *               targPropiedad:
 *                 type: string
 *                 description: JSON con los metadatos de la Tarjeta de Propiedad.
 *                 example: '{"tipoDocumentoId": "679318760a92a8075e0d8199", "numeroDocumento": "12345", "fechaExpiracion": "2025-12-31"}'
 *               soat:
 *                 type: string
 *                 description: JSON con los metadatos del SOAT.
 *                 example: '{"tipoDocumentoId": "679318760a92a8075e0d819a", "numeroDocumento": "67890", "fechaExpiracion": "2024-06-30"}'
 *               tecnoMecanica:
 *                 type: string
 *                 description: JSON con los metadatos de la Tecnomecánica.
 *                 example: '{"tipoDocumentoId": "679318760a92a8075e0d819b", "numeroDocumento": "54321", "fechaExpiracion": "2024-11-15"}'
 *               poliza:
 *                 type: string
 *                 description: JSON con los metadatos de la Póliza.
 *                 example: '{"tipoDocumentoId": "679318760a92a8075e0d819c", "numeroDocumento": "98765", "fechaExpiracion": "2025-01-01"}'
 *               targOperacion:
 *                 type: string
 *                 description: JSON con los metadatos de la Tarjeta de Operación.
 *                 example: '{"tipoDocumentoId": "679318760a92a8075e0d819e", "numeroDocumento": "11223", "fechaExpiracion": "2026-03-10"}'
 *               targPropiedadDoc:
 *                 type: string
 *                 format: binary
 *                 description: Archivo PDF de la Tarjeta de Propiedad.
 *               soatDoc:
 *                 type: string
 *                 format: binary
 *                 description: Archivo PDF del SOAT.
 *               tecnoMecanicaDoc:
 *                 type: string
 *                 format: binary
 *                 description: Archivo PDF de la Tecnomecánica.
 *               polizaDoc:
 *                 type: string
 *                 format: binary
 *                 description: Archivo PDF de la Póliza.
 *               targOperacionDoc:
 *                 type: string
 *                 format: binary
 *                 description: Archivo PDF de la Tarjeta de Operación.
 *     responses:
 *       200:
 *         description: Documentos subidos exitosamente.
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
 *                   example: "Registro exitoso"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idVehiculo:
 *                         type: string
 *                         example: "65bfb39d5e7f4e001c8a1234"
 *                       name:
 *                         type: string
 *                         example: "soat.pdf"
 *                       ruta:
 *                         type: string
 *                         example: "https://cloudinary.com/soat.pdf"
 *                       assetId:
 *                         type: string
 *                         example: "asd123fgh456"
 *                       tipoDocumentoId:
 *                         type: string
 *                         example: "679318760a92a8075e0d819a"
 *                       numeroDocumento:
 *                         type: string
 *                         example: "67890"
 *                       fechaExpiracion:
 *                         type: string
 *                         example: "2024-06-30"
 *       400:
 *         description: Solicitud incorrecta, datos faltantes o archivo inválido.
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
 *                   example: "Id del Vehiculo es requerido"
 *       500:
 *         description: Error interno del servidor.
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
 *                   example: "Error al subir archivos"
 */
routerDocuments.post(
  "/uploadVehiculeFile",
  uploadVehiculeMiddleware,
  uploadVehiculeDocument
);

/**
 * @swagger
 * /pesv/users/documents/download/{assetId}:
 *   get:
 *     summary: Descarga un Documento con assetId
 *     description: Permite descargar un documento previamente subido a Cloudinary mediante su `assetId`.
 *     tags: [PESV Documents]
 *     parameters:
 *       - in: path
 *         name: assetId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del documento almacenado en Cloudinary.
 *         example: "asd123fgh456"
 *     responses:
 *       200:
 *         description: URL de descarga generada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 downloadUrl:
 *                   type: string
 *                   example: "https://res-console.cloudinary.com/pdfdocs/media_explorer_thumbnails/asd123fgh456/download"
 *       400:
 *         description: Faltó el assetId en la solicitud.
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
 *                   example: "La Ruta es requerida"
 *       500:
 *         description: Error interno del servidor al generar la URL de descarga.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Error al generar el enlace de descarga"
 */
routerDocuments.get("/download/:id", downloadDocumentByRuta);

/**
 * @swagger
 * /pesv/documents/expirar:
 *   get:
 *     summary: Obtener documentos próximos a expirar
 *     description: Retorna una lista de documentos de usuarios y vehículos que están por expirar en los próximos 60 días.
 *     tags:
 *       - PESV Documents
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de documentos próximos a expirar
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
 *                     docsUserExp:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "65dfab12bcd..."
 *                           idUsuario:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: "65aa98d5..."
 *                               nombre:
 *                                 type: string
 *                                 example: "Juan Pérez"
 *                           tipoDocumentoId:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: "6590f6a1..."
 *                               nombre:
 *                                 type: string
 *                                 example: "Licencia de Conducción"
 *                           fechaExpiracion:
 *                             type: string
 *                             format: date
 *                             example: "2025-04-15"
 *                           diasFaltantes:
 *                             type: integer
 *                             example: 30
 *                     docsVehiculeExp:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "65dfc34f5..."
 *                           idVehiculo:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: "65ab2cd4..."
 *                               marca:
 *                                 type: string
 *                                 example: "Toyota"
 *                               servicio:
 *                                 type: string
 *                                 example: "Público"
 *                               placa:
 *                                 type: string
 *                                 example: "ABC-123"
 *                           tipoDocumentoId:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: "6590f6a1..."
 *                               nombre:
 *                                 type: string
 *                                 example: "SOAT"
 *                           fechaExpiracion:
 *                             type: string
 *                             format: date
 *                             example: "2025-05-10"
 *                           diasFaltantes:
 *                             type: integer
 *                             example: 55
 *       401:
 *         description: No autorizado, falta token de autenticación
 *       500:
 *         description: Error interno del servidor
 */
routerDocuments.get("/expirar", authMiddleware, getDocumetosPorExpirar);

export default routerDocuments;
