import VehiculosModel from "../models/Vehiculos.model.js";

const findAllVehiculosByIdUser = async (id_user) => {
  return await VehiculosModel.find({ idUsuario: id_user }).populate({
    path: "idUsuario",
  })
};

const findVehiculeById = async (id_vehicule) => {
  return await VehiculosModel.findById(id_vehicule).populate("documentos_vehiculos");
};

export default {
  findAllVehiculosByIdUser,
  findVehiculeById,
};

// .populate({
//     path: "id_zona",  nombre de capo en la coleccion
//     select: "nombreZona codeZona", campos de la coleccion relacionada
//   })
