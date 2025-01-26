import DocumentosUsuarioModel from "../models/DocumentosUsuarios.model.js";
import DocumentosVehiculoModel from "../models/DocumentosVehiculos.model.js";

const saveUserDocument = async (documentData) => {
  const newDocument = new DocumentosUsuarioModel(documentData);
  await newDocument.save();
  return newDocument;
};

const saveVehiculeDocument = async (documentData) => {
  const newDocument = new DocumentosVehiculoModel(documentData);
  await newDocument.save();
  return newDocument;
};

export default { saveUserDocument, saveVehiculeDocument };
