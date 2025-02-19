import FormularioModel from "../models/Formularios.model.js";
import PreguntasModel from "../models/PreguntasFormularios.model.js";
import ClaseVehiuclosModel from "../models/ClaseVehiuclos.model.js";

const findAllFormularios = async () => {
  return await FormularioModel.find()
    .populate("idClaseVehiculo") // Popular la clase del vehículo
    .populate({
      path: "preguntas",
      model: "preguntas_formularios", // Asegurar que está referenciando la colección correcta
      select: "preguntaTexto determinancia", // Solo traer los campos necesarios
    });
};

const insertFormulario = async (form_data) => {
  const newForm = new FormularioModel(form_data);
  return await newForm.save();
};
const findFormualrioByID = async (id_formulario) => {
  return await FormularioModel.findById(id_formulario);
};

const findFomularioActiveByClase = async (idClaseVehiculo) => {
  return await FormularioModel.findOne({
    estadoFormulario: true,
    idClaseVehiculo,
  });
};
const findLastFormularioByClase = async (idClaseVehiculo) => {
  return await FormularioModel.findOne({ idClaseVehiculo }).sort({
    version: -1,
  });
};
const updateFormulario = async (idFormulario, updateData) => {
  return await FormularioModel.updateOne(
    { _id: idFormulario },
    { $set: updateData }
  );
};

export default {
  findAllFormularios,
  findFormualrioByID,
  insertFormulario,
  findFomularioActiveByClase,
  findLastFormularioByClase,
  updateFormulario,
};
