import mongoose, { mongo } from "mongoose";
import DocumentsRepository from "../repositories/document.Repository.js";
import VehicleRepository from "../repositories/vehiculo.repository.js";
import moment from "moment-timezone";
import {
  deleteFileCloudinary,
  uploadVehiculosCloudinary,
  uploadUsuariosCloudinary,
} from "../../config/cloudinary.js";
// Configura la zona horaria de Colombia
const timezone = "America/Bogota";

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
    return {
      success: true,
      data: response,
    }; // Devolver la respuesta del repositorio
  } catch (error) {
    console.error("Error al guardar el documento:", error);
    throw new Error("No se pudo guardar el documento.");
  }
};

export const saveUserDocument = async (doc) => {
  try {
    const response = await DocumentsRepository.saveUserDocument(doc);
    return {
      success: true,
      data: response,
    }; // Devolver la respuesta del repositorio
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
  const hoy = moment().tz(timezone).startOf("day"); // Fecha actual en la zona horaria de Colombia
  const fechaLimite = moment().tz(timezone).add(60, "days").endOf("day"); // 60 días en el futuro

  try {
    const { docsUsuarios, docsVehiculos } =
      await DocumentsRepository.findDocsPorExpirar();

    // Procesar documentos de usuarios
    const usersGrouped = docsUsuarios.reduce((acc, doc) => {
      const userId = doc.idUsuario._id.toString();

      if (!acc[userId]) {
        acc[userId] = {
          idUsuario: doc.idUsuario._id,
          name: doc.idUsuario.name + " " + doc.idUsuario.lastName,
          documentId: doc.idUsuario.numeroDocumento,
          email: doc.idUsuario.email,
          status: "valid",
          expiredDocuments: 0,
          totalDocuments: 0,
          documents: [],
        };
      }

      acc[userId].totalDocuments += 1;

      const fechaExpiracion = moment(doc.fechaExpiracion)
        .tz(timezone)
        .startOf("day");
      const diasFaltantes = fechaExpiracion.diff(hoy, "days");

      const documentoCompleto = {
        id: doc._id,
        name: doc.tipoDocumentoId,
        tipoDocumentoId: doc.tipoDocumentoId.nombre,
        numeroDocumento: doc.numeroDocumento,
        fechaExpiracion: fechaExpiracion.format("YYYY-MM-DD"),
        assetId: doc.assetId,
        ruta: doc.ruta,
        daysRemaining: diasFaltantes,
      };

      if (fechaExpiracion.isBefore(hoy)) {
        acc[userId].expiredDocuments += 1;
        documentoCompleto.status = "expired";
      } else if (fechaExpiracion.isBetween(hoy, fechaLimite, null, "[]")) {
        documentoCompleto.status = diasFaltantes <= 30 ? "urgent" : "warning";
      }

      if (
        fechaExpiracion.isBefore(hoy) ||
        fechaExpiracion.isBetween(hoy, fechaLimite, null, "[]")
      ) {
        acc[userId].documents.push(documentoCompleto);
      }

      return acc;
    }, {});

    const usersFinal = Object.values(usersGrouped).filter(
      (user) => user.documents.length > 0
    );

    // Procesar documentos de vehículos
    const vehiclesGrouped = docsVehiculos.reduce((acc, doc) => {
      const vehiculo = doc.idVehiculo;

      // Validar que el vehículo no sea null
      if (!vehiculo) return acc;

      const placa = vehiculo.placa || `SIN-PLACA-${vehiculo._id}`;

      if (!acc[placa]) {
        acc[placa] = {
          id: vehiculo._id,
          plate: vehiculo.placa,
          make: vehiculo.marca,
          model: vehiculo.modeloVehiculo,
          year: vehiculo.modeloVehiculo,
          idUsuario: vehiculo.idUsuarioAsignado?._id,
          owner: vehiculo.idUsuarioAsignado
            ? vehiculo.idUsuarioAsignado.name +
              " " +
              vehiculo.idUsuarioAsignado.lastName
            : "Sin asignar",
          status: "valid",
          expiredDocuments: 0,
          totalDocuments: 0,
          documents: [],
        };
      }

      acc[placa].totalDocuments += 1;

      const fechaExpiracion = moment(doc.fechaExpiracion)
        .tz(timezone)
        .startOf("day");
      const diasFaltantes = fechaExpiracion.diff(hoy, "days");

      const documentoCompleto = {
        id: doc._id,
        name: doc.tipoDocumentoId,
        tipoDocumentoId: doc.tipoDocumentoId.nombre,
        numeroDocumento: doc.numeroDocumento,
        fechaExpiracion: fechaExpiracion.format("YYYY-MM-DD"),
        assetId: doc.assetId,
        ruta: doc.ruta,
        daysRemaining: diasFaltantes,
      };

      if (fechaExpiracion.isBefore(hoy)) {
        acc[placa].expiredDocuments += 1;
        documentoCompleto.status = "expired";
      } else if (fechaExpiracion.isBetween(hoy, fechaLimite, null, "[]")) {
        documentoCompleto.status = diasFaltantes <= 30 ? "urgent" : "warning";
      }

      if (
        fechaExpiracion.isBefore(hoy) ||
        fechaExpiracion.isBetween(hoy, fechaLimite, null, "[]")
      ) {
        acc[placa].documents.push(documentoCompleto);
      }

      return acc;
    }, {});

    const vehiclesFinal = Object.values(vehiclesGrouped).filter(
      (vehicle) => vehicle.documents.length > 0
    );

    return {
      success: true,
      data: {
        users: usersFinal,
        vehicles: vehiclesFinal,
      },
    };
  } catch (error) {
    console.error("Error en findDocsPorExpirar:", error);
    return {
      success: false,
      message: "Error al obtener los documentos por expirar",
      error: error.message,
    };
  }
};

export const updateDocsByVehicule = async (id_doc, data_update, files) => {
  try {
    // Validar que id_doc esté presente
    if (!id_doc) {
      return {
        success: false,
        message: "id_doc es requerido",
      };
    }

    // Buscar el documento existente en la base de datos
    const docExist = await DocumentsRepository.findVehicleDocById(id_doc);

    if (!docExist) {
      return {
        success: false,
        message: "No se encontró ningún documento",
      };
    }

    console.log("Public_id del documento existente:", docExist.public_id);

    let updatedDoc = {
      numeroDocumento: data_update.numeroDocumento || docExist.numeroDocumento,
      fechaExpiracion: data_update.fechaExpiracion || docExist.fechaExpiracion,
      name: docExist.name,
      ruta: docExist.ruta,
      assetId: docExist.assetId,
      public_id: docExist.public_id,
    };

    // Verificar si se ha subido un nuevo archivo
    const newFile = files?.file;

    if (newFile) {
      // Eliminar el archivo existente en Cloudinary antes de subir el nuevo
      const isDeleted = await deleteFileCloudinary(docExist.public_id);
      if (!isDeleted) {
        return {
          success: false,
          message: "No se pudo eliminar el archivo existente en Cloudinary",
        };
      }

      // Subir el nuevo archivo a Cloudinary
      const newDoc = await uploadVehiculosCloudinary(
        newFile.tempFilePath,
        newFile.name
      );

      // Actualizar los datos del documento con la nueva información del archivo
      updatedDoc.name = newFile.name;
      updatedDoc.ruta = newDoc.secure_url;
      updatedDoc.assetId = newDoc.asset_id;
      updatedDoc.public_id = newDoc.public_id;
    }

    // Actualizar el documento en la base de datos
    const updatedDocument = await DocumentsRepository.UpdateVehiuleDocs(
      id_doc,
      updatedDoc
    );

    return {
      success: true,
      message: "Documento actualizado correctamente",
      data: updatedDocument,
    };
  } catch (error) {
    console.error("Error en updateDocsByVehicule:", error);
    return {
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    };
  }
};

export const updateDocsByUser = async (id_doc, data_update, files) => {
  try {
    // Validar que id_doc esté presente
    if (!id_doc) {
      return {
        success: false,
        message: "id_doc es requerido",
      };
    }

    // Buscar el documento existente en la base de datos
    const docExist = await DocumentsRepository.findUserDocById(id_doc);

    if (!docExist) {
      return {
        success: false,
        message: "No se encontró ningún documento",
      };
    }

    console.log("Public_id del documento existente:", docExist.public_id);

    let updatedDoc = {
      numeroDocumento: data_update.numeroDocumento || docExist.numeroDocumento,
      fechaExpiracion: data_update.fechaExpiracion || docExist.fechaExpiracion,
      name: docExist.name,
      ruta: docExist.ruta,
      assetId: docExist.assetId,
      public_id: docExist.public_id,
    };

    // Verificar si se ha subido un nuevo archivo
    const newFile = files?.file;

    if (newFile) {
      // Eliminar el archivo existente en Cloudinary antes de subir el nuevo
      const isDeleted = await deleteFileCloudinary(docExist.public_id);
      if (!isDeleted) {
        return {
          success: false,
          message: "No se pudo eliminar el archivo existente en Cloudinary",
        };
      }

      // Subir el nuevo archivo a Cloudinary
      const newDoc = await uploadUsuariosCloudinary(
        newFile.tempFilePath,
        newFile.name
      );

      // Actualizar los datos del documento con la nueva información del archivo
      updatedDoc.name = newFile.name;
      updatedDoc.ruta = newDoc.secure_url;
      updatedDoc.assetId = newDoc.asset_id;
      updatedDoc.public_id = newDoc.public_id;
    }

    // Actualizar el documento en la base de datos
    const updatedDocument = await DocumentsRepository.UpdateUserDocs(
      id_doc,
      updatedDoc
    );

    return {
      success: true,
      message: "Documento actualizado correctamente",
      data: updatedDocument,
    };
  } catch (error) {
    console.error("Error en updateDocsByUser:", error);
    return {
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    };
  }
};

export const findUserDocById = async (id_doc) => {
  if (!mongoose.Types.ObjectId.isValid(id_doc)) {
    return {
      success: false,
      message: "Id del documento no es valido",
    };
  }
  const doc = await DocumentsRepository.findUserDocById(id_doc);
  if (!doc) {
    return {
      success: false,
      message: "Documento no encontrado",
    };
  }

  return {
    success: true,
    data: doc,
  };
};

export const findVehicleDocById = async (id_doc) => {
  if (!mongoose.Types.ObjectId.isValid(id_doc)) {
    return {
      success: false,
      message: "Id del documento no es valido",
    };
  }
  const doc = await DocumentsRepository.findVehicleDocById(id_doc);
  if (!doc) {
    return {
      success: false,
      message: "Documento no encontrado",
    };
  }

  return {
    success: true,
    data: doc,
  };
};
