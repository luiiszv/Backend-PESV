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

  const { placa, idZona, idTipoVehiculo, idClaseVehiculo } = vehiuclo;
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
    idTipoVehiculo
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
    placa: placaUperCase,
    idUsuario: id_user,
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
      message: "No hay Vehiulos asociados aun ",
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

  return {
    success: true,
    zonas: selectZonas,
    clases: selectClaseVehiculos,
    tipos: selectTipoVehiuclo,
    servicio: servicioEnum,
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
  const { placa } = vehiculo_data;
  if (!id_vehiculo) {
    return {
      success: false,
      message: "Id del Vehiculo es requerido",
    };
  }

  if (!mongoose.Types.ObjectId.isValid(id_vehiculo)) {
    return {
      suceess: false,
      message: "Id del Vehiculo no es valido",
    };
  }

  const placaUpper = placa.toUpperCase();

  const vehiuleUperPlaca = { ...vehiculo_data, placa: placaUpper };

  const response = await VehiculeRepository.updateVehicule(
    id_vehiculo,
    vehiuleUperPlaca
  );

  if (!response) {
    return {
      suceess: false,
      message: "Vehiculo no Encontrado",
    };
  }

  return {
    success: true,
    message: "Vehiculo Actualizado",
  };
};
