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



export const findDocsPorExpirar = async () => {
  try {
    const hoy = new Date();
    const diasLimite = 60; // Mostrar documentos que expiren en menos de 60 días

    // Obtener documentos de usuarios y vehículos
    const docs = await Promise.all([
      DocumentosUsuarioModel.find()
        .populate(
          "idUsuario",
          "-password -idRole -createdAt -updatedAt -idCargo -tipoLicencia -telefono -fechaNacimiento"
        )
        .populate("tipoDocumentoId", "-categoria -descripcion"),
      DocumentosVehiculoModel.find()
        .populate("idVehiculo", "marca servicio placa")
        .populate("tipoDocumentoId", "-categoria -descripcion"),
    ]);

    // Procesar los documentos y calcular días faltantes
    const allDocs = [...docs[0], ...docs[1]]
      .map((doc) => {
        if (!doc.fechaExpiracion) return null; // Ignorar documentos sin fecha de expiración

        const fechaExpiracion = new Date(doc.fechaExpiracion);
        const diasFaltantes = Math.ceil(
          (fechaExpiracion - hoy) / (1000 * 60 * 60 * 24)
        );

        return {
          ...doc._doc,
          diasFaltantes,
          estado: diasFaltantes < 0 ? "Expirado" : "Por Expirar",
        };
      })
      .filter((doc) => doc !== null); // Filtrar documentos sin fecha de expiración

    // Filtrar solo los documentos que expiran en menos de 60 días
    const documentosPorExpirar = allDocs.filter(
      (doc) => doc.diasFaltantes > 0 && doc.diasFaltantes <= diasLimite
    );

    const documentosExpirados = allDocs.filter((doc) => doc.diasFaltantes < 0);

    // Contadores de documentos
    const totalProxVencer = documentosPorExpirar.length;
    const totalVencidos = documentosExpirados.length;
    const totalProxVencerUsuario = documentosPorExpirar.filter(
      (doc) => doc.idUsuario
    ).length;
    const totalProxVencerVehiculo = documentosPorExpirar.filter(
      (doc) => doc.idVehiculo
    ).length;
    const totalVencidosUsuario = documentosExpirados.filter(
      (doc) => doc.idUsuario
    ).length;
    const totalVencidosVehiculo = documentosExpirados.filter(
      (doc) => doc.idVehiculo
    ).length;


    return {
      documentosPorExpirar,
      documentosExpirados,
      totalProxVencer,
      totalVencidos,
      totalProxVencerUsuario,
      totalProxVencerVehiculo,
      totalVencidosUsuario,
      totalVencidosVehiculo,
    };
  } catch (error) {
    console.error("Error al obtener documentos por expirar:", error);
    return { success: false, message: "Error interno del servidor" };
  }
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

export default {
  saveUserDocument,
  saveVehiculeDocument,
  getDocumentsByIdVehiculo,
  getDocumentsByIdUser,
  findDocsPorExpirar,
  countDocsPorExpirar,
  findTipoDocumentoByVehiculo,
};
