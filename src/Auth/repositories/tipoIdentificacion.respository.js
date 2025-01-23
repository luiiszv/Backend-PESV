import TipoIdentModel from "../models/TypeIdentificationUser.js";

const findTipoIdentificaionById = async (tipoIdentificacion) => {
  return await TipoIdentModel.findById(tipoIdentificacion);
};

export default {
  findTipoIdentificaionById,
};
