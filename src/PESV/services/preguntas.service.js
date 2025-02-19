import mongoose from "mongoose";
import PreguntasRepository from "../repositories/Preguntas.repository.js";

export const findPreguntaById = async (id_pregunta) => {
  if (!id_pregunta) {
    return {
      success: false,
      message: "Id Pregunta es requerido",
    };
  }
  if (!mongoose.Types.ObjectId.isValid(id_pregunta)) {
    return {
      success: false,
      message: "Id Pregunta no es valido",
    };
  }
  const response = await PreguntasRepository.findPreguntaById(id_pregunta);
  if (!response) {
    return {
      success: false,
      message: "Pregunta no Encontrada",
    };
  }
  return {
    success: true,
    data: response,
  };
};

export const updatePregunta = async (id_pregunta, datos_actualizados) => {
  if (!id_pregunta) {
    return {
      success: false,
      message: "Id Pregunta es requerido",
    };
  }
  if (!mongoose.Types.ObjectId.isValid(id_pregunta)) {
    return {
      success: false,
      message: "Id Pregunta no es valido",
    };
  }

  const pregunta = await PreguntasRepository.findPreguntaById(id_pregunta);

  if (!pregunta) {
    return {
      success: false,
      message: "Pregunta no encontrada",
    };
  }

  const response = await PreguntasRepository.updatePregunta(
    id_pregunta,
    datos_actualizados
  );

  if (response && response.modifiedCount > 0) {
    return {
      success: true,
      message: "Pregunta actualizada correctamente",
      data: response,
    };
  } else {
    return {
      success: false,
      message: "No se realizaron cambios en la pregunta",
    };
  }
};

export const insertPregunta = async (pregunta_data) => {
  const response = await PreguntasRepository.insertPreguntas(pregunta_data);
  return {
    success: true,
    data: response,
    message: "Pregunta Registrada",
  };
};

export const findAllPreguntas = async () => {
  const response = await PreguntasRepository.findAllPreguntas();

  if (response.length < 1) {
    return {
      success: false,
      message: "No hay preguntas aún",
    };
  }

  return {
    success: true,
    data: response,
  };
};
