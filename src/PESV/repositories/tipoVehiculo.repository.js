import TipoVehiculoModel from "../models/TipoVehiculos.model.js";

const findTipoVehiculoById = async (id_tipo) => {
  return await TipoVehiculoModel.findById(id_tipo);
};

const findAllTipoVehiculos = async () => {
  return await TipoVehiculoModel.find();

}



export default {
  findTipoVehiculoById,
  findAllTipoVehiculos
};
