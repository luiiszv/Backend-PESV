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
  const docs = await Promise.all([
    DocumentosUsuarioModel.find().populate("idUsuario", "-password -idRole -createdAt -updatedAt -idCargo -tipoLicencia -telefono -fechaNacimiento")
      .populate("tipoDocumentoId", "-categoria -descripcion"),
    DocumentosVehiculoModel.find().populate("idVehiculo", "marca servicio placa")
      .populate("tipoDocumentoId", "-categoria -descripcion")
  ]);

  const allDocs = [...docs[0], ...docs[1]].map(doc => {
    const diasFaltantes = Math.ceil((new Date(doc.fechaExpiracion) - new Date(hoy)) / (1000 * 60 * 60 * 24));
    return {
      ...doc._doc,
      diasFaltantes,
      estado: diasFaltantes < 0 ? "Expirado" : "Por Expirar"
    };
  });

  const docsPorExpirar = allDocs.filter(doc => doc.diasFaltantes >= 0 && doc.diasFaltantes <= fechaLimite);
  const docsExpirados = allDocs.filter(doc => doc.diasFaltantes < 0);

  const totalProxVencer = docsPorExpirar.length;
  const totalVencidos = docsExpirados.length;
  const totalProxVencerUsuario = docsPorExpirar.filter(doc => doc.idUsuario).length;
  const totalProxVencerVehiculo = docsPorExpirar.filter(doc => doc.idVehiculo).length;
  const totalVencidosUsuario = docsExpirados.filter(doc => doc.idUsuario).length;
  const totalVencidosVehiculo = docsExpirados.filter(doc => doc.idVehiculo).length;

  return {
    documentosPorExpirar: docsPorExpirar,
    documentosExpirados: docsExpirados,
    totalProxVencer,
    totalVencidos,
    totalProxVencerUsuario,
    totalProxVencerVehiculo,
    totalVencidosUsuario,
    totalVencidosVehiculo
  };
};



export const countDocsPorExpirar = async (hoy, fechaLimite) => {
  const docs = await Promise.all([
    DocumentosUsuarioModel.find().select("fechaExpiracion"),
    DocumentosVehiculoModel.find().select("fechaExpiracion"),
  ]);

  const allDocs = [...docs[0], ...docs[1]].map(doc => {
    const diasFaltantes = Math.ceil((new Date(doc.fechaExpiracion) - new Date(hoy)) / (1000 * 60 * 60 * 24));
    return diasFaltantes;
  });

  const totalProxVencer = allDocs.filter(dias => dias >= 0 && dias <= fechaLimite).length;
  const totalVencidos = allDocs.filter(dias => dias < 0).length;

  let mensaje = "No hay documentos por expirar ni vencidos.";
  if (totalProxVencer > 0 || totalVencidos > 0) {
    mensaje = `🔔 Hay ${totalProxVencer} documentos próximos a vencer en los próximos ${fechaLimite} días y ${totalVencidos} documentos ya vencidos.`;
  }

  return mensaje;
};



export default {
  saveUserDocument,
  saveVehiculeDocument,
  getDocumentsByIdVehiculo,
  getDocumentsByIdUser,
  findDocsPorExpirar
};
