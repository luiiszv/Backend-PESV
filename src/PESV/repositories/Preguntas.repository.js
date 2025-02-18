import PreguntasModel from "../models/PreguntasFormularios.model.js";
import ClaseVehiuclosModel from "../models/ClaseVehiuclos.model.js";
import UserModel from "../../Auth/models/UserModel.js";

const findAllPreguntas = async () => {
    return await PreguntasModel.find().select("-_id -idUsuarioCreador").populate({
        path: 'idClaseVehiculo',
        select: 'name -_id '
    });

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



const findPreguntasByIdClaseVehiculo = async (id_clase_vehiculo) => {
    return await PreguntasModel.find({ idClaseVehiculo: id_clase_vehiculo });


}

const findPreguintaByPreguntaTexto = async (pregunta_texto) => {
    return await PreguntasModel.findOne({ preguntaTexto: pregunta_texto });

}


export default {
    findAllPreguntas,
    insertPreguntas,
    updatePregunta,
    findPreguntaById,

    findPreguntasByIdClaseVehiculo,
    findPreguintaByPreguntaTexto
}