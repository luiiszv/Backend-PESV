import PreguntasModel from "../models/PreguntasFormularios.model.js";
import ClaseVehiuclosModel from "../models/ClaseVehiuclos.model.js";
import UserModel from "../../Auth/models/UserModel.js";

const findAllPreguntas = async () => {
  return await PreguntasModel.find();
};

const findPreguntaById = async (id_pregunta) => {
  return await PreguntasModel.findById(id_pregunta);
};
const insertPreguntas = async (pregunta) => {
  const newPreguntas = new PreguntasModel(pregunta);
  return await newPreguntas.save();
};

const updatePregunta = async (id_pregunta, datos_actualizados) => {

  return await PreguntasModel.updateOne(
    { _id: id_pregunta },
    { $set: datos_actualizados },
    { runValidators: true }
  );
};

const findPreguintaByPreguntaTexto = async (pregunta_texto) => {
  return await PreguntasModel.findOne({ preguntaTexto: pregunta_texto });
};

export default {
  findAllPreguntas,
  insertPreguntas,
  updatePregunta,
  findPreguntaById,

  findPreguintaByPreguntaTexto,
};
