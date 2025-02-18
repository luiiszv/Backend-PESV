import PreguntasRepository from "../repositories/Preguntas.repository.js";
import userRespository from "../repositories/user.respository.js";
import VehicleRepository from "../repositories/vehiculo.repository.js";
import mongoose from "mongoose";
import CargoRepository from "../repositories/cargo.respository.js";
import RoleRepository from "../../Auth/repositories/role.repository.js";
import UserModel from "../../Auth/models/UserModel.js";
import documentRepository from "../repositories/document.Repository.js";

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
export const findPreguntasByClaseVehiculesActive = async (
  id_clase_vehiculo
) => {
  if (!mongoose.Types.ObjectId.isValid(id_clase_vehiculo)) {
    return {
      success: false,
      message: "El ID proporcionado no es válido",
    };
  }

  //llega un Array de vehiculos

  const preguntasForm =
    await PreguntasRepository.findPreguntasByIdClaseVehiculo(id_clase_vehiculo);

  return {
    success: true,
    data: preguntasForm,
  };
};

export const getAllSelctUser = async () => {
  const selectCargos = await CargoRepository.findAllCargos();
  const selectRoles = await RoleRepository.findAllRoles();
  const selectTipoLicencia = await userRespository.findTipoLicenciaEnum();

  const selectValues = {
    selectCargos,
    selectRoles,
    selectTipoLicencia,
  };
  return {
    success: true,
    data: selectValues,
  };
};

export const getDocuemntsByIdUser = async (id_user) => {
  if (!id_user) {
    return {
      success: false,
      message: "Id del Vehiculo es requerido",
    };
  }

  if (!mongoose.Types.ObjectId.isValid(id_user)) {
    return {
      suceess: false,
      message: "Id del Vehiculo no es valido",
    };
  }

  const docsUser = await documentRepository.getDocumentsByIdUser(id_user);

  if (!docsUser && docsUser.lenght < 0) {
    return {
      success: false,
      message: "No hay documentos aún",
    };
  }

  return {
    success: true,
    data: docsUser,
  };
};
