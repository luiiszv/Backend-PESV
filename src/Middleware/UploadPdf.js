import { uploadCloudinary } from '../config/cloudinary.js';
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
    const { tarjetaPropiedadDoc, soatDoc } = req.files;

    // Validar que los archivos se hayan subido
    if (!tarjetaPropiedadDoc || !soatDoc) {
      return res.status(400).json({ error: "Faltan archivos, asegúrate de subir todos los archivos requeridos" });
    }

 

    // if (!idVehiculo) {
    //   return res.status(400).json({ error: "El ID del vehículo es obligatorio" });
    // }

    const uploadedFiles = [];

    // Función para procesar cada archivo
    const files = [tarjetaPropiedadDoc, soatDoc];
    for (const file of files) {
      if (!file.mimetype) {
        return res.status(400).json({ error: `Archivo no válido: ${file.name}` });
      }

      if (file.mimetype !== "application/pdf") {
        return res.status(400).json({ error: `El archivo ${file.name} no es un PDF` });
      }

      if (file.size > MAX_FILE_SIZE) {
        return res.status(400).json({
          error: `El archivo ${file.name} supera el límite de ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
        });
      }

      // Subir a Cloudinary
      const fileUrl = await uploadCloudinary(file.tempFilePath, file.name);

      // Eliminar archivo temporal
      await fs.unlinkSync(file.tempFilePath);  // Uso de fs.promises.unlink

      uploadedFiles.push({ name: file.name, url: fileUrl });
    }

    // Pasar datos al controlador
    req.uploadedFiles = uploadedFiles;
    next();
  } catch (error) {
    console.error("Error al subir archivos:", error);
    return res.status(500).json({ error: "Error al subir archivos", details: error.message });
  }
};