import {
  findAllUsers,
  updateUser,
  createFormPreguntas,
  changeEstadoPregunta,
  findAllPreguntas,
  findUserById,
  findVehiculosByUserId,
  findPreguntaById,
  insertAdminVehiculos,
} from "../services/admin.service.js";

import { findPreguntasByIdClaseVehiculo } from "../services/preguntas.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const response = await findAllUsers();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong in getAllUsers", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id_user = req.params.id;
    const response = await findUserById(id_user);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong in getAllUsers", error });
  }
};

export const updateOneUser = async ({ body }, res) => {
  try {
    const response = await updateUser(body);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong in updateOneUser", error });
  }
};

export const createFormPregunta = async ({ body }, res) => {
  const { userId } = req.user; //Auth
  try {
    const response = await createFormPreguntas(userId, body);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong in createFormPregunta", error });
  }
};

export const getAllFormPreguntas = async ({ body }, res) => {
  try {
    const response = await findAllPreguntas();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong in getAllFormPreguntas", error });
  }
};

export const getPreguntaById = async (req, res) => {
  try {
    const response = await findPreguntaById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong in getPreguntaById", error });
  }
};

export const changeStatusPregunta = async (id_pregunta) => {
  try {
    const response = await changeEstadoPregunta(id_pregunta);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong in changeEstadoPregunta", error });
  }
};

export const getVehiclosByUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const response = await findVehiculosByUserId(idUser);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong in getVehiuclosByUser", error });
  }
};

export const findPreguntasByClaseVehiculo = async (req, res) => {
  console.log("clase vehiculo preguntas", req.params.id);
  try {
    const idClaseVehiculo = req.params.id; //idVehiuclo envaido desde params
    const response = await findPreguntasByIdClaseVehiculo(idClaseVehiculo);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({
        message: "Something went wrong in findPreguntasByClaseVehiculo",
      });
  }
};

export const registerAdminVehiculos = async (req, res) => {
  try {
    const userAdmin = req.user;
    const response = await insertAdminVehiculos(userAdmin.userId, req.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({
        message: "Something went wrong in registerAdminVehiculos",
      });
  }
};
