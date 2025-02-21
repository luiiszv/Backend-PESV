import FormPreoperacionalModel from "../models/FormPreoperacional.model.js";

const findFormulariosDiarios = async (fechaString) => {
  // Convertir la fecha a formato UTC ajustando el inicio y fin del día en Colombia (GMT-5)
  const fechaInicio = new Date(`${fechaString}T00:00:00.000-05:00`); // Medianoche en Colombia
  const fechaFin = new Date(`${fechaString}T23:59:59.999-05:00`); // Fin del día en Colombia

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
