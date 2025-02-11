import {
  saveDocumentUserToDatabase,
  saveDocumentVehiculeToDatabase,
} from "../services/documents.service.js";

export const getAllDocuments = async (req, res) => {
  try {
    res.status(200).json({ message: "Ok" })

  } catch (error) {
    res.status(500).json("Something was wrong in getAllDocuments");
  }

}

export const uploadUserDocument = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: "Archivo no proporcionado" });
  }

  // La URL del archivo en Cloudinary es proporcionada automáticamente por Multer y CloudinaryStorage
  const fileUrl = req.file.path;

  // Datos del documento que se guardarán en la base de datos
  const documentUserData = {
    idUsuario: req.body.idUsuario,
    tipoDocumentoId: req.body.tipoDocumentoId,
    numeroDocumento: req.body.numeroDocumento,
    fechaExpiracion: req.body.fechaExpiracion,
    ruta: fileUrl, // URL del archivo en Cloudinary
  };

  try {
    const savedDocument = await saveDocumentUserToDatabase(
      documentUserData
    );

    res.status(200).send({
      message: "Archivo subido exitosamente",
      fileUrl: savedDocument.ruta, // URL del archivo en Cloudinary
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadVehiculeDocument = async (req, res) => {
  try {


    console.log(req.fileUrl);
    res.status(200).send({
      message: "Archivo subido exitosamente",
      fileUrl: req.fileUrl 
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};




