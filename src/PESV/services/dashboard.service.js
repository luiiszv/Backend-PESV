import DashboardRepository from "../repositories/dashboard.repository.js";
import UsuariosRepository from "../repositories/user.respository.js";
import FormPreoperacional from "../repositories/formPreoperacional.repository.js";
import VeehicuosRepository from "../repositories/vehiculo.repository.js";

export const findEstadisticasVehiculos = async () => {
  try {
    const estadisticas = await DashboardRepository.findEstadisticasVehiculos(); //Hay que borrar
    return { success: true, data: estadisticas };
  } catch (error) {
    console.error(" Error en findEstadisticasVehiculos:", error);
    return {
      success: false,
      message: "Error al obtener estadísticas de vehículos",
    };
  }
};

export const findEstaidsticasFormularios = async (fecha) => { //Hay que borrar
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


export const findAllDataDash = async (fecha) => {
 
  const responseUsers = await UsuariosRepository.getAllUsers();
  const resposeFormsPre = await FormPreoperacional.getAllFormsPre();
  const responseVehiculos = await VeehicuosRepository.findAllVehiculos();
  const responseEstadisticasFormularios = await DashboardRepository.findEstadisticasFormularios(fecha);
  const responseeEstadisticasVehiculos = await DashboardRepository.findEstadisticasVehiculos();
  const obtenerEstadisticasPorActividad= await DashboardRepository.obtenerEstadisticasPorActividad();


  return {
    success: true,
    responseUsers,
    resposeFormsPre,
    responseVehiculos,
    responseEstadisticasFormularios,
    responseeEstadisticasVehiculos,
    obtenerEstadisticasPorActividad

  }
}
