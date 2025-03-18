import mongoose from "mongoose";
import FormPreoperacionalRepository from "../repositories/formPreoperacional.repository.js";
import UserRepository from "../../Auth/repositories/user.repository.js";
import FormRepository from "../repositories/formualrios.respository.js";
import PreguntasRepository from "../repositories/Preguntas.repository.js";
import vehiculoRepository from "../repositories/vehiculo.repository.js";
import NotifyRepository from "../repositories/notificaiones.repository.js";


export const obtenerFormulariosDiarios = async (fecha) => {
  const formularios = await FormPreoperacionalRepository.findFormulariosDiarios(
    fecha
  );

  if (!formularios.length) {
    return {
      success: false,
      message: "No hay formularios registrados en esta fecha.",
    };
  }

  return { success: true, data: formularios };
};

export const obtenerFormulariosDiariosConErrores = async (fecha) => {
  const errorForms =
    await FormPreoperacionalRepository.findFormulariosDiariosConErrores(fecha);
  if (!errorForms.length) {
    return {
      success: false,
      message: "No hay formularios registrados con errores en esta fecha.",
    };
  }

  return { success: true, data: errorForms };
};

export const getFormPreOperacionalById = async (id_form) => {
  if (!id_form) {
    return {
      success: false,
      message: "Id del formulario es requerido",
    };
  }
  if (!mongoose.Types.ObjectId.isValid(id_form)) {
    return {
      success: false,
      message: "Id del formulario no es valido",
    };
  }
  const form = await FormPreoperacionalRepository.getFormPreOperacionalById(
    id_form
  );

  return {
    success: true,
    data: form,
  };
};



export const insertFormPreOperacional = async (idUsuario, form_data) => {
  const { formularioId, respuestas, idVehiculo } = form_data;

  // Verificar si el usuario existe
  const usuarioExist = await UserRepository.findUserById(idUsuario);
  if (!usuarioExist) {
    return { success: false, message: "El usuario no fue encontrado." };
  }

  // Verificar si el formulario existe
  const formularioExist = await FormRepository.findFormualrioByID(formularioId);
  if (!formularioExist) {
    return { success: false, message: "El formulario no fue encontrado." };
  }

  // Verificar si el vehículo existe
  const vehiculoExist = await vehiculoRepository.findVehiculeById(idVehiculo);
  if (!vehiculoExist) {
    return { success: false, message: "Vehículo no encontrado." };
  }

  let estadoFormulario = "completado";

  // Si no hay respuestas, se considera "no_aplica"
  if (!Array.isArray(respuestas) || respuestas.length === 0) {
    estadoFormulario = "no_aplica";
  } else {
    for (const { idPregunta, respuesta } of respuestas) {
      const preguntaExist = await PreguntasRepository.findPreguntaById(idPregunta);

      if (!preguntaExist) {
        return { success: false, message: `La pregunta con ID ${idPregunta} no fue encontrada.` };
      }

      if (preguntaExist.determinancia && respuesta === false) {
        estadoFormulario = "completado_con_errores";
      }
    }
  }

  // Registrar el formulario con su estado
  const formDataStatus = { ...form_data, estadoFormulario, idUsuario };
  const response = await FormPreoperacionalRepository.insertFormPreOperacional(formDataStatus);

  // Notificar en caso de errores en el formulario
  if (estadoFormulario == "completado_con_errores") {
    const res = await NotifyRepository.createNotificacion({
      idUsuario: vehiculoExist.idUsuarioAsignado || vehiculoExist.idUsuario,
      tipoNotificacion: "formulario_con_errores",
      detalle: `El vehículo con placa ${vehiculoExist.placa} ha realizado un formulario con errores.`,
      enviadoA: ["administrador"],
    });
    console.log(res)
  }

  return {
    success: true,
    message: estadoFormulario === "completado_con_errores" ? "Formulario Registrado Con Errores" : "Formulario Registrado",
    data: response,
  };
};
