import FormularioModel from "../models/Formularios.model.js";

const findAllFomularios = async () => {
    return await FormularioModel.find();

}

const insertFormulario = async (form_data) => {
    const newForm = new FormularioModel(form_data);
    return await newForm.save();


}
const findFormualrioByID = async (id_formulario) => {
    return await FormularioModel.findById(id_formulario);
}


export default {
    findAllFomularios,
    findFormualrioByID,
    insertFormulario
}

