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


const getFormPreOperacionalById = async (id_form) => {
  const formulario = await FormPreoperacionalModel.findById(id_form)
    .populate({
      path: "idUsuario",
      select: "name lastName email numeroDocumento",
    })
    .populate({
      path: "formularioId",
      select: "nombreFormulario",
    })
    .populate({
      path: "respuestas.idPregunta",
      select: "preguntaTexto determinancia",
    });

  return formulario;
};


export const countFormulariosDiariosConErrores = async (fecha = new Date()) => {
  try {
      const fechaInicio = new Date(fecha);
      fechaInicio.setHours(0, 0, 0, 0);
      const fechaFin = new Date(fecha);
      fechaFin.setHours(23, 59, 59, 999);

      // Contamos directamente los formularios con errores en el rango de fechas
      const totalErrores = await FormPreoperacionalModel.countDocuments({
          estadoFormulario: "completado_con_errores",
          fechaRespuesta: { $gte: fechaInicio, $lte: fechaFin },
      });

      // Retornamos el mensaje en función del conteo
      return totalErrores > 0
          ? `📢 Hay ${totalErrores} formularios con errores el ${fechaInicio.toLocaleDateString()}.`
          : `✅ No hay formularios con errores el ${fechaInicio.toLocaleDateString()}.`;
  } catch (error) {
      console.error("Error al contar formularios con errores:", error);
      return "⚠️ Error al obtener los formularios con errores.";
  }
};



export default { findFormulariosDiarios, findFormulariosDiariosConErrores, getFormPreOperacionalById, countFormulariosDiariosConErrores };
