import {
  saveDocumentUserToDatabase,
  saveDocumentVehiculeToDatabase,
} from "../services/documents.service.js";

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
    res.status(500).send({ error: error.message });
  }
};

export const uploadVehiculeDocument = async (req, res) => {
    if (!req.file) { //Aqui esta la url del middle ware
      return res.status(400).send({ error: "Archivo no proporcionado" });
    }
  
    // La URL del archivo en Cloudinary es proporcionada automáticamente por Multer y CloudinaryStorage
    const fileUrl = req.file.path;
  
    // Datos del documento que se guardarán en la base de datos
    const documentVehiculeData = {
      idUsuario: req.body.idUsuario,
      tipoDocumentoId: req.body.tipoDocumentoId,
      numeroDocumento: req.body.numeroDocumento,
      fechaExpiracion: req.body.fechaExpiracion,
      ruta: fileUrl, // URL del archivo en Cloudinary
    };
  
    try {
      const documentVehicule = await saveDocumentVehiculeToDatabase(
        documentVehiculeData
      );
  
      res.status(200).send({
        message: "Archivo subido exitosamente",
        fileUrl: documentVehicule.ruta, // URL del archivo en Cloudinary
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

  // updates and tests are missing ok?


