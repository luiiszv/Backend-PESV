import FormPreoperacionalModel from "../models/FormPreoperacional.model.js";
import UserModel from "../../Auth/models/UserModel.js";

import moment from "moment-timezone";

const findFormulariosDiarios = async (fechaString) => {
  // Convertir la fecha a la zona horaria de Colombia
  const fechaInicio = moment.tz(`${fechaString}T00:00:00`, "America/Bogota").toDate();
  const fechaFin = moment.tz(`${fechaString}T23:59:59.999`, "America/Bogota").toDate();

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


const countFormulariosDiariosConErrores = async (fecha = new Date()) => {
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

const insertFormPreOperacional = async (form_data) => {
  const newForm = new FormPreoperacionalModel(form_data);
  return await newForm.save();


}


const getAllFormsPre = async () => {
  return await FormPreoperacionalModel.find().populate({
    path: 'idUsuario',
    select: ''
  }).populate({
    path: 'formularioId',
    select: ''
  }).populate({
    path: 'respuestas.idPregunta'
  })
}



export default { getAllFormsPre, insertFormPreOperacional, findFormulariosDiarios, findFormulariosDiariosConErrores, getFormPreOperacionalById, countFormulariosDiariosConErrores };
