import {
  getAllNotificacionesByAdmin,
  getAllNotificacionesByIDUser,
  markNotificacionAsRead,
  createNotificacion,
  getEnumNotify,
  generarNotificaiones,
} from "../services/notificaciones.service.js";

export const getEnumsValues = async (req, res) => {
  try {
    const response = await getEnumNotify();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong in getEnumsValues",
      error,
    });
  }
};

export const createNewNotification = async ({ body }, res) => {
  try {
    const response = await createNotificacion(body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: "Something went wrong in createNewNotification",
      error,
    });
  }
};



export const getAllNotificaionesAdmin = async (req, res) => {
  try {
    const response = await getAllNotificacionesByAdmin();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong in getAllNotificaionesAdmin",
      error,
    });
  }
};

export const getAllNotificaionesUser = async (req, res) => {
  try {
    const response = await getAllNotificacionesByIDUser(req.user.userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong in getAllNotificaionesUser",
      error,
    });
  }
};

export const getAllNotificaionesByIdUser = async (req, res) => {
  try {
    const response = await getAllNotificacionesByIDUser(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong in getAllNotificaionesUser",
      error,
    });
  }
};
export const marcaNotificacionesByLeidas = async (req, res) => {
  try {
    const response = await markNotificacionAsRead(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong in getAllNotificaionesUser",
      error,
    });
  }
};

export const generaNotificaciones = async (req, res) => {
  try {
    const response = await generarNotificaiones();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong in generaNotificaciones",
      error,
    });
  }
};
