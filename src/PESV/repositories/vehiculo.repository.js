import VehiculosModel from "../models/Vehiculos.model.js";
import ClaseVehiculoModel from "../models/ClaseVehiuclos.model.js";
const findAllVehiculosByIdUser = async (id_user) => {
  return await VehiculosModel.find({ idUsuario: id_user });
};

const findAllVehiculos = async () => {
  return VehiculosModel.find()
    .populate({
      path: 'idUsuario',
      select: '-fechaNacimiento -password -email -createdAt -updatedAt -idRole'
    })
    .populate({
      path: 'idUsuarioAsignado',
      select: '-fechaNacimiento -password -email -createdAt -updatedAt -idRole'
    })
    .populate({
      path: 'idClaseVehiculo',
      select: '-description'
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
    vehiculoEnUso: true, // Solo vehículos activos
    $or: [{ idUsuario: id_user }, { usuarioAsignado: id_user }], // Creados por él o asignados
  }).select("idClaseVehiculo usuarioAsignado idUsuario tipoVehiculo _id");
};

const insertVehiculo = async (vehiculo_data) => {
  const newVehiculo = new VehiculosModel(vehiculo_data);
  return newVehiculo.save();
};

const findEnumValues = () => {
  return VehiculosModel.schema.path("servicio").enumValues.map(value => ({
    _id: value, 
    name: value,             
  }));
};


export default {
  findAllVehiculosByIdUser,
  findVehiculeById,
  findUserVehiuclesActives,
  findVehiculeByPlaca,
  insertVehiculo,
  findAllVehiculos,
  findEnumValues
};

// .populate({
//     path: "id_zona",  nombre de capo en la coleccion
//     select: "nombreZona codeZona", campos de la coleccion relacionada
//   })
