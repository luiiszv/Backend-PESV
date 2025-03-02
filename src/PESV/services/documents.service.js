import mongoose from "mongoose";
import DocumentsRepository from "../repositories/document.Repository.js";

//Guardar Documento del Usuario
export const saveDocumentUserToDatabase = async (documentData) => {
  try {
    const savedDocuments = await Promise.all(
      documentData.map(async (doc) => {
        try {
          const response = await DocumentsRepository.saveUserDocument(doc);
          if (response?.affectedRows > 0) {
            return {
              success: true,
              message: "Documento guardado correctamente",
              doc,
            };
          } else {
            return {
              success: false,
              message: "No se pudo guardar el documento",
              doc,
            };
          }
        } catch (error) {
          console.error(
            `Error al guardar el documento ${doc.tipoDocumentoId}:`,
            error
          );
          return {
            success: false,
            message: "Error al guardar el documento",
            doc,
            error: error.message,
          };
        }
      })
    );

    return savedDocuments;
  } catch (error) {
    console.error("Error general al guardar los documentos:", error);
    throw new Error(
      "Error general al guardar los documentos en la base de datos"
    );
  }
};

//Guardar Documento del Vehiculo
export const saveManyDocumentVehiculeToDatabase = async (documentData) => {
  try {
    const savedDocuments = await Promise.all(
      documentData.map(async (doc) => {
        try {
          const response = await DocumentsRepository.saveVehiculeDocument(doc);

          if (response?.affectedRows > 0) {
            return {
              success: true,
              message: "Documento guardado correctamente",
              doc,
            };
          } else {
            return {
              success: false,
              message: "No se pudo guardar el documento",
              doc,
            };
          }
        } catch (error) {
          console.error(
            `Error al guardar el documento ${doc.tipoDocumentoId}:`,
            error
          );
          return {
            success: false,
            message: "Error al guardar el documento",
            doc,
            error: error.message,
          };
        }
      })
    );

    return savedDocuments;
  } catch (error) {
    console.error("Error general al guardar los documentos:", error);
    throw new Error(
      "Error general al guardar los documentos en la base de datos"
    );
  }
};

export const saveVehiculeDocument = async (doc) => {
  try {
    const response = await DocumentsRepository.saveVehiculeDocument(doc);
    return response; // Devolver la respuesta del repositorio
  } catch (error) {
    console.error("Error al guardar el documento:", error);
    throw new Error("No se pudo guardar el documento.");
  }
};

export const getDocuemntsByIdVehiculo = async (id_vehiculo) => {
  if (!id_vehiculo) {
    return {
      success: false,
      message: "Id del Vehiculo es requerido",
    };
  }

  if (!mongoose.Types.ObjectId.isValid(id_vehiculo)) {
    return {
      suceess: false,
      message: "Id del Vehiculo no es valido",
    };
  }

  const docsVehicule = await DocumentsRepository.getDocumentsByIdVehiculo(
    id_vehiculo
  );
  if (!docsVehicule && docsVehicule.lenght < 0) {
    return {
      success: false,
      message: "No hay documentos aún",
    };
  }

  return {
    success: true,
    data: docsVehicule,
  };
};

export const getDocuemntsByIdUser = async (id_user) => {
  if (!id_user) {
    return {
      success: false,
      message: "Id del Usuario es requerido",
    };
  }

  if (!mongoose.Types.ObjectId.isValid(id_user)) {
    return {
      suceess: false,
      message: "Id del Usuario no es valido",
    };
  }

  const docsUser = await DocumentsRepository.getDocumentsByIdUser(id_user);
  if (!docsUser && docsUser.lenght < 0) {
    return {
      success: false,
      message: "No hay documentos aún",
    };
  }

  return {
    success: true,
    data: docsUser,
  };
};

export const findDocsPorExpirar = async () => {
  const hoy = new Date();
  const fechaLimite = new Date();
  fechaLimite.setDate(hoy.getDate() + 60);

  try {
    const { docsUsuarios, docsVehiculos } = await DocumentsRepository.findDocsPorExpirar(hoy, fechaLimite);

    // 🔹 Procesar documentos de usuarios (sin idUsuario)
    const docsUsuariosProcesados = docsUsuarios.map((doc) => {
      const diasFaltantes = Math.ceil((new Date(doc.fechaExpiracion) - hoy) / (1000 * 60 * 60 * 24));
      return {
        ...doc._doc,
        diasFaltantes,
        estado: diasFaltantes < 0 ? "Expirado" : "Por Expirar",
      };
    });

    // 🔹 Procesar documentos de vehículos (sin idUsuarioAsignado)
    const docsVehiculosProcesados = docsVehiculos.map((doc) => {
      const diasFaltantes = Math.ceil((new Date(doc.fechaExpiracion) - hoy) / (1000 * 60 * 60 * 24));
      return {
        ...doc._doc,
        diasFaltantes,
        estado: diasFaltantes < 0 ? "Expirado" : "Por Expirar",
      };
    });

    // 🔹 Clasificar documentos según su estado
    const docsUsuariosPorExpirar = docsUsuariosProcesados.filter((doc) => doc.diasFaltantes >= 0);
    const docsUsuariosExpirados = docsUsuariosProcesados.filter((doc) => doc.diasFaltantes < 0);
    const docsVehiculosPorExpirar = docsVehiculosProcesados.filter((doc) => doc.diasFaltantes >= 0);
    const docsVehiculosExpirados = docsVehiculosProcesados.filter((doc) => doc.diasFaltantes < 0);

    return {
      success: true,
      message:
        docsUsuariosPorExpirar.length > 0 || docsVehiculosPorExpirar.length > 0
          ? "Documentos por expirar encontrados"
          : "No hay documentos próximos a vencer",
      data: {
        // 📌 Documentos de usuarios (sin idUsuario)
        documentosUsuariosPorExpirar: docsUsuariosPorExpirar,
        documentosUsuariosExpirados: docsUsuariosExpirados,
        totalProxVencerUsuario: docsUsuariosPorExpirar.length,
        totalVencidosUsuario: docsUsuariosExpirados.length,

        // 📌 Documentos de vehículos (sin idUsuarioAsignado)
        documentosVehiculosPorExpirar: docsVehiculosPorExpirar,
        documentosVehiculosExpirados: docsVehiculosExpirados,
        totalProxVencerVehiculo: docsVehiculosPorExpirar.length,
        totalVencidosVehiculo: docsVehiculosExpirados.length,

        // 📌 Totales generales
        totalProxVencer: docsUsuariosPorExpirar.length + docsVehiculosPorExpirar.length,
        totalVencidos: docsUsuariosExpirados.length + docsVehiculosExpirados.length,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al obtener los documentos por expirar",
      error: error.message,
    };
  }
};

