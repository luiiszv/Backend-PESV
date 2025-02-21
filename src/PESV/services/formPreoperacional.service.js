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
  const errorForms = await FormPreoperacionalRepository.findFormulariosDiariosConErrores(fecha);
  if (!errorForms.length) {
    return {
      success: false,
      message: "No hay formularios registrados con errores en esta fecha.",
    };
  }

  return { success: true, data: errorForms };
};

