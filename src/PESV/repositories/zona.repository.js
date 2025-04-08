import ZonaModel from "../models/Zona.model.js";

const findZonaById = async (id_zona) => {
    return await ZonaModel.findById(id_zona);

}

const findAllZonas = async () => {
    return await ZonaModel.find();
}

export default {
    findZonaById,
    findAllZonas
}

