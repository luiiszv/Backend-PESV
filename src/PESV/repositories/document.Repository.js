import DocumentosUsuarioModel from "../models/DocumentosUsuarios.model.js";
import DocumentosVehiculoModel from "../models/DocumentosVehiculos.model.js";
import TipoDocumentsModel from "../models/TipoDocumentos.model.js";

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

const getDocumentsByIdVehiculo = async (id_vehiculo) => {
  return DocumentosVehiculoModel.find({ idVehiculo: id_vehiculo }).populate({
    path: "tipoDocumentoId",
    select: "-categoria -descripcion",
  });
};

const getDocumentsByIdUser = async (id_user) => {
  return DocumentosUsuarioModel.find({ idUsuario: id_user }).populate({
    path: "tipoDocumentoId",
    select: "-categoria -descripcion",
  });
};

export default {
  saveUserDocument,
  saveVehiculeDocument,
  getDocumentsByIdVehiculo,
  getDocumentsByIdUser,
};
