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
export const uploadVehiculeMiddleware = async (req, res, next) => {
  try {
      const { idVehiculo } = req.body;
      if (!idVehiculo) {
          return res.status(400).json({
              success: false,
              message: "Id del Vehículo es requerido",
          });
      }

      // Función para parsear los documentos solo si existen en el request
      const parseDocument = (key) => {
          return req.body[key] ? JSON.parse(req.body[key]) : null;
      };

      // Documentos permitidos en la solicitud
      const documentKeys = [
          { key: "targPropiedadDoc", meta: "targPropiedad" },
          { key: "soatDoc", meta: "soat" },
          { key: "tecnoMecanicaDoc", meta: "tecnoMecanica" },
          { key: "polizaDoc", meta: "poliza" },
          { key: "targOperacionDoc", meta: "targOperacion" },
          { key: "revisionBiDoc", meta: "revisionBimensual" }
      ];

      console.log(req.files);
      console.log(req.body);


      // Filtrar documentos que realmente fueron enviados
      const filesData = documentKeys
          .map(({ key, meta }) => ({
              key,
              meta: parseDocument(meta),
          }))
          .filter(item => item.meta !== null && req.files?.[item.key]); // Solo los documentos enviados

      let uploadedFiles = [];
      console.log("Archivos recibidos:", req.files);

      for (const fileData of filesData) {
          const file = req.files[fileData.key];

          // Subir archivo a Cloudinary
          const fileUrl = await uploadVehiculosCloudinary(file.tempFilePath, file.name);

          // Eliminar archivo temporal
          fs.unlinkSync(file.tempFilePath);

          // Agregar archivo y metadatos a la respuesta
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