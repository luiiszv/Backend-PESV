import CargoModel from "../models/Cargos.model.js";

const findCargoById = async (id_cargo) => {
  return await CargoModel.findById(id_cargo);
};

const findAllCargos = async () => {
  return await CargoModel.find();

}
export default {
  findCargoById,
  findAllCargos
};
