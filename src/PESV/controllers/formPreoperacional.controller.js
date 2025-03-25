import {
  obtenerFormulariosDiarios,
  obtenerFormulariosDiariosConErrores,
  getFormPreOperacionalById,
  insertFormPreOperacional,
  obtenerVehiculosFaltantes,
} from "../services/formPreoperacional.service.js";

import moment from "moment-timezone";

//Script de inset formularios
import { ejecutarMarcadoManual } from "../jobs/preoperacionalCron.js";

export const getFormulariosDiarios = async (req, res) => {
  try {
    const fecha =
      req.query.fecha || moment().tz("America/Bogota").format("YYYY-MM-DD");
    console.log(fecha);
    const result = await obtenerFormulariosDiarios(fecha);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error obteniendo formularios diarios:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor getFormulariosDiarios",
    });
  }
};

export const getFormulariosDiariosErrores = async (req, res) => {
  try {
    const fecha = req.query.fecha || new Date().toISOString().split("T")[0]; // O fecha Actual
    const result = await obtenerFormulariosDiariosConErrores(fecha);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor getFormulariosDiarios",
    });
  }
};

export const getFormularioPreoperacionalById = async (req, res) => {
  try {
    const response = await getFormPreOperacionalById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor getFormularioPreoperacionalById",
    });
  }
};

export const registerFormPreOperaconal = async (req, res) => {
  try {
    const { userId } = req.user;
    const response = await insertFormPreOperacional(userId, req.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor registerFormPreOperaconal",
    });
  }
};

export const getVehiculosFaltantes = async (req, res) => {
  try {
    const { fecha, hora_limite } = req.query;
    const result = await obtenerVehiculosFaltantes(
      fecha,
      hora_limite ? parseInt(hora_limite) : undefined
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const ejecutarPruebaManual = async (req, res) => {
  try {
    const { hora } = req.query;
    const resultado = await ejecutarMarcadoManual(hora ? parseInt(hora) : null);

    res.json({
      success: resultado.success,
      message: resultado.message,
      detalles: resultado.detalles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
