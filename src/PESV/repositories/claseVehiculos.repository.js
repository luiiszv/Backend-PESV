import ClaseVehiculosModel from "../models/ClaseVehiuclos.model.js";


const findClaseVehiculoById = async (id_clase) => {
    return await ClaseVehiculosModel.findById(id_clase);
}

const findAllClaseVehiculos = async () => {
    return await ClaseVehiculosModel.find();


}

export default {
    findClaseVehiculoById,
    findAllClaseVehiculos
}