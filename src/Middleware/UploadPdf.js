import { uploadVehiculosCloudinary, uploadUsuariosCloudinary } from '../config/cloudinary.js';
import fs from 'fs';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB


///✔
export const uploadUserMiddleware = async (req, res, next) => {
  try {

    const { idUsuario } = req.body;
    if (!idUsuario) {
      return res.status(400).json({ error: `Id del Usuario es requerido` });
    }

    const licencia = JSON.parse(req.body.licencia);
    const documento = JSON.parse(req.body.documento);

    const filesData = [
      { key: "licenciaDoc", meta: licencia },
      { key: "documentoDoc", meta: documento }
    ];
    let uploadedFiles = [];

    for (const fileData of filesData) {
      const file = req.files[fileData.key];
      // Validar archivo PDF
      // if (!file.mimetype || file.mimetype !== "application/pdf") {
      //   return res.status(400).json({ error: `El archivo ${file.name} no es un PDF` });
      // }

      if (file.size > MAX_FILE_SIZE) {
        return res.status(400).json({ error: `El archivo supera el límite de ${MAX_FILE_SIZE / (1024 * 1024)}MB` });
      }

      // Subir a Cloudinary
      const fileUrl = await uploadUsuariosCloudinary(file.tempFilePath, file.name);
      // Obtener el Asset ID (public_id)

      // Eliminar archivo temporal
      fs.unlinkSync(file.tempFilePath);



      uploadedFiles.push({
        idUsuario,
        name: file.name,
        ruta: fileUrl.secure_url,
        assetId: fileUrl.asset_id,
        tipoDocumentoId: fileData.meta.tipoDocumentoId,
        numeroDocumento: fileData.meta.numeroDocumento,
        fechaExpiracion: fileData.meta.fechaExpiracion
      });
    }
    req.uploadedFiles = uploadedFiles;
    next();
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    return res.status(500).json({ error: 'Error al subir el archivo', details: error.message });
  }
};


///✔
import fs from "fs";
import { uploadVehiculosCloudinary } from "../utils/cloudinary.js"; // Asegúrate de importar tu función de subida

export const uploadVehiculeMiddleware = async (req, res, next) => {
  try {
    const { idVehiculo } = req.body;
    if (!idVehiculo) {
      return res.status(400).json({
        success: false,
        message: "Id del Vehiculo es requerido",
      });
    }

    // Validar si hay archivos
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No se enviaron archivos",
      });
    }

    // Parsear JSON de los documentos si existen
    const parseSafe = (data) => {
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    };

    const documentos = {
      targPropiedad: parseSafe(req.body.targPropiedad),
      soat: parseSafe(req.body.soat),
      tecnoMecanica: parseSafe(req.body.tecnoMecanica),
      poliza: parseSafe(req.body.poliza),
      targOperacion: parseSafe(req.body.targOperacion),
      revisionBimensual: parseSafe(req.body.revisionBimensual),
    };

    const filesData = [
      { key: "targPropiedadDoc", meta: documentos.targPropiedad },
      { key: "soatDoc", meta: documentos.soat },
      { key: "tecnoMecanicaDoc", meta: documentos.tecnoMecanica },
      { key: "polizaDoc", meta: documentos.poliza },
      { key: "targOperacionDoc", meta: documentos.targOperacion },
      { key: "revisionBiDoc", meta: documentos.revisionBimensual },
    ];

    let uploadedFiles = [];

    for (const fileData of filesData) {
      const file = req.files[fileData.key];

      // Si no hay archivo o metadatos, continuar con el siguiente
      if (!file || !fileData.meta) continue;

      // Subir a Cloudinary
      const fileUrl = await uploadVehiculosCloudinary(
        file.tempFilePath,
        file.name
      );

      // Eliminar archivo temporal si existe
      if (fs.existsSync(file.tempFilePath)) {
        fs.unlinkSync(file.tempFilePath);
      }

      // Agregar archivo y metadatos al JSON de respuesta
      uploadedFiles.push({
        idVehiculo,
        name: file.name,
        ruta: fileUrl.secure_url,
        assetId: fileUrl.asset_id,
        tipoDocumentoId: fileData.meta.tipoDocumentoId,
        numeroDocumento: fileData.meta.numeroDocumento,
        fechaExpiracion: fileData.meta.fechaExpiracion || null,
      });
    }

    req.uploadedFiles = uploadedFiles;
    next();
  } catch (error) {
    console.error("Error al subir archivos:", error);
    return res.status(500).json({
      error: "Error al subir archivos",
      details: error.message,
    });
  }
};
