import {
  userProfile,
  findPreguntasByUserVehiculesActive,
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

export const getPreguntasByUserVehiculesActive = async (req, res) => {
  try {
    const response = await findPreguntasByUserVehiculesActive(req.user);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong in getPreguntasByUserVehiculesActive",
      error,
    });
  }
};

export const getUserVehiculos = async (req, res) => {
  try {
    const {userId} = req.user;
    const response = await findAllVehiculosByIdUser(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong in getVehiculos",
      error,
    });
  }
};
