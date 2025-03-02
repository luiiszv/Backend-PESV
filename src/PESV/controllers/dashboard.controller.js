import dashboardRepository from "../repositories/dashboard.repository.js";
import {
  findEstadisticasVehiculos,
  findEstaidsticasFormularios,
  findAllDataDash
} from "../services/dashboard.service.js";

export const getEstadisticasVehiculosDash = async (req, res) => {
  try {
    const response = await findEstadisticasVehiculos();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json("Something was wrong in getEstadisticasVehiculosDash");
  }
};

export const getEstadisticasFormsDash = async (req, res) => {
  try {
    const fecha = req.query.fecha || new Date().toISOString().split("T")[0]; // O fecha Actual
    const response = await findEstaidsticasFormularios(fecha);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json("Something was wrong in getEstadisticasFormsDash");
  }
};

export const getAllDataDash = async (req, res) => {
  try {
    const fecha = req.query.fecha || new Date().toISOString().split("T")[0]; // O fecha Actual
    const response = await findAllDataDash(fecha);
    res.status(200).json(response);


  } catch (error) {
    console.log(error);
    res.status(500).json("Something was wrong in getEstadisticasFormsDash");

  }

}
