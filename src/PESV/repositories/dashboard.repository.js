import VehiculosModel from "../models/vehiculos.model.js";
import FormPreoperacionalModel from "../models/FormPreoperacional.model.js";
import UsuarioModel from "../../Auth/models/UserModel.js";


const findEstadisticasVehiculos = async () => {
  // Total de vehículos
  const totalVehiculos = await VehiculosModel.countDocuments();

  // Vehículos en uso
  const vehiculosEnUso = await VehiculosModel.countDocuments({
    vehiculoEnUso: true,
  });

  // Vehículos inactivos
  const vehiculosInactivos = await VehiculosModel.countDocuments({
    estadoVehiculo: false,
  });

  // Vehículos de empresa
  const vehiculosEmpresa = await VehiculosModel.countDocuments({
    VehicleEmpresa: true,
  });

  // Agrupar vehículos por servicio (Público/Particular)
  const vehiculosPorServicio = await VehiculosModel.aggregate([
    { $group: { _id: "$servicio", cantidad: { $sum: 1 } } },
  ]);

  // Agrupar vehículos por zona con nombre en lugar de ID
  const vehiculosPorZona = await VehiculosModel.aggregate([
    {
      $group: {
        _id: "$idZona",
        cantidad: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "zonas", // Nombre de la colección de zonas
        localField: "_id", // ID de la zona en VehiculosModel
        foreignField: "_id", // ID en la colección "zonas"
        as: "zona",
      },
    },
    {
      $unwind: "$zona", // Convierte el array de $lookup en un objeto normal
    },
    {
      $project: {
        _id: 0, // Oculta el ID original de la zona
        zona: "$zona.nombreZona", // Muestra el nombre de la zona
        cantidad: 1, // Mantiene el conteo de vehículos
      },
    },
  ]);

  return {
    totalVehiculos,
    vehiculosEnUso,
    vehiculosInactivos,
    vehiculosEmpresa,
    vehiculosPorServicio,
    vehiculosPorZona,
  };
};
const findEstadisticasFormularios = async () => {
  try {
    const hoy = new Date();
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay()); // Lunes de la semana actual
    inicioSemana.setHours(0, 0, 0, 0);

    const finSemana = new Date(inicioSemana);
    finSemana.setDate(inicioSemana.getDate() + 6); // Domingo de la misma semana
    finSemana.setHours(23, 59, 59, 999);

    const formulariosAgrupados = await FormPreoperacionalModel.aggregate([
      {
        $match: {
          fechaRespuesta: { $gte: inicioSemana, $lte: finSemana }, // 🔥 Solo de esta semana
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$fechaRespuesta" },
            month: { $month: "$fechaRespuesta" },
            day: { $dayOfMonth: "$fechaRespuesta" },
          },
          totalFormularios: { $sum: 1 },
          formulariosConErrores: {
            $sum: {
              $cond: [
                { $eq: ["$estadoFormulario", "completado_con_errores"] },
                1,
                0,
              ],
            },
          },
          formulariosCorrectos: {
            $sum: {
              $cond: [{ $eq: ["$estadoFormulario", "completado"] }, 1, 0],
            },
          },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }, // 🔥 Ordenar correctamente por fecha
      },
      {
        $project: {
          _id: 0,
          fecha: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day",
            },
          },
          totalFormularios: 1,
          formulariosCorrectos: 1,
          formulariosConErrores: 1,
        },
      },
    ]);

    return { success: true, formulariosAgrupados };
  } catch (error) {
    console.error("❌ Error en findEstadisticasFormularios:", error);
    return { success: false, message: "Error al obtener estadísticas" };
  }
};

export default { findEstadisticasVehiculos, findEstadisticasFormularios };
