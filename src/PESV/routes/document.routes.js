import { Router } from "express";
import {
  uploadUserDocument,
  uploadManyVehiculeDocument,
  uploadOneVehiculeDocuemnt,
  uploadOneUserDocuemnt,
  getAllDocuments,
  getDocumetosPorExpirar,
  updateVehicleDocuemnt,
  updateUserDocuemnt,
  getUserDocumentById,
  getVehicleDocumentById,
} from "../controllers/document.controller.js";
import {
  uploadVehiculeMiddleware,
  uploadUserMiddleware,
  uploadVehiculeVerifyExistDoc,
  uploadUserVerifyExistDoc,
} from "../../Middleware/UploadPdf.js";
import { findTipoDocumentoVehiculos } from "../controllers/tipoDocumento.controller.js";
//Middle
import { authMiddleware } from "../../Middleware/ValidateAuth.js";
import { authAdminMiddleware } from "../../Middleware/ValidateAdmin.js";

const routerDocuments = Router();

routerDocuments.get("/", getAllDocuments);

routerDocuments.get("/user/:id", getUserDocumentById);

routerDocuments.get("/vehicle/:id", getVehicleDocumentById);


routerDocuments.get(
  "/tipos/vehiculos",
  authMiddleware,
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
 *     summary: Subir multiples documentos de un vehículo
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
  uploadManyVehiculeDocument
);

/**
 * @swagger
 * /pesv/vehiculos/uploadVehiculeId:
 *   post:
 *     summary: Subir un documento para un vehículo
 *     description: |
 *       Permite subir un documento asociado a un vehículo, validando si ya existe un documento del mismo tipo.
 *       Solo se permite registrar otro documento si el tipo de documento es "Otro".
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
 *               - tipoDocumentoId
 *               - documento
 *             properties:
 *               idVehiculo:
 *                 type: string
 *                 description: ID del vehículo al que se asociará el documento.
 *                 example: "65bfb39d5e7f4e001c8a1234"
 *               tipoDocumentoId:
 *                 type: string
 *                 description: ID del tipo de documento a subir.
 *                 example: "679318760a92a8075e0d819a"
 *               numeroDocumento:
 *                 type: string
 *                 description: Número del documento (si aplica).
 *                 example: "67890"
 *               fechaExpiracion:
 *                 type: string
 *                 format: date
 *                 description: Fecha de expiración del documento (si aplica).
 *                 example: "2024-06-30"
 *               documento:
 *                 type: string
 *                 format: binary
 *                 description: Archivo del documento a subir en formato PDF o imagen.
 *     responses:
 *       200:
 *         description: Documento subido exitosamente.
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
 *                   example: "Documento registrado con éxito"
 *                 data:
 *                   type: object
 *                   properties:
 *                     idVehiculo:
 *                       type: string
 *                       example: "65bfb39d5e7f4e001c8a1234"
 *                     name:
 *                       type: string
 *                       example: "soat.pdf"
 *                     ruta:
 *                       type: string
 *                       example: "https://cloudinary.com/soat.pdf"
 *                     assetId:
 *                       type: string
 *                       example: "asd123fgh456"
 *                     tipoDocumentoId:
 *                       type: string
 *                       example: "679318760a92a8075e0d819a"
 *                     numeroDocumento:
 *                       type: string
 *                       example: "67890"
 *                     fechaExpiracion:
 *                       type: string
 *                       example: "2024-06-30"
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
 *                   example: "El vehículo ya tiene un documento de este tipo registrado."
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
 *                   example: "El vehículo no fue encontrado"
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
 *                   example: "Error al subir archivo"
 */
routerDocuments.post(
  "/uploadVehiculeId",
  uploadVehiculeVerifyExistDoc,
  uploadOneVehiculeDocuemnt
);

routerDocuments.post(
  "/uploadUserId",
  uploadUserVerifyExistDoc,
  uploadOneUserDocuemnt
);

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

/**
 * @swagger
 * /pesv/documents/update/vehicule-doc/{id}:
 *   put:
 *     summary: Actualiza un documento asociado a un vehículo.
 *     description: |
 *       Este endpoint permite actualizar un documento asociado a un vehículo.
 *       - Elimina el archivo existente en Cloudinary.
 *       - Sube un nuevo archivo a Cloudinary.
 *       - Actualiza los datos del documento en la base de datos.
 *     tags:
 *       - Actualiza Documentos de Vehículos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del documento que se desea actualizar.
 *       - in: body
 *         name: body
 *         required: true
 *         description: Datos actualizados del documento.
 *         schema:
 *           type: object
 *           properties:
 *             tipoDocumentoId:
 *               type: string
 *               description: ID del tipo de documento.
 *               example: "679318760a92a8075e0d819b"
 *             numeroDocumento:
 *               type: string
 *               description: Número del documento.
 *               example: "1002953831"
 *             fechaExpiracion:
 *               type: string
 *               format: date
 *               description: Fecha de expiración del documento (formato YYYY-MM-DD).
 *               example: "2025-06-11"
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: Archivo PDF que se desea subir.
 *     responses:
 *       200:
 *         description: Documento actualizado correctamente.
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
 *                   example: "Documento actualizado correctamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67e0586a02b27429e0fcc9d2"
 *                     idVehiculo:
 *                       type: string
 *                       example: "67df6d66b49db11b99414d7e"
 *                     name:
 *                       type: string
 *                       example: "nuevo_documento.pdf"
 *                     tipoDocumentoId:
 *                       type: string
 *                       example: "679318760a92a8075e0d819b"
 *                     numeroDocumento:
 *                       type: string
 *                       example: "1002953831"
 *                     fechaExpiracion:
 *                       type: string
 *                       format: date
 *                       example: "2025-06-11"
 *                     assetId:
 *                       type: string
 *                       example: "09fd52567e3ece9f95508417377780f3"
 *                     ruta:
 *                       type: string
 *                       example: "https://res.cloudinary.com/pdfdocs/raw/upload/v1742757456/docVehiculos/nuevo_documento.pdf-1742757456662"
 *                     public_id:
 *                       type: string
 *                       example: "docVehiculos/nuevo_documento.pdf-1742757456662"
 *       400:
 *         description: Error en la solicitud (datos faltantes o inválidos).
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
 *                   example: "No se encontró ningún documento"
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
 *                   example: "Error interno del servidor"
 *                 error:
 *                   type: string
 *                   example: "Mensaje de error específico"
 */
routerDocuments.put(
  "/update/vehicule-doc/:id",
  authMiddleware,
  updateVehicleDocuemnt
);

/**
 * @swagger
 * /pesv/documents/update/user-doc/{id}:
 *   put:
 *     summary: Actualiza un documento asociado a un Usuario.
 *     description: |
 *       Este endpoint permite actualizar un documento asociado a un usuario.
 *       - Elimina el archivo existente en Cloudinary.
 *       - Sube un nuevo archivo a Cloudinary.
 *       - Actualiza los datos del documento en la base de datos.
 *     tags:
 *       - Actualiza Documentos de Usuarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del documento que se desea actualizar.
 *       - in: body
 *         name: body
 *         required: true
 *         description: Datos actualizados del documento.
 *         schema:
 *           type: object
 *           properties:
 *             tipoDocumentoId:
 *               type: string
 *               description: ID del tipo de documento.
 *               example: "679318760a92a8075e0d819b"
 *             numeroDocumento:
 *               type: string
 *               description: Número del documento.
 *               example: "1002953831"
 *             fechaExpiracion:
 *               type: string
 *               format: date
 *               description: Fecha de expiración del documento (formato YYYY-MM-DD).
 *               example: "2025-06-11"
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: Archivo PDF que se desea subir.
 *     responses:
 *       200:
 *         description: Documento actualizado correctamente.
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
 *                   example: "Documento actualizado correctamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67e0586a02b27429e0fcc9d2"
 *                     idVehiculo:
 *                       type: string
 *                       example: "67df6d66b49db11b99414d7e"
 *                     name:
 *                       type: string
 *                       example: "nuevo_documento.pdf"
 *                     tipoDocumentoId:
 *                       type: string
 *                       example: "679318760a92a8075e0d819b"
 *                     numeroDocumento:
 *                       type: string
 *                       example: "1002953831"
 *                     fechaExpiracion:
 *                       type: string
 *                       format: date
 *                       example: "2025-06-11"
 *                     assetId:
 *                       type: string
 *                       example: "09fd52567e3ece9f95508417377780f3"
 *                     ruta:
 *                       type: string
 *                       example: "https://res.cloudinary.com/pdfdocs/raw/upload/v1742757456/docVehiculos/nuevo_documento.pdf-1742757456662"
 *                     public_id:
 *                       type: string
 *                       example: "docVehiculos/nuevo_documento.pdf-1742757456662"
 *       400:
 *         description: Error en la solicitud (datos faltantes o inválidos).
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
 *                   example: "No se encontró ningún documento"
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
 *                   example: "Error interno del servidor"
 *                 error:
 *                   type: string
 *                   example: "Mensaje de error específico"
 */

routerDocuments.put("/update/user-doc/:id", authMiddleware, updateUserDocuemnt);

export default routerDocuments;
