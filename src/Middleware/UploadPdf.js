import { uploadVehiculosCloudinary } from '../config/cloudinary.js';
import fs from 'fs';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// export const uploadVehiculeMiddleware = async (req, res, next) => {
//   try {
//     if (!req.files || !req.files.files) {
//       return res.status(400).json({ error: 'No se ha subido ningún archivo' });
//     }

//     const file = req.files.files;

//     // Validar que el archivo sea un PDF
//     if (file.mimetype !== 'application/pdf') {
//       return res.status(400).json({ error: 'Solo se permiten archivos PDF' });
//     }

//     if (file.size > MAX_FILE_SIZE) {
//       return res.status(400).json({ error: `El archivo supera el límite de ${MAX_FILE_SIZE / (1024 * 1024)}MB` });
//     }

//     const { idVehiculo } = req.body;
//     if(!idVehiculo){
//       return res.status(400).json({ error: `El Id supera el límite de ${MAX_FILE_SIZE / (1024 * 1024)}MB` });


//     }

//     // Subir el archivo a Cloudinary
//     const fileUrl = await uploadCloudinary(file.tempFilePath, idVehiculo);

//     // Eliminar el archivo temporal después de la subida
//     fs.unlinkSync(file.tempFilePath);

//     // Guardar la URL en req.fileUrl para el controlador
//     req.fileUrl = fileUrl;

//     next();
//   } catch (error) {
//     console.error('Error al subir el archivo:', error);
//     return res.status(500).json({ error: 'Error al subir el archivo', details: error.message });
//   }
// };



export const uploadVehiculeMiddleware = async (req, res, next) => {
  try {

    console.log(req.files || req.file);

    const { idVehiculo } = req.body;
    if (!idVehiculo) {
      return {
        success: false,
        message: 'Id del Vehiculo es requerido'
      }
    }
    const targPropiedad = JSON.parse(req.body.targPropiedad);
    const soat = JSON.parse(req.body.soat);
    const tecnoMecanica = JSON.parse(req.body.tecnoMecanica);
    const poliza = JSON.parse(req.body.poliza);
    const targOperacion = JSON.parse(req.body.targOperacion);


    const filesData = [
      { key: "tarjetaPropiedadDoc", meta: targPropiedad },
      { key: "soatDoc", meta: soat },
      { key: "tecnomecanicaDoc", meta: tecnoMecanica },
      { key: "polizaDoc", meta: poliza },
      { key: "tarjetaOperacionDoc", meta: targOperacion }

    ];


    let uploadedFiles = [];

    for (const fileData of filesData) {
      const file = req.files[fileData.key];

      // Validar archivo PDF
      if (!file.mimetype || file.mimetype !== "application/pdf") {
        return res.status(400).json({ error: `El archivo ${file.name} no es un PDF` });
      }

      // Subir a Cloudinary
      const fileUrl = await uploadVehiculosCloudinary(file.tempFilePath, file.name);

      // Eliminar archivo temporal
      fs.unlinkSync(file.tempFilePath);

      // Agregar archivo y metadatos al JSON de respuesta
      uploadedFiles.push({
        idVehiculo,
        name: file.name,
        ruta: fileUrl,
        tipoDocumentoId: fileData.meta.tipoDocumentoId,
        numeroDocumento: fileData.meta.numeroDocumento,
        fechaExpiracion: fileData.meta.fechaExpiracion
      });
    }
 
    req.uploadedFiles = uploadedFiles;

    next();
  } catch (error) {
    console.error("Error al subir archivos:", error);
    return res.status(500).json({ error: "Error al subir archivos", details: error.message });
  }
};