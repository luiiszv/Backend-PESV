import { json } from "express";
import {
  saveDocumentUserToDatabase,
  saveDocumentVehiculeToDatabase,
} from "../services/documents.service.js";

import { downloadFileCloudinary } from "../../config/cloudinary.js";

export const getAllDocuments = async (req, res) => {
  try {
    res.status(200).json({ message: "Ok" })

  } catch (error) {
    res.status(500).json("Something was wrong in getAllDocuments");
  }

}

export const uploadUserDocument = async (req, res) => {
  try {
    const infoDocs = req.uploadedFiles;
    if (infoDocs.lenght < 1) {
      return res.status(400).json({ message: 'Error upload' })
    }

    console.log('controllers', infoDocs);
    const response = await saveDocumentUserToDatabase(infoDocs);
    res.status(200).send({
      message: "Registro exitoso 🚙",
      data: response
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const uploadVehiculeDocument = async (req, res) => {
  try {

    const infoDocs = req.uploadedFiles;
    if (infoDocs.lenght < 1) {
      return res.status(400).json({ message: 'Error upload' })
    }


    const response = await saveDocumentVehiculeToDatabase(infoDocs);

    res.status(200).send({
      message: "Registro exitoso",
      data: response
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


export const downloadDocumentByRuta = async (req, res) => {
  try {

    const assetId = req.params.id;
    if (!assetId) {
      // Responder con un error si no se pasa la ruta
      return res.status(400).json({
        success: false,
        message: 'La Ruta es requerida',
      });
    }

    // Llamada para obtener la URL del archivo desde Cloudinary
    const response = await downloadFileCloudinary(assetId);
    // Enviar la URL de descarga como respuesta
    return res.status(200).json({
      success: true,
      downloadUrl: response,  // Aquí asumo que `response` es la URL de descarga
    });

  } catch (error) {
    // Manejo de errores
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};




