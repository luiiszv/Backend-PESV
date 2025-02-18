import {
  userProfile,
  findPreguntasByClaseVehiculesActive,
  getAllSelctUser,
  getDocuemntsByIdUser
} from "../services/users.service.js";

import {
  insertVehiculo,
  findAllVehiculosByIdUser,
} from "../services/vehicule.service.js";

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const response = await userProfile(userId);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong in getProfile", error });
  }
};

export const createVehiculo = async (req, res) => {
  try {
    const { userId } = req.user;
    const response = await insertVehiculo(userId, req.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong in getProfile", error });
  }
};

export const getPreguntasByVehiculesActive = async (req, res) => {
  try {
    const idClaseVehiculo = req.params.id;
    const response = await findPreguntasByClaseVehiculesActive(idClaseVehiculo);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong in getPreguntasByUserVehiculesActive",
      error,
    });
  }
};

export const getUserVehiculos = async (req, res) => {
  try {
    const { userId } = req.user;
    const response = await findAllVehiculosByIdUser(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong in getUserVehiculos",
      error,
    });
  }
};

export const getSelectRegisterUser = async (req, res) => {
  try {
    const response = await getAllSelctUser();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong in getSelectRegisterUser",
      error,
    });
  }
};

export const getDocsByIdUser = async (req, res) => {
  try {
    const id_user = req.params.id;
    const response = await getDocuemntsByIdUser(id_user);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong in getDocuemntsByIdUser",
      error,
    });
  }
};
