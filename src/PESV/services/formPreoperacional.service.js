import mongoose from "mongoose";
import FormPreoperacionalRepository from "../repositories/formPreoperacional.repository.js";

export const obtenerFormulariosDiarios = async (fecha) => {
  const formularios = await FormPreoperacionalRepository.findFormulariosDiarios(
    fecha
  );

  if (!formularios.length) {
    return {
      success: false,
      message: "No hay formularios registrados en esta fecha.",
    };
  }

  return { success: true, data: formularios };
};

export const obtenerFormulariosDiariosConErrores = async (fecha) => {
  const errorForms =
    await FormPreoperacionalRepository.findFormulariosDiariosConErrores(fecha);
  if (!errorForms.length) {
    return {
      success: false,
      message: "No hay formularios registrados con errores en esta fecha.",
    };
  }

  return { success: true, data: errorForms };
};

export const getFormPreOperacionalById = async (id_form) => {
  if (!id_form) {
    return {
      success: false,
      message: "Id del formulario es requerido",
    };
  }
  if (!mongoose.Types.ObjectId.isValid(id_form)) {
    return {
      success: false,
      message: "Id del formulario no es valido",
    };
  }
  const form = await FormPreoperacionalRepository.getFormPreOperacionalById(
    id_form
  );

  return {
    success: true,
    data: form,
  };
};
