import FormPreoperacionalModel from "../models/FormPreoperacional.model.js";
import UserModel from "../../Auth/models/UserModel.js";
import VehiculoModel from "../models/vehiculos.model.js";
import FormularioModel from "../models/Formularios.model.js";
import moment from "moment-timezone";
const TIMEZONE = "America/Bogota";
const HORA_LIMITE = 16; // 4 PM por defecto, pero puede ser configurable

const findFormulariosDiarios = async (fechaString) => {
  // Convertir la fecha a la zona horaria de Colombia
  const fechaInicio = moment
    .tz(`${fechaString}T00:00:00`, "America/Bogota")
    .toDate();
  const fechaFin = moment
    .tz(`${fechaString}T23:59:59.999`, "America/Bogota")
    .toDate();

  return await FormPreoperacionalModel.find({
    fechaRespuesta: { $gte: fechaInicio, $lte: fechaFin },
  })
    .populate("idUsuario", "name lastName email numeroDocumento")
    .populate("formularioId", "nombreFormulario")
    .select("estadoFormulario fechaRespuesta");
};

const findFormulariosDiariosConErrores = async (fecha) => {
  const fechaInicio = new Date(fecha);
  fechaInicio.setHours(0, 0, 0, 0);
  const fechaFin = new Date(fecha);
  fechaFin.setHours(23, 59, 59, 999);

  return await FormPreoperacionalModel.find({
    estadoFormulario: "en_revision",
    fechaRespuesta: { $gte: fechaInicio, $lte: fechaFin },
  })
    .populate("idUsuario", "name lastName email numeroDocumento")
    .populate("formularioId", "nombreFormulario")
    .select("estadoFormulario fechaRespuesta");
};

const getFormPreOperacionalById = async (id_form) => {
  const formulario = await FormPreoperacionalModel.findById(id_form)
    .populate({
      path: "idUsuario",
      select: "name lastName email numeroDocumento",
    })
    .populate({
      path: "formularioId",
      select: "nombreFormulario",
    })
    .populate({
      path: "respuestas.idPregunta",
      select: "preguntaTexto determinancia",
    });

  return formulario;
};

const countFormulariosDiariosConErrores = async (fecha = new Date()) => {
  try {
    const fechaInicio = new Date(fecha);
    fechaInicio.setHours(0, 0, 0, 0);
    const fechaFin = new Date(fecha);
    fechaFin.setHours(23, 59, 59, 999);

    // Contamos directamente los formularios con errores en el rango de fechas
    const totalErrores = await FormPreoperacionalModel.countDocuments({
      estadoFormulario: "en_revision",
      fechaRespuesta: { $gte: fechaInicio, $lte: fechaFin },
    });

    // Retornamos el mensaje en función del conteo
    return totalErrores > 0
      ? `📢 Hay ${totalErrores} formularios con errores el ${fechaInicio.toLocaleDateString()}.`
      : `✅ No hay formularios con errores el ${fechaInicio.toLocaleDateString()}.`;
  } catch (error) {
    console.error("Error al contar formularios con errores:", error);
    return "⚠️ Error al obtener los formularios con errores.";
  }
};

const insertFormPreOperacional = async (form_data) => {
  const newForm = new FormPreoperacionalModel(form_data);
  return await newForm.save();
};

const getAllFormsPre = async () => {
  return await FormPreoperacionalModel.find()
    .populate({
      path: "idUsuario",
      select: "",
    })
    .populate({
      path: "idVehiculo",
      select: "",
    })
    .populate({
      path: "formularioId",
      select: "",
    })
    .populate({
      path: "respuestas.idPregunta",
    });
};

//===============================

const findVehiculosFaltantesPreoperacional = async (fechaString) => {
  const fechaConsulta = moment.tz(fechaString, TIMEZONE);
  const fechaInicio = fechaConsulta.clone().startOf("day").toDate();
  const fechaFin = fechaConsulta.clone().endOf("day").toDate();

  // 1. Obtener vehículos activos y en uso CON populate de usuarios
  const vehiculosActivos = await VehiculoModel.find({
    estadoVehiculo: true,
    vehiculoEnUso: true,
  })
    .populate("idClaseVehiculo")
    .populate("idUsuario", "_id") // Solo el ID
    .populate("idUsuarioAsignado", "_id"); // Solo el ID

  // 2. Obtener formularios activos por clase de vehículo
  const clasesVehiculoIds = [
    ...new Set(vehiculosActivos.map((v) => v.idClaseVehiculo._id)),
  ];

  const formulariosActivos = await FormularioModel.find({
    idClaseVehiculo: { $in: clasesVehiculoIds },
    estadoFormulario: true,
  });

  // 3. Mapear formularios por clase de vehículo (última versión)
  const formulariosPorClase = {};
  formulariosActivos.forEach((form) => {
    if (
      !formulariosPorClase[form.idClaseVehiculo] ||
      form.version > formulariosPorClase[form.idClaseVehiculo].version
    ) {
      formulariosPorClase[form.idClaseVehiculo] = form;
    }
  });

  // 4. Obtener preoperacionales realizados hoy
  const preoperacionalesHoy = await FormPreoperacionalModel.find({
    fechaRespuesta: { $gte: fechaInicio, $lte: fechaFin },
    idVehiculo: { $in: vehiculosActivos.map((v) => v._id) },
  });

  // 5. Filtrar vehículos sin preoperacional
  const vehiculosSinPreoperacional = vehiculosActivos.filter(
    (vehiculo) =>
      !preoperacionalesHoy.some((preop) =>
        preop.idVehiculo.equals(vehiculo._id)
      )
  );

  // 6. Enriquecer respuesta con información necesaria
  return vehiculosSinPreoperacional.map((vehiculo) => ({
    vehiculo: {
      _id: vehiculo._id,
      placa: vehiculo.placa,
      marca: vehiculo.marca,
      modelo: vehiculo.modeloVehiculo,
      claseVehiculo: vehiculo.idClaseVehiculo,
      idUsuario: vehiculo.idUsuario?._id, // Asegurar el ID
      idUsuarioAsignado: vehiculo.idUsuarioAsignado?._id, // Asegurar el ID
    },
    formularioAsignado: formulariosPorClase[vehiculo.idClaseVehiculo._id]
      ? {
        _id: formulariosPorClase[vehiculo.idClaseVehiculo._id]._id,
        nombre:
          formulariosPorClase[vehiculo.idClaseVehiculo._id].nombreFormulario,
        version: formulariosPorClase[vehiculo.idClaseVehiculo._id].version,
      }
      : null,
    debeRealizar: !!formulariosPorClase[vehiculo.idClaseVehiculo._id],
  }));
};

const getEstadisticasDiarias = async (fechaString) => {
  const fechaInicio = moment.tz(`${fechaString}T00:00:00`, TIMEZONE).toDate();
  const fechaFin = moment.tz(`${fechaString}T23:59:59.999`, TIMEZONE).toDate();

  return await FormPreoperacionalModel.aggregate([
    {
      $match: {
        fechaRespuesta: { $gte: fechaInicio, $lte: fechaFin },
      },
    },
    {
      $group: {
        _id: "$estadoFormulario",
        count: { $sum: 1 },
        vehiculos: { $addToSet: "$idVehiculo" },
      },
    },
    {
      $project: {
        estado: "$_id",
        count: 1,
        vehiculosCount: { $size: "$vehiculos" },
        _id: 0,
      },
    },
  ]);
};
const findByFechaRange = async (fechaInicio, fechaFin) => {
  return await FormPreoperacionalModel.find({
    fechaRespuesta: { $gte: fechaInicio, $lte: fechaFin },
  });
};

///--------------
const createNoAplicaAutomatico = async (data) => {
  return await FormPreoperacionalModel.create({
    ...data,
    esAutomatico: true,
    fechaRespuesta: moment().tz(TIMEZONE).endOf("day").toDate(),
  });
};

const existeNoContestdadoParaVehiculo = async (
  vehiculoId,
  fechaInicio,
  fechaFin
) => {
  const count = await FormPreoperacionalModel.countDocuments({
    idVehiculo: vehiculoId,
    estadoFormulario: "no_reporta",
    fechaRespuesta: { $gte: fechaInicio, $lte: fechaFin },
  });
  return count > 0;
};



const updateForm = async (id, updateData) => {
  return await FormPreoperacionalModel.findByIdAndUpdate(id, updateData, { new: true });
};


const deleteFormPreoperacional = async (id) => {
  return await FormPreoperacionalModel.findByIdAndDelete(id);
};

export default {
  getAllFormsPre,
  insertFormPreOperacional,
  findFormulariosDiarios,
  findFormulariosDiariosConErrores,
  getFormPreOperacionalById,
  countFormulariosDiariosConErrores,
  getEstadisticasDiarias,
  findVehiculosFaltantesPreoperacional,
  findByFechaRange,
  createNoAplicaAutomatico,
  existeNoContestdadoParaVehiculo,
  updateForm,
  deleteFormPreoperacional
};
