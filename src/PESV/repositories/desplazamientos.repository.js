import DesplazamientosModel from "../models/FormDesplazamientos.model.js";



const insertDesplazamiento = async (data) => {
    const newForm = new DesplazamientosModel(data);
    return await newForm.save();
}

const getDesplazamintoById = async (id_desplazamiento) => {
    return await DesplazamientosModel.findById(id_desplazamiento);

}

const getAllDesplazamientos = async () => {
    return await DesplazamientosModel.find();
}



export default {
    insertDesplazamiento,
    getDesplazamintoById,
    getAllDesplazamientos
}






