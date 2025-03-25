import NotificacionesRepository from "../repositories/notificaiones.repository.js";
import UserRepository from "../../Auth/repositories/user.repository.js";
import DocuemntRepository from "../repositories/document.Repository.js";
import FormPreoperaciionalRepository from "../repositories/formPreoperacional.repository.js";
import mongoose from "mongoose";
import DocumentRepository from "../repositories/document.Repository.js";

export const getAllNotificacionesByIDUser = async (idUsuario) => {
  if (!idUsuario) {
    return {
      success: false,
      message: "Id Usuario es requerido",
    };
  }

  if (!mongoose.Types.ObjectId.isValid(idUsuario)) {
    return {
      success: false,
      message: "Id Usuario no es valido",
    };
  }

  const allNotify = await NotificacionesRepository.getAllNotificacionesByIDUser(
    idUsuario
  );

  if (!allNotify || allNotify.length === 0) {
    return {
      success: false,
      data: [],
      message: "No hay notificaciones aún",
    };
  }

  return {
    success: true,
    data: allNotify,
  };
};

export const getAllNotificacionesByAdmin = async () => {
  const allNotifyAdmin =
    await NotificacionesRepository.getAllNotificacionesByAdmin();

  if (!allNotifyAdmin || allNotifyAdmin.length === 0) {
    return {
      success: false,
      message: "No hay notificaciones aún",
    };
  }

  return {
    success: true,
    data: allNotifyAdmin,
  };
};

export const createNotificacion = async (notificacionData) => {
  try {
    let { idUsuario } = notificacionData;

    // Si no hay idUsuario después de intentar con idDoc, devolver error
    if (!idUsuario) {
      return {
        success: false,
        message: "Se requiere un ID de usuario para crear la notificación.",
      };
    }

    const userExist = await UserRepository.findUserById(idUsuario);
    if (!userExist) {
      return {
        success: false,
        message: "Usuario no encontrado notificación.",
      };
    }

    // Crear la notificación con el ID de usuario asignado
    const newNotificacion = { ...notificacionData, idUsuario };
    const newNotify = await NotificacionesRepository.createNotificacion(
      newNotificacion
    );

    return {
      success: true,
      data: newNotify,
    };
  } catch (error) {
    console.error("Error al crear notificación:", error);
    return {
      success: false,
      message: "Ocurrió un error al crear la notificación.",
    };
  }
};

export const markNotificacionAsRead = async (idNotificacion) => {
  if (!idNotificacion) {
    return {
      success: false,
      message: "Id de la Notifiacion es requerida",
    };
  }

  if (!mongoose.Types.ObjectId.isValid(idNotificacion)) {
    return {
      success: false,
      message: "Id de la Notifiacion no es valido",
    };
  }

  const notifyExist = await NotificacionesRepository.findNotificacionByID(
    idNotificacion
  );
  if (!notifyExist) {
    return {
      success: false,
      message: "Notificacion no Encontrada",
    };
  }

  const updatedNotify = await NotificacionesRepository.markNotificacionAsRead(
    idNotificacion
  );

  if (!updatedNotify) {
    return {
      success: false,
      message: "Error al marcar como leída",
    };
  }

  return {
    success: true,
    data: updatedNotify,
  };
};

export const getEnumNotify = async () => {
  const enums = await NotificacionesRepository.findEnumNotify();
  return {
    success: true,
    data: enums,
  };
};

export const generarNotificaiones = async () => {
  const documentosExpirar = await DocuemntRepository.countDocsPorExpirar();
  const formsConErrores =
    await FormPreoperaciionalRepository.countFormulariosDiariosConErrores();
  const notify = {
    documentosExpirar,
    formsConErrores,
  };

  return {
    success: true,
    data: notify,
  };
};
