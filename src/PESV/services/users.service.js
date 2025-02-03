import PreguntasRepository from "../repositories/Preguntas.repository.js";
import userRespository from "../repositories/user.respository.js";
import VehicleRepository from "../repositories/vehiculo.repository.js";
import mongoose from "mongoose";

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



//Encontrar las preguntas realcionadas vehicuilo del usuario
export const findPreguntasByClaseVehiculesActive = async (id_clase_vehiculo) => {

  if (!mongoose.Types.ObjectId.isValid(id_clase_vehiculo)) {
    return {
      success: false,
      message: 'El ID proporcionado no es válido',
    };
  }


  //llega un Array de vehiculos

  const preguntasForm = await PreguntasRepository.findPreguntasByIdClaseVehiculo(id_clase_vehiculo);

  console.log(preguntasForm);
 return {
    success: true,
    data: preguntasForm,
  };
};


