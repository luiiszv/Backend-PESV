import PreguntasModel from "../models/PreguntasFormularios.model.js";
import ClaseVehiuclosModel from "../models/ClaseVehiuclos.model.js";
import UserModel from "../../Auth/models/UserModel.js";

const findAllPreguntas = async () => {
    return await PreguntasModel.find().populate('idUsuarioCreador').populate('calseVehiculo');

}

const findPreguntaById = async (id_pregunta) => {
    return await PreguntasModel.findById(id_pregunta);

}
const insertPreguntas = async (pregunta) => {
    const newPreguntas = new PreguntasModel(pregunta);
    return await newPreguntas.save();
}

const updatePregunta = async (pregunta_data) => {
    return await PreguntasModel.updateOne(
        { _id: pregunta_data._id },
        { $set: pregunta_data },
        { runValidators: true }

    )
}

const changeEstadoPregunta = async (id_pregunta, nuevoEstado) => {
    return await PreguntasModel.updateOne(
        { _id: id_pregunta },
        { $set: { estadoPregunta: nuevoEstado } },
        { runValidators: true }
    )

}


export default {
    findAllPreguntas,
    insertPreguntas,
    updatePregunta,
    findPreguntaById,
    changeEstadoPregunta
}