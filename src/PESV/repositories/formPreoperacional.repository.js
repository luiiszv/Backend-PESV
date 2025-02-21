import FormPreoperacionalModel from "../models/FormPreoperacional.model.js";

const findFormulariosDiarios = async (fecha) => {
  const fechaInicio = new Date(fecha);
  fechaInicio.setHours(0, 0, 0, 0);
  const fechaFin = new Date(fecha);
  fechaFin.setHours(23, 59, 59, 999);

  return await FormPreoperacionalModel.find({
    fechaRespuesta: { $gte: fechaInicio, $lte: fechaFin },
  })
    .populate("idUsuario", "name lastName email numeroDocumento")
    .populate("formularioId", "nombreFormulario")
    .select("estadoFormulario fechaRespuesta");
};

const findFormulariosDiariosConErrores = async (fecha) => {
  const fechaInicio = new Date(fecha);
  fechaInicio.setHours(0, 0, 0, 0);
  const fechaFin = new Date(fecha);
  fechaFin.setHours(23, 59, 59, 999);

  return await FormPreoperacionalModel.find({
    estadoFormulario: "completado_con_errores",
    fechaRespuesta: { $gte: fechaInicio, $lte: fechaFin },
  })
    .populate("idUsuario", "name lastName email numeroDocumento")
    .populate("formularioId", "nombreFormulario")
    .select("estadoFormulario fechaRespuesta");
};

export default { findFormulariosDiarios, findFormulariosDiariosConErrores };
