import VehiculeRepository from "../repositories/vehiculo.repository.js";
import ClaseVehiculoRepository from "../repositories/claseVehiculos.repository.js";
import TipoVehiculoRepository from "../repositories/tipoVehiculo.repository.js";
import zonaRepository from "../repositories/zona.repository.js";

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

  const response = await VehiculeRepository.insertVehiculo(
    vehiculoWithAuthUser
  );

  console.log(response);

  return {
    success: true,
    message: "Vehiculo Registrado",
  };
};

export const findAllVehiuclosByUser= ()=>{
  
}
