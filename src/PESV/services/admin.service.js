import UserRepository from "../repositories/user.respository.js";
import PreguntasRepository from "../repositories/Preguntas.repository.js";
import ClaseVehiculoRepository from "../repositories/claseVehiculos.repository.js";
import TipoVehiculoRepository from "../repositories/tipoVehiculo.repository.js";
import ZonaRepository from "../repositories/zona.repository.js";

import VehiculosRepository from "../repositories/vehiculo.repository.js";

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

  return {
    sucess: true,
    data: response,
  };
};

/**
 * Get All Usuarios
 * @params
 * @returns users
 */
export const findUserById = async (id_user) => {
  // const userId = id_user.toString();
  const response = await UserRepository.getUserById(id_user);
  if (!response) {
    return {
      success: false,
      message: "Usuario no encontrado",
    };
  }

  return {
    success: true,
    data: response,
  };
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
      message: "Documento no encontrado",
    };
  }
  return {
    sucess: true,
    message: `Documento Acualizado, ${response}`,
  };
};

/**
 * create FormPreguntas
 * @params idUserAdmin, Preguntas
 * @returns
 */
export const createFormPreguntas = async (id_user, preguntas) => {
  const { calseVehiculo } = preguntas;
  if (!claseVehiculoExist) {
    return {
      success: false,
      message: "ClaseVehiculo no fue encontrado",
    };
  }
  const claseVehiculoExist =
    await ClaseVehiculoRepository.findClaseVehiculoById(calseVehiculo);
  const newPregunta = { ...preguntas, idUsuarioCreador: id_user };
  const response = await PreguntasRepository.insertPreguntas(newPregunta);
  return {
    success: true,
    message: `Documento Acualizado, ${response}`,
  };
};

/**
 * create  Preguntas
 * @params
 * @returns All Preguntas con usuario y clase de vehiculo
 */

export const findAllPreguntas = async () => {
  const preguntas = await PreguntasRepository.findAllPreguntas();
  if (!preguntas) {
    return {
      sucess: false,
      messsage: "No Hay Preguntas Registradas aun",
    };
  }

  return {
    sucess: true,
    data: preguntas,
  };
};

/**
 * create  Preguntas
 * @params
 * @returns All Preguntas con usuario y clase de vehiculo
 */

export const findPreguntaById = async (id_pregunta) => {
  const pregunta = await PreguntasRepository.findPreguntaById(id_pregunta);
  if (!pregunta) {
    return {
      sucess: false,
      messsage: "Pregunta no encontrada",
    };
  }

  return {
    sucess: true,
    data: pregunta,
  };
};

/**
 * Change estado Preguntas
 * @params IdPregunta
 * @returns Pregunta
 */

export const changeEstadoPregunta = async (id_pregunta) => {
  const responsePregunta = await PreguntasRepository.findPreguntaById(
    id_pregunta
  );
  if (!responsePregunta) {
    return {
      sucess: false,
      data: "Pregunta not found",
    };
  }

  const nuevoEstado = !responsePregunta.estado;
  const responseEstado = await PreguntasRepository.changeEstadoPregunta(
    id_pregunta,
    nuevoEstado
  );
  console.log(responseEstado);

  if (responseEstado.modifiedCount > 0) {
    return {
      success: true,
      message: "El estado de la pregunta ha sido actualizado",
      nuevoEstado,
    };
  }
};

/**
 * get vehiculos by user
 * @params IdUser
 * @returns Vehiculos
 */

export const findVehiculosByUserId = async (id_user) => {
  const userId = id_user.toString();
  const userExist = await UserRepository.getUserById(userId);
  if (!userExist) {
    return {
      success: false,
      message: "Usuario no existe",
    };
  }

  const vehiculos = await VehiculosRepository.findAllVehiculosByIdUser(id_user);
  if (!vehiculos) {
    return {
      success: false,
      message: "El usuario no tiene vehiculo registrados",
    };
  }

  return {
    success: true,
    data: vehiculos,
  };
};

/**
 * register vehiculos desde el admin como vehiculos de empresa
 * @params IdAdmin vehiculoData
 * @returns
 * */

export const insertAdminVehiculos = async (id_admin, vehiculo_empresa_data) => {
  const { idUsuarioAsignado, placa, idClaseVehiculo, idTipoVehiculo, idZona } = vehiculo_empresa_data;

  const userExist = await UserRepository.getUserById(idUsuarioAsignado);

  if (!userExist) {
    return {
      success: false,
      message: "UsuarioAsignado no existe",
    };
  }

  const placaUperCase = placa.toUpperCase();

  const palcaVehiculoExist = await VehiculosRepository.findVehiculeByPlaca(
    placaUperCase
  );
  if (palcaVehiculoExist) {
    return {
      success: false,
      message: "La palca del vehiculo ya existe",
    };
  }

  const idClaseExist = await ClaseVehiculoRepository.findClaseVehiculoById(
    idClaseVehiculo
  );
  if (!idClaseExist) {
    return {
      success: false,
      message: "ClaseVehiculo not Encontrada",
    };
  }

  const idTipoExist = await TipoVehiculoRepository.findTipoVehiculoById(
    idTipoVehiculo
  );
  if (!idTipoExist) {
    return {
      success: false,
      message: "idTipoVehiculo not Encontrado",
    };
  }

  const idZonaExist = await ZonaRepository.findZonaById(idZona);
  if (!idZonaExist) {
    return {
      success: false,
      message: "idZona not Encontrada",
    };
  }

  const newAdminVehicule = await {
    ...vehiculo_empresa_data,
    idUsuario: id_admin,
    VehicleEmpresa: true,
    placa: placaUperCase,
  };

  await VehiculosRepository.insertVehiculo(newAdminVehicule);

  return {
    success: true,
    message: "Vehiculo registrado",
  };
};
