import DashboardRepository from "../repositories/dashboard.repository.js";

export const findEstadisticasVehiculos = async () => {
  try {
    const estadisticas = await DashboardRepository.findEstadisticasVehiculos();
    return { success: true, data: estadisticas };
  } catch (error) {
    console.error(" Error en findEstadisticasVehiculos:", error);
    return {
      success: false,
      message: "Error al obtener estadísticas de vehículos",
    };
  }
};

export const findEstaidsticasFormularios = async (fecha) => {
  try {
    const estadisticasUser =
      await DashboardRepository.findEstadisticasFormularios(fecha);
    return { success: true, data: estadisticasUser };
  } catch (error) {
    console.error(" Error en findEstaidsticasFormularios:", error);
    return {
      success: false,
      message: "Error al obtener estadísticas de Forms",
    };
  }
};
