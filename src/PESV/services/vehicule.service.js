import VehiculeRepository from "../repositories/vehiculo.repository.js";
import ClaseVehiculoRepository from "../repositories/claseVehiculos.repository.js";
import TipoVehiculoRepository from "../repositories/tipoVehiculo.repository.js";
import zonaRepository from "../repositories/zona.repository.js";
import ZonaModel from "../models/Zona.model.js";
import mongoose from "mongoose";

export const findAllVehiculos = async () => {
  const vehiculos = await VehiculeRepository.findAllVehiculos();

  if (!vehiculos) {
    return {
      success: false,
      message: "No hay Vehiculos aun",
    };
  }

  return {
    success: true,
    data: vehiculos,
  };
};

export const insertVehiculo = async (id_user, vehiuclo) => {
  if (!id_user) {
    return {
      success: false,
      message: "User not found ",
    };
  }

  const { placa, idZona, idActividadVehiculo, idClaseVehiculo } = vehiuclo;
  const placaUperCase = placa.toUpperCase();
  const vehiculeExist = await VehiculeRepository.findVehiculeByPlaca(
    placaUperCase
  );
  if (vehiculeExist) {
    return {
      success: false,
      message: "La placa del vehicule ya existe",
    };
  }

  const zonaExist = await zonaRepository.findZonaById(idZona);
  if (!zonaExist) {
    return {
      success: false,
      message: "La id zona not existe",
    };
  }

  const tipoVehiculoExist = await TipoVehiculoRepository.findTipoVehiculoById(
    idActividadVehiculo
  );
  if (!tipoVehiculoExist) {
    return {
      success: false,
      message: "La id tipoVehiculo not existe",
    };
  }
  const claseVehiculoExist =
    await ClaseVehiculoRepository.findClaseVehiculoById(idClaseVehiculo);
  if (!claseVehiculoExist) {
    return {
      success: false,
      message: "La id claseVehiculo not existe",
    };
  }

  const vehiculoWithAuthUser = {
    ...vehiuclo,
    claseUnidad: "Vehiculo",
    placa: placaUperCase,
    idUsuario: id_user,
    idUsuarioAsignado: id_user
  };

  await VehiculeRepository.insertVehiculo(vehiculoWithAuthUser);

  return {
    success: true,
    message: "Vehiculo Registrado",
  };
};

export const findAllVehiculosByIdUser = async (id_user) => {
  const vehiculos = await VehiculeRepository.findAllVehiculosByIdUser(id_user);
  if (vehiculos.length <= 0) {
    return {
      success: false,
      message: "No hay Vehiulos asociados aun",
    };
  }
  return {
    success: true,
    data: vehiculos,
  };
};

export const findSelectInformationVehiculos = async () => {
  const selectTipoVehiuclo =
    await TipoVehiculoRepository.findAllTipoVehiculos();
  if (!selectTipoVehiuclo) {
    return {
      success: false,
      messasge: "No se encontro Tipo de vehiculos",
    };
  }

  const selectClaseVehiculos =
    await ClaseVehiculoRepository.findAllClaseVehiculos();
  if (!selectTipoVehiuclo) {
    return {
      success: false,
      messasge: "No se encontro Clases de vehiculos",
    };
  }
  const selectZonas = await zonaRepository.findAllZonas();
  if (!selectZonas) {
    return {
      success: false,
      messasge: "No se encontro Zonas",
    };
  }
  const servicioEnum = await VehiculeRepository.findEnumValues();

  const servicioEnumClaseUnidad = await VehiculeRepository.findEnumValuesClaseUnidad();

  return {
    success: true,
    zonas: selectZonas,
    clases: selectClaseVehiculos,
    tipos: selectTipoVehiuclo,
    servicio: servicioEnum,
    unidad: servicioEnumClaseUnidad
  };
};

export const findVehiculeById = async (id_vehiculo) => {
  if (!id_vehiculo) {
    return {
      success: false,
      message: "Id del vehicuo es requerido",
    };
  }
  if (!mongoose.Types.ObjectId.isValid(id_vehiculo)) {
    return {
      success: false,
      message: "Id del Vehiculo no es válido",
    };
  }

  const response = await VehiculeRepository.findVehiculeById(id_vehiculo);
  if (!response) {
    return {
      success: false,
      message: "Vehiculo no Encontrado",
    };
  }
  return {
    success: true,
    data: response,
  };
};

export const updateVehicule = async (id_vehiculo, vehiculo_data) => {
  if (!id_vehiculo) {
    return {
      success: false,
      message: "Id del Vehiculo es requerido",
    };
  }

  if (!mongoose.Types.ObjectId.isValid(id_vehiculo)) {
    return {
      success: false,
      message: "Id del Vehiculo no es válido",
    };
  }

  const { placa, ...restoDatos } = vehiculo_data; // Extraer placa y el resto de los datos
  let vehiculoActualizado = { ...restoDatos }; // Inicializar con los datos restantes

  if (placa) {
    // Solo procesar si se envió la placa
    const placaUpper = placa.toUpperCase();

    const placaExist = await VehiculeRepository.findVehiculeByPlaca(placaUpper);
    if (placaExist) {
      return {
        success: false,
        message: "Placa ya existe",
      };
    }

    vehiculoActualizado.placa = placaUpper;
  }

  const response = await VehiculeRepository.updateVehicule(
    id_vehiculo,
    vehiculoActualizado
  );

  if (!response) {
    return {
      success: false,
      message: "Vehículo no encontrado",
    };
  }

  return {
    success: true,
    message: "Vehículo actualizado",
  };
};

export const toggleVehiculoEnUso = async (id_vehiculo) => {
  if (!id_vehiculo) {
    return {
      success: false,
      message: "Id del vehiculo es requerido",
    };
  }

  if (!mongoose.Types.ObjectId.isValid(id_vehiculo)) {
    return {
      success: false,
      message: "Id del Vehiculo no es valido",
    };
  }
  const vehiculeExist = await VehiculeRepository.findVehiculeById(id_vehiculo);
  if (!vehiculeExist) {
    return {
      success: false,
      message: "Vehiculo no encontrado",
    };
  }
  const response = await VehiculeRepository.toggleVehiculoEnUso(
    id_vehiculo,
    vehiculeExist.vehiculoEnUso
  );

  return {
    success: true,
    data: response,
  };
};

export const obtenerVehiculosSinPreoperacional = async (idUsuario) => {
  try {
    const response = await VehiculeRepository.obtenerVehiculosSinPreoperacional(
      idUsuario
    );

    return {
      success: true,
      data: response || [], // Si no hay datos, retorna un array vacío
    };
  } catch (error) {
    console.error("Error en obtenerVehiculosSinPreoperacional:", error);
    return {
      success: false,
      message: "Error al obtener vehículos sin preoperacional.",
      error: error.message, // Retorna el mensaje del error para depuración
    };
  }
};
