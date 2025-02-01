import VehiculosModel from "../models/Vehiculos.model.js";

const findAllVehiculosByIdUser = async (id_user) => {
  return await VehiculosModel.find({ idUsuario: id_user }).populate({
    path: "idUsuario",
  });
};

const findVehiculeById = async (id_vehicule) => {
  return await VehiculosModel.findById(id_vehicule).populate(
    "documentos_vehiculos"
  );
};

const findVehiculeByPlaca = async (placa_vehicule) => {
  return await VehiculosModel.findOne({ placa: placa_vehicule });
};

const findUserVehiuclesActives = async (id_user) => {
  return await VehiculosModel.find({
    estadoVehiculo: true, // Solo vehículos activos
    $or: [{ idUsuario: id_user }, { usuarioAsignado: id_user }], // Creados por él o asignados
  }).select("usuarioAsignado idUsuario tipoVehiculo _id");
};

const insertVehiculo = async (vehiculo_data) => {
  const newVehiculo = new VehiculosModel(vehiculo_data);
  return newVehiculo.save();
};

export default {
  findAllVehiculosByIdUser,
  findVehiculeById,
  findUserVehiuclesActives,
  findVehiculeByPlaca,
  insertVehiculo
};

// .populate({
//     path: "id_zona",  nombre de capo en la coleccion
//     select: "nombreZona codeZona", campos de la coleccion relacionada
//   })
