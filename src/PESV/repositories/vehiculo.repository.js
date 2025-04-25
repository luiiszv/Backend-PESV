import VehiculosModel from "../models/vehiculos.model.js";
import ClaseVehiculoModel from "../models/ClaseVehiuclos.model.js";
import FormPreoperacionalModel from "../models/FormPreoperacional.model.js";
import moment from "moment-timezone";

const findAllVehiculosByIdUser = async (id_user) => {
  return await VehiculosModel.find({
    $or: [{ idUsuarioAsignado: id_user }, { idUsuario: id_user }],
  })
    .populate("idUsuario")
    .populate("idUsuarioAsignado")
    .populate("idActividadVehiculo")
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
      path: "idActividadVehiculo",
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
      path: "idActividadVehiculo",
      select: "",
    })
    .populate({
      path: "idZona",
      select: "-codeZona",
    })
    .populate({
      path: "idUsuarioAsignado",
      select: "name lastName numeroDocumento email",
    })
    
    ;
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

const findEnumValuesClaseUnidad = () => {
  return VehiculosModel.schema.path("claseUnidad").enumValues.map((value) => ({
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

const obtenerVehiculosSinPreoperacional = async (idUsuario) => {
  console.log("ID Usuario:", idUsuario);
  try {
    const hoy = moment().tz("America/Bogota").startOf("day").toDate(); // Inicio del día
    const mañana = moment().tz("America/Bogota").endOf("day").toDate(); // Fin del día

    // Buscar vehículos en uso, activos y que pertenezcan al usuario o estén asignados a él
    const vehiculosEnUso = await VehiculosModel.find({
      vehiculoEnUso: true,
      estadoVehiculo: true,
      $or: [
        { idUsuario: idUsuario }, // Vehículos registrados por el usuario
        { idUsuarioAsignado: idUsuario }, // Vehículos asignados al usuario
      ],
    }).select("-createdAt -updatedAt -__v");

    if (vehiculosEnUso.length === 0) {
      console.log("No hay vehículos en uso para este usuario.");
      return [];
    }

    const idsVehiculos = vehiculosEnUso.map((v) => v._id);

    // Buscar formularios preoperacionales completados hoy
    const vehiculosConPreoperacional = await FormPreoperacionalModel.find({
      idVehiculo: { $in: idsVehiculos },
      fechaRespuesta: { $gte: hoy, $lte: mañana },
    }).select("idVehiculo");

    const idsConFormulario = vehiculosConPreoperacional.map((f) =>
      f.idVehiculo.toString()
    );

    // Filtrar vehículos que no tengan un formulario hoy
    const vehiculosSinFormulario = vehiculosEnUso.filter(
      (v) => !idsConFormulario.includes(v._id.toString())
    );

    console.log(`Vehículos sin preoperacional para el usuario ${idUsuario}:`, vehiculosSinFormulario);

    return vehiculosSinFormulario;
  } catch (error) {
    console.error("Error al obtener vehículos sin preoperacional:", error);
    return [];
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
  obtenerVehiculosSinPreoperacional,
  findEnumValuesClaseUnidad
};

