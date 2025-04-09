import {
  findAllVehiculos,
  findSelectInformationVehiculos,
  updateVehicule,
  toggleVehiculoEnUso,
  obtenerVehiculosSinPreoperacional,
} from "../services/vehicule.service.js";
import { getDocuemntsByIdVehiculo } from "../services/documents.service.js";

export const getAllVehiculos = async (req, res) => {
  try {
    const response = await findAllVehiculos();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong in getAllVehiculos",
      error,
    });
  }
};

export const getAllSelectVehicules = async (req, res) => {
  try {
    const response = await findSelectInformationVehiculos();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong in getAllSelectVehicules",
      error,
    });
  }
};

export const getDocsByIdVehiculo = async (req, res) => {
  try {
    const id_vehiculo = req.params.id;
    const response = await getDocuemntsByIdVehiculo(id_vehiculo);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong in getAllSelectVehicules",
      error,
    });
  }
};

export const editVehicule = async (req, res) => {
  const { body, params } = req;
  try {
    const response = await updateVehicule(params.id, body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    console.log(error);
    res.status(400).json({
      message: "Something went wrong in editVehicule",
      error,
    });
  }
};

export const changeEstadoUso = async (req, res) => {
  const { params } = req;
  try {
    const response = await toggleVehiculoEnUso(params.id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    console.log(error);
    res.status(400).json({
      message: "Something went wrong in editVehicule",
      error,
    });
  }
};

export const getVehiculosSinFormularioPreOperacionalDiario = async (
  req,
  res
) => {
  const response = await obtenerVehiculosSinPreoperacional(req.user.userId);
  res.status(200).json(response);
  try {
  } catch (error) {
    console.log(error);
    console.log(error);
    res.status(400).json({
      message: "Something went wrong in editVehicule",
      error,
    });
  }
};




