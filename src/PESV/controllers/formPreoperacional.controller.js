import {
  obtenerFormulariosDiarios,
  obtenerFormulariosDiariosConErrores,
} from "../services/formPreoperacional.service.js";

export const getFormulariosDiarios = async (req, res) => {
  try {
    const fecha = req.query.fecha || new Date().toISOString().split("T")[0]; // O fecha Actual
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
