import DocumentosUsuarioModel from "../models/DocumentosUsuarios.model.js";
import DocumentosVehiculoModel from "../models/DocumentosVehiculos.model.js";
import TipoDocumentsModel from "../models/TipoDocumentos.model.js";
import UserModel from "../../Auth/models/UserModel.js";
import VehiculosModel from "../models/vehiculos.model.js";

const findUserByDocument = async (idDoc) => {
  try {
    // Intentar buscar en documentos de usuarios
    const documentoUsuario = await DocumentosUsuarioModel.findById(
      idDoc
    ).populate("idUsuario");
    if (documentoUsuario) {
      return documentoUsuario.idUsuario;
    }

    // Si no se encuentra en documentos de usuario, buscar en documentos de vehículos
    const documentoVehiculo = await DocumentosVehiculoModel.findById(
      idDoc
    ).populate({
      path: "idVehiculo",
      populate: { path: "idUsuario" }, // Hace el join con el usuario
    });

    return documentoVehiculo?.idVehiculo?.idUsuario || null;
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    return null;
  }
};

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

const findDocsPorExpirar = async () => {
  // Obtener todos los documentos de usuarios
  const docsUsuarios = await DocumentosUsuarioModel.find()
    .populate("idUsuario", "name lastName email numeroDocumento")
    .populate("tipoDocumentoId", "nombre");

  // Obtener todos los documentos de vehículos
  const docsVehiculos = await DocumentosVehiculoModel.find()
    .populate("idVehiculo", "marca placa modeloVehiculo idUsuarioAsignado")
    .populate("tipoDocumentoId", "nombre")

    .populate({
      path: "idVehiculo",
      populate: { path: "idUsuarioAsignado", select: "name lastName" }, // Populate anidado
    });

  return { docsUsuarios, docsVehiculos };
};

export const countDocsPorExpirar = async (hoy, fechaLimite) => {
  const docs = await Promise.all([
    DocumentosUsuarioModel.find().select("fechaExpiracion"),
    DocumentosVehiculoModel.find().select("fechaExpiracion"),
  ]);

  const allDocs = [...docs[0], ...docs[1]].map((doc) => {
    const diasFaltantes = Math.ceil(
      (new Date(doc.fechaExpiracion) - new Date(hoy)) / (1000 * 60 * 60 * 24)
    );
    return diasFaltantes;
  });

  console.log(allDocs);

  const totalProxVencer = allDocs.filter(
    (dias) => dias >= 0 && dias <= fechaLimite
  ).length;
  const totalVencidos = allDocs.filter((dias) => dias < 0).length;

  let mensaje = "No hay documentos por expirar ni vencidos.";
  if (totalProxVencer > 0 || totalVencidos > 0) {
    mensaje = `🔔 Hay ${totalProxVencer} documentos próximos a vencer en los próximos ${fechaLimite} días y ${totalVencidos} documentos ya vencidos.`;
  }

  return mensaje;
};

const findTipoDocumentoByVehiculo = async (idVehiculo, tipoDocumentoId) => {
  return await DocumentosVehiculoModel.findOne({
    idVehiculo,
    tipoDocumentoId,
  }).populate("tipoDocumentoId");
};

const findTipoDocumentoByUser = async (idUsuario, tipoDocumentoId) => {
  return await DocumentosUsuarioModel.findOne({
    idUsuario,
    tipoDocumentoId,
  }).populate("tipoDocumentoId");
};

//Encontrar el documento por el idVehiculo y el assetId de cloudinary
const findVehicleDocById = async (id_doc) => {
  return await DocumentosVehiculoModel.findById(id_doc);
};

const UpdateVehiuleDocs = async (id_doc, vehiculeData) => {
  return await DocumentosVehiculoModel.updateOne(
    { _id: id_doc },
    { $set: vehiculeData },
    { runValidators: true }
  );
};

const findUserDocById = async (id_doc) => {
  return await DocumentosUsuarioModel.findById(id_doc);
};

const UpdateUserDocs = async (id_doc, userData) => {
  return await DocumentosUsuarioModel.updateOne(
    { _id: id_doc },
    { $set: userData },
    { runValidators: true }
  );
};

export default {
  saveUserDocument,
  saveVehiculeDocument,
  getDocumentsByIdVehiculo,
  getDocumentsByIdUser,
  findDocsPorExpirar,
  countDocsPorExpirar,
  findTipoDocumentoByVehiculo,
  findUserByDocument,
  findTipoDocumentoByUser,
  findVehicleDocById,
  UpdateVehiuleDocs,
  findUserDocById,
  UpdateUserDocs
};
