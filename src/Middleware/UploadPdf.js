import { uploadCloudinary } from '../config/cloudinary.js';
import fs from 'fs';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const uploadVehiculeMiddleware = async (req, res, next) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No se ha subido ningún archivo' });
    }

    const file = req.files.file;

    // Validar que el archivo sea un PDF
    if (file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Solo se permiten archivos PDF' });
    }

    if (file.size > MAX_FILE_SIZE) {
      return res.status(400).json({ error: `El archivo supera el límite de ${MAX_FILE_SIZE / (1024 * 1024)}MB` });
    }

    const { idVehiculo } = req.body;
    if(!idVehiculo){
      return res.status(400).json({ error: `El Id supera el límite de ${MAX_FILE_SIZE / (1024 * 1024)}MB` });


    }

    // Subir el archivo a Cloudinary
    const fileUrl = await uploadCloudinary(file.tempFilePath, idVehiculo);

    // Eliminar el archivo temporal después de la subida
    fs.unlinkSync(file.tempFilePath);

    // Guardar la URL en req.fileUrl para el controlador
    req.fileUrl = fileUrl;

    next();
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    return res.status(500).json({ error: 'Error al subir el archivo', details: error.message });
  }
};
