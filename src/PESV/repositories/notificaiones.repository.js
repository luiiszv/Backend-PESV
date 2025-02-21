import NotificacionModel from "../models/Notificaciones.model.js";

// 📌 Obtener todas las notificaciones de un usuario
const getAllNotificacionesByIDUser = async (idUsuario) => {
  try {
    return await NotificacionModel.find({ idUsuario }).sort({
      fechaNotificacion: -1,
    });
  } catch (error) {
    console.error("Error obteniendo notificaciones del usuario:", error);
    throw error;
  }
};

const findNotificacionByID = async (idUsuario) => {
  try {
    return await NotificacionModel.findById(idUsuario);
  } catch (error) {
    console.error("Error obteniendo notificaciones del usuario:", error);
    throw error;
  }
};

// 📌 Obtener todas las notificaciones para el administrador
const getAllNotificacionesByAdmin = async () => {
  try {
    return await NotificacionModel.find({ enviadoA: "administrador" }).sort({
      fechaNotificacion: -1,
    });
  } catch (error) {
    console.error("Error obteniendo notificaciones del administrador:", error);
    throw error;
  }
};

// 📌 Crear una nueva notificación
const createNotificacion = async (data) => {
  try {
    const notificacion = new NotificacionModel(data);
    return await notificacion.save();
  } catch (error) {
    console.error("Error creando la notificación:", error);
    throw error;
  }
};

// 📌 Marcar una notificación como leída
const markNotificacionAsRead = async (idNotificacion) => {
  try {
    return await NotificacionModel.findByIdAndUpdate(
      idNotificacion,
      { leida: true },
      { new: true }
    );
  } catch (error) {
    console.error("Error marcando notificación como leída:", error);
    throw error;
  }
};

const findEnumNotify = async () => {
  try {
    const tipos = NotificacionModel.schema.path("tipoNotificacion").enumValues;

    const tiposFormateados = tipos.map((tipo, index) => ({
      _id: tipo,
      name: tipo,
    }));
    return tiposFormateados;
  } catch (error) {
    console.error("Error al obtener los tipos de notificación:", error);
    throw new Error("No se pudieron obtener los tipos de notificación");
  }
};


//Noticiaciones de Fomualrioes con errores o vencimiennto de docuemnto;





export default {
  getAllNotificacionesByIDUser,
  getAllNotificacionesByAdmin,
  createNotificacion,
  markNotificacionAsRead,
  findNotificacionByID,
  findEnumNotify,
};
