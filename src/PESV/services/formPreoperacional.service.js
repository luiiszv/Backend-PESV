import mongoose from "mongoose";
import FormPreoperacionalRepository from "../repositories/formPreoperacional.repository.js";
import UserRepository from "../../Auth/repositories/user.repository.js";
import FormRepository from "../repositories/formualrios.respository.js";
import PreguntasRepository from "../repositories/Preguntas.repository.js";

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
  const { formularioId, respuestas } = form_data;

  // Verificar si el usuario y el formulario existen
  const idUsuarioExist = await UserRepository.findUserById(idUsuario);
  if (!idUsuarioExist) {
    return { success: false, message: "El usuario no fue encontrado." };
  }

  const formularioIdExist = await FormRepository.findFormualrioByID(formularioId);
  if (!formularioIdExist) {
    return { success: false, message: "El formulario no fue encontrado." };
  }

  let estadoFormulario = "completado";

  // Si no se envían respuestas, se considera "no_aplica"
  if (!Array.isArray(respuestas) || respuestas.length === 0) {
    estadoFormulario = "no_aplica";
  } else {
    // Validar preguntas y verificar si alguna es determinante con respuesta false
    for (const { idPregunta, respuesta } of respuestas) {
      const preguntaExist = await PreguntasRepository.findPreguntaById(idPregunta);

      if (!preguntaExist) {
        return {
          success: false,
          message: `La pregunta con ID ${idPregunta} no fue encontrada.`,
        };
      }

      if (preguntaExist.determinancia && respuesta === false) {
        estadoFormulario = "completado_con_errores";
      }
    }
  }

  // Preparar datos y registrar en la base de datos
  const formDataStatus = { ...form_data, estadoFormulario, idUsuario };

  const response = await FormPreoperacionalRepository.insertFormPreOperacional(formDataStatus);
  return {
    success: true,
    message: "Formulario Registrado",
    data: response,
  };
};




