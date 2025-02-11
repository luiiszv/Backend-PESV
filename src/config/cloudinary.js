import { v2 as cloudinary } from "cloudinary";

import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadCloudinary = async (filePath, fileName) => {
  try {
    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: 'raw',
      public_id: `vehiculo_${fileName}_${Date.now()}`,
      transformation: [
        { quality: "auto:low" },
      ],
      format: "pdf", // Asegurar que el archivo sea PDF
    });
    return res.secure_url;
  } catch (error) {
    console.error('Error en Cloudinary:', error);
    throw new Error('Error al subir archivo a Cloudinary');
  }
};





