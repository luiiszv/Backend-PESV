import VehiculosModel from "../models/vehiculos.model.js";
import ClaseVehiculoModel from "../models/ClaseVehiuclos.model.js";

const findAllVehiculosByIdUser = async (id_user) => {
  return await VehiculosModel.find({
    $or: [{ idUsuarioAsignado: id_user }, { idUsuario: id_user }],
  })
    .populate("idUsuario")
    .populate("idUsuarioAsignado")
    .populate("idTipoVehiculo")
    .populate("idZona");
};
const findAllVehiculos = async () => {
  return VehiculosModel.find()
    .populate({
      path: "idUsuario",
      select: "-fechaNacimiento -password -email -createdAt -updatedAt -idRole",
    })
    .populate({
      path: "idUsuarioAsignado",
      select: "-fechaNacimiento -password -email -createdAt -updatedAt -idRole",
    })
    .populate({
      path: "idClaseVehiculo",
      select: "-description",
    })
    .populate({
      path: "idTipoVehiculo",
      select: "",
    })
    .populate({
      path: "idZona",
      select: "",
    });
};

const findVehiculeById = async (id_vehicule) => {
  return await VehiculosModel.findById(id_vehicule)
    .populate({
      path: "idClaseVehiculo",
      select: "",
    })
    .populate({
      path: "idTipoVehiculo",
      select: "",
    })
    .populate({
      path: "idZona",
      select: "-codeZona",
    });
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
  return VehiculosModel.schema.path("servicio").enumValues.map((value) => ({
    _id: value,
    name: value,
  }));
};

const updateVehicule = async (id_vehiculo, vehicule_data) => {
  return await VehiculosModel.updateOne({ _id: id_vehiculo }, vehicule_data);
};

//Cambia el estado del vehiuclo en uso
const toggleVehiculoEnUso = async (idVehiculo, estadoUso) => {
  try {
    // Buscar el vehículo

    const vehiculo = await findVehiculeById(idVehiculo);

    if (!vehiculo) {
      return {
        success: false,
        message: "Vehiculo no encontrado",
      };
    }

    // Cambiar el estado al contrario
    const nuevoEstado = !estadoUso;

    // Actualizar en la base de datos
    await VehiculosModel.updateOne(
      { _id: idVehiculo },
      { vehiculoEnUso: nuevoEstado }
    );

    return { success: true, nuevoEstado };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default {
  findAllVehiculosByIdUser,
  findVehiculeById,
  findUserVehiuclesActives,
  findVehiculeByPlaca,
  insertVehiculo,
  findAllVehiculos,
  findEnumValues,
  updateVehicule,
  toggleVehiculoEnUso,
};

// .populate({
//     path: "id_zona",  nombre de capo en la coleccion
//     select: "nombreZona codeZona", campos de la coleccion relacionada
//   })
