import {
  obtenerFormulariosDiarios,
  obtenerFormulariosDiariosConErrores,
  getFormPreOperacionalById,
  insertFormPreOperacional

} from "../services/formPreoperacional.service.js";

export const getFormulariosDiarios = async (req, res) => {
  try {
    const fecha = req.query.fecha || new Date().toISOString().split("T")[0];
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
}



