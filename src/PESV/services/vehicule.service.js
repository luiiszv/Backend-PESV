import VehiculeRepository from "../repositories/vehiculo.repository.js";
import ClaseVehiculoRepository from "../repositories/claseVehiculos.repository.js";
import TipoVehiculoRepository from "../repositories/tipoVehiculo.repository.js";
import zonaRepository from "../repositories/zona.repository.js";



export const findAllVehiculos = async () => {
  const vehiculos = await VehiculeRepository.findAllVehiculos();
  if (!vehiculos) {
    return {
      success: false,
      message: "No hay Vehiculos aun"
    }
  }

  return {
    success: true,
    data: vehiculos
  }

}


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

  await VehiculeRepository.insertVehiculo(
    vehiculoWithAuthUser
  );


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
