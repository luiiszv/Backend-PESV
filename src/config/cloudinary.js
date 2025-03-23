import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";

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
    const sanitizedFileName = fileName.replace(/\s+/g, "_");
    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      folder: "docVehiculos",
      public_id: `${sanitizedFileName}-${Date.now()}`,
      transformation: [{ quality: "auto:low" }],
    });
    console.log(res);
    return {
      secure_url: res.secure_url, // URL segura para descargar
      asset_id: res.asset_id, // Asset ID o public_id
      public_id: res.public_id,
    };
  } catch (error) {
    console.error("Error en Cloudinary:", error);
    throw new Error("Error al subir archivo a Cloudinary");
  }
};

export const uploadUsuariosCloudinary = async (filePath, fileName) => {
  try {
    const sanitizedFileName = fileName.replace(/\s+/g, "_");
    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      folder: "docUsuarios",
      public_id: `${sanitizedFileName}-${Date.now()}`,
      transformation: [{ quality: "auto:low" }],
    });

    console.log(res);

    return {
      secure_url: res.secure_url, // URL segura para descargar
      asset_id: res.asset_id, // Asset ID o public_id
      public_id: res.public_id,
    };
  } catch (error) {
    console.error("Error en Cloudinary:", error);
    throw new Error("Error al subir archivo a Cloudinary");
  }
};

export const deleteFileCloudinary = async (asset_id) => {
  try {
    // Eliminar el archivo usando el asset_id
    console.log(asset_id);
    const result = await cloudinary.uploader.destroy(asset_id);
    console.log(result);

    // Verificar si el archivo se eliminó correctamente
    return result.result === "ok"; // Devuelve true si se eliminó, false si no
  } catch (error) {
    console.error("Error al eliminar el archivo en Cloudinary:", error);
    return false; // Devuelve false si ocurre un error
  }
};
