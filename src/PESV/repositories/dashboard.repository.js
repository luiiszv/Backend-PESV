import VehiculosModel from "../models/vehiculos.model.js";
import FormPreoperacionalModel from "../models/FormPreoperacional.model.js";
import UsuarioModel from "../../Auth/models/UserModel.js";
import VehiculoModel from "../models/vehiculos.model.js";
import moment from "moment-timezone";
export const TIMEZONE = "America/Bogota";

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
        from: "zonas",
        localField: "_id",
        foreignField: "_id",
        as: "zona",
      },
    },
    {
      $unwind: "$zona",
    },
    {
      $project: {
        _id: 0,
        zona: "$zona.nombreZona",
        cantidad: 1,
      },
    },
  ]);

  // Agrupar vehículos por actividad con nombre en lugar de ID
  const vehiculosPorActividad = await VehiculosModel.aggregate([
    {
      $match: {
        estadoVehiculo: true, // Solo vehículos activos
      },
    },
    {
      $group: {
        _id: "$idActividadVehiculo",
        cantidad: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "actividad_vehiculos",
        localField: "_id",
        foreignField: "_id",
        as: "actividad",
      },
    },
    {
      $unwind: "$actividad",
    },
    {
      $project: {
        _id: 0,
        actividad: "$actividad.nombreTipo",
        cantidad: 1,
      },
    },
    {
      $sort: { cantidad: -1 }, // Ordenar por cantidad descendente
    },
  ]);

  return {
    totalVehiculos,
    vehiculosEnUso,
    vehiculosInactivos,
    vehiculosEmpresa,
    vehiculosPorServicio,
    vehiculosPorZona,
    vehiculosPorActividad, // Nuevo campo agregado
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
          formulariosCorrectos: {
            $sum: {
              $cond: [{ $eq: ["$estadoFormulario", "operativo"] }, 1, 0],
            },
          },
          formulariosConErrores: {
            $sum: {
              $cond: [
                { $eq: ["$estadoFormulario", "en_revision"] },
                1,
                0,
              ],
            },
          },
          formulariosNoContestados: {
            $sum: {
              $cond: [{ $eq: ["$estadoFormulario", "no_reporta"] }, 1, 0],
            },
          },
          formulariosCorregidos: {
            $sum: {
              $cond: [{ $eq: ["$estadoFormulario", "revisado_corregido"] }, 1, 0],
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
          formulariosNoContestados: 1,
          formulariosCorregidos: 1
        },
      },
    ]);

    return {
      success: true,
      formulariosAgrupados,
    };
  } catch (error) {
    console.error("❌ Error en findEstadisticasFormularios:", error);
    return { success: false, message: "Error al obtener estadísticas" };
  }
};
const obtenerEstadisticasPorActividad = async (fechaString = null) => {
  const fecha = fechaString || moment().tz(TIMEZONE).format("YYYY-MM-DD");
  const fechaInicio = moment.tz(fecha, TIMEZONE).startOf("day").toDate();
  const fechaFin = moment.tz(fecha, TIMEZONE).endOf("day").toDate();

  try {
    // 1. Obtenemos todos los vehículos activos agrupados por actividad
    const actividadesConVehiculos = await VehiculoModel.aggregate([
      {
        $match: {
          estadoVehiculo: true,
          vehiculoEnUso: true,
        },
      },
      {
        $lookup: {
          from: "actividad_vehiculos",
          localField: "idActividadVehiculo",
          foreignField: "_id",
          as: "actividad",
        },
      },
      { $unwind: "$actividad" },
      {
        $group: {
          _id: "$actividad.nombreTipo",
          totalVehiculos: { $sum: 1 },
          vehiculos: { $push: "$_id" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 2. Obtenemos los formularios registrados hoy con su actividad (sin importar estadoFormulario)
    const formulariosRegistrados = await FormPreoperacionalModel.aggregate([
      {
        $match: {
          fechaRespuesta: { $gte: fechaInicio, $lte: fechaFin },
        },
      },
      {
        $lookup: {
          from: "vehiculos",
          localField: "idVehiculo",
          foreignField: "_id",
          as: "vehiculo",
        },
      },
      { $unwind: "$vehiculo" },
      {
        $lookup: {
          from: "actividad_vehiculos",
          localField: "vehiculo.idActividadVehiculo",
          foreignField: "_id",
          as: "actividad",
        },
      },
      { $unwind: "$actividad" },
      {
        $group: {
          _id: "$actividad.nombreTipo",
          completados: { $sum: 1 }, // realmente es "registrados"
        },
      },
    ]);

    // 3. Combinamos los datos por actividad
    const estadisticas = actividadesConVehiculos.map((actividad) => {
      const completadosData = formulariosRegistrados.find(
        (a) => a._id === actividad._id
      );
      const completados = completadosData ? completadosData.completados : 0;

      return {
        actividad: actividad._id,
        totalVehiculos: actividad.totalVehiculos,
        completados,
        faltantes: actividad.totalVehiculos - completados,
        porcentajeCompletados: Math.round(
          (completados / actividad.totalVehiculos) * 100
        ),
      };
    });

    // 4. Filtramos formularios solo de actividades activas
    const actividadIds = actividadesConVehiculos.map((a) => a._id);
    const formulariosFiltrados = formulariosRegistrados.filter((f) =>
      actividadIds.includes(f._id)
    );

    // 5. Cálculo de totales generales
    const totalGeneral = {
      totalVehiculos: actividadesConVehiculos.reduce(
        (sum, a) => sum + a.totalVehiculos,
        0
      ),
      totalCompletados: formulariosFiltrados.reduce(
        (sum, f) => sum + f.completados,
        0
      ),
    };
    totalGeneral.totalFaltantes =
      totalGeneral.totalVehiculos - totalGeneral.totalCompletados;
    totalGeneral.porcentajeCompletados = totalGeneral.totalVehiculos > 0
      ? Math.round(
        (totalGeneral.totalCompletados / totalGeneral.totalVehiculos) * 100
      )
      : 0;

    return {
      success: true,
      fechaConsulta: fecha,
      resumenGeneral: {
        totalVehiculos: totalGeneral.totalVehiculos,
        totalCompletados: totalGeneral.totalCompletados,
        totalFaltantes: totalGeneral.totalFaltantes,
        porcentajeCompletados: `${totalGeneral.porcentajeCompletados}%`,
      },
      detallePorActividad: estadisticas,
    };
  } catch (error) {
    console.error("Error en obtenerEstadisticasPorActividad:", error);
    return {
      success: false,
      message: "Error al obtener estadísticas",
      error: error.message,
    };
  }
};



export default {
  findEstadisticasVehiculos,
  findEstadisticasFormularios,
  obtenerEstadisticasPorActividad,
};
