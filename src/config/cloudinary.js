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

export const uploadVehiculosCloudinary = async (filePath, fileName) => {
  try {
    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: 'raw',
      folder: 'docVehiculos',
      public_id: `${fileName}-${Date.now()}`,
      transformation: [
        { quality: "auto:low" },
      ],
     
    });
    console.log(res);
    return {
      secure_url: res.secure_url, // URL segura para descargar
      asset_id: res.asset_id,   // Asset ID o public_id
    };
  } catch (error) {
    console.error('Error en Cloudinary:', error);
    throw new Error('Error al subir archivo a Cloudinary');
  }
};


export const uploadUsuariosCloudinary = async (filePath, fileName) => {
  try {
    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: 'raw',
      folder: 'docUsuarios',
      public_id: `${fileName}-${Date.now()}`,
      transformation: [
        { quality: "auto:low" },
      ],
     
    });

    console.log(res);

    return {
      secure_url: res.secure_url, // URL segura para descargar
      asset_id: res.asset_id,   // Asset ID o public_id
    };;
  } catch (error) {
    console.error('Error en Cloudinary:', error);
    throw new Error('Error al subir archivo a Cloudinary');
  }
};

export const downloadFileCloudinary = async (asset_id) => {
  try {
    // Generar la URL de descarga usando el Asset ID
    const url = ` https://res-console.cloudinary.com/pdfdocs/media_explorer_thumbnails/${asset_id}/download` //el name luego se pone desde el .env
    return url;  // URL pública para descarga usando el Asset ID
  } catch (error) {
    console.error('Error al generar el enlace de descarga:', error);
    return null;
  }
};






