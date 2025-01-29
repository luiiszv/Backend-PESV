import UserRepository from "../repositories/user.respository.js";
import PreguntasRepository from "../repositories/Preguntas.repository.js";


/**
 * Get All Usuarios
 * @params 
 * @returns users
 */
export const findAllUsers = async () => {
  const response = await UserRepository.getAllUsers();
  if (!response) {
    return {
      success: false,
      message: "Users not found",
    };
  }

  return{
    sucess: true,
      data: response
  }
};

/**
 * Get All Usuarios
 * @params 
 * @returns users
 */
export const findUserById = async () => {
  const response = await UserRepository.findUserById();
  if (!response) {
    return {
      success: false,
      message: "Users not found",
    };
  }

  return{
    sucess: true,
      data: response
  }
};

/**
 * Update Usuarios
 * @params id_user
 * @returns 
 */
export const updateUser = async (user_data) => {
  const response = await UserRepository.UpdateUser(user_data);
  if (response.matchedCount === 0) {
    return {
      sucess: false,
      message: 'Documento no encontrado'
    };
  }
  return {
    sucess: true,
    message: `Documento Acualizado, ${response}`
  }
}


/**
 * create FormPreguntas
 * @params idUserAdmin, Preguntas
 * @returns 
 */
export const createFormPreguntas = async (id_user, preguntas) => {
  const newPregunta = { ...preguntas, idUsuarioCreador: id_user };
  const response = await PreguntasRepository.insertPreguntas(newPregunta);

  return {
    sucess: true,
    message: `Documento Acualizado, ${response}`
  }
}

/**
 * Change estado Preguntas
 * @params IdPregunta
 * @returns Pregunta
 */

export const changeEstadoPregunta = async (id_pregunta) => {
  const responsePregunta = await PreguntasRepository.findPreguntaById(id_pregunta);
  if (!responsePregunta) {
    return {
      sucess: false,
      data: 'Pregunta not found'
    }
  }

  const nuevoEstado = !responsePregunta.estado;
  const responseEstado = await PreguntasRepository.changeEstadoPregunta(id_pregunta, nuevoEstado);
  console.log(responseEstado);

  if (responseEstado.modifiedCount > 0) {
    return {
      success: true,
      message: "El estado de la pregunta ha sido actualizado",
      nuevoEstado,
    };

  }

}

