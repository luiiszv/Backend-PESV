import userRespository from "../repositories/user.respository.js";
import VehicleRepository from "../repositories/vehiculo.repository.js";

export const userProfile = async (id_user) => {
  const profileUser = await userRespository.getUserById(id_user);
  if (!profileUser) {
    return {
      success: false,
      message: "Perfil no encontrado",
    };
  }
  return {
    success: true,
    data: profileUser,
  };
};



//Encontrar las preguntas realcionadas al usuario
export const findPreguntasByUserVehiculesActive = async (user) => {
  if (!user) {
    return {
      success: false,
      message: "User not found ",
    };
  }

  const { userId } = user;
  const userVehiculos = await VehicleRepository.findUserVehiuclesActives(
    userId
  );

  if (userVehiculos.length < 1) {
    return {
      success: false,
      message: "No hay vehiculos aun",
    };
  }

  //llega un Array de vehiculos

  

  return {
    success: true,
    data: userVehiculos,
  };
};


