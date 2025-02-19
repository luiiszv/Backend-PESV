import DocumentosUsuarioModel from "../models/DocumentosUsuarios.model.js";
import DocumentosVehiculoModel from "../models/DocumentosVehiculos.model.js";
import TipoDocumentsModel from "../models/TipoDocumentos.model.js";
import UserModel from "../../Auth/models/UserModel.js";
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

export const findDocsPorExpirar = async (hoy, fechaLimite) => {
  const [docsUserExp, docsVehiculeExp] = await Promise.all([
    DocumentosUsuarioModel.find({
      fechaExpiracion: { $gte: hoy, $lte: fechaLimite }
    }).populate("idUsuario", "-password -idRole -createdAt -updatedAt -idCargo -tipoLicencia -telefono -fechaNacimiento")
      .populate("tipoDocumentoId",  "-categoria -descripcion"),

    DocumentosVehiculoModel.find({
      fechaExpiracion: { $gte: hoy, $lte: fechaLimite }
    }).populate("idVehiculo", "marca servicio placa")
      .populate("tipoDocumentoId", "-categoria -descripcion")
  ]);

  // Función para calcular días faltantes
  const calcularDiasFaltantes = (fechaExpiracion) => {
    const diferenciaMs = new Date(fechaExpiracion) - new Date(hoy);
    return Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24)); // Convertir ms a días
  };

  // Agregar la propiedad `diasFaltantes` a cada documento
  docsUserExp.forEach(doc => {
    doc._doc.diasFaltantes = calcularDiasFaltantes(doc.fechaExpiracion);
  });

  docsVehiculeExp.forEach(doc => {
    doc._doc.diasFaltantes = calcularDiasFaltantes(doc.fechaExpiracion);
  });

  return {
    docsUserExp,
    docsVehiculeExp
  };
};


export default {
  saveUserDocument,
  saveVehiculeDocument,
  getDocumentsByIdVehiculo,
  getDocumentsByIdUser,
  findDocsPorExpirar
};
