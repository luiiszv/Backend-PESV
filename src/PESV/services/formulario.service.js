import FormularioRepository from "../repositories/formualrios.respository.js";
import claseVehiculosRepository from "../repositories/claseVehiculos.repository.js";
import PreguntasRepository from "../repositories/Preguntas.repository.js";
import UsuarioRepository from "../repositories/user.respository.js";
import VehiculoRepository from "../repositories/vehiculo.repository.js";
import mongoose from "mongoose";

export const insertFormulario = async (form_data) => {
  const { idClaseVehiculo, preguntas } = form_data;

  const idClaseVehiculoExist =
    await claseVehiculosRepository.findClaseVehiculoById(idClaseVehiculo);
  if (!idClaseVehiculoExist) {
    return {
      success: false,
      message: "Id Clase de Vehiculo no es válido",
    };
  }

  for (const idPregunta of preguntas) {
    const preguntaExist = await PreguntasRepository.findPreguntaById(
      idPregunta
    );
    if (!preguntaExist) {
      return {
        success: false,
        message: `Pregunta con ID ${idPregunta} no fue encontrada`,
      };
    }
  }

  const formActiveExist = await FormularioRepository.findFomularioActiveByClase(
    idClaseVehiculo
  );
  if (formActiveExist) {
    await FormularioRepository.updateFormulario(formActiveExist._id, {
      estadoFormulario: false,
    });
  }

  const lastFormulario = await FormularioRepository.findLastFormularioByClase(
    idClaseVehiculo
  );
  const nuevaVersion = lastFormulario ? lastFormulario.version + 1 : 1;

  // Registrar el nuevo formulario con versión incrementada
  const response = await FormularioRepository.insertFormulario({
    ...form_data,
    version: nuevaVersion,
    estadoFormulario: true, // El nuevo formulario es el activo
  });

  return {
    success: true,
    data: response,
    message: "Formulario Registrado Correctamente",
  };
};

export const findAllFomularios = async () => {
  const response = await FormularioRepository.findAllFormularios();
  if (!response) {
    return {
      success: false,
      message: "No hay Formularios aún",
    };
  }
  return {
    success: true,
    data: response,
  };
};

export const findFormualrioByID = async (id_formulario) => {
  if (!mongoose.Types.ObjectId.isValid(id_formulario)) {
    return {
      success: false,
      message: "Id del Formualrio no es valido",
    };
  }
  const response = await FormularioRepository.findFormualrioByID(id_formulario);
  if (!response) {
    return {
      success: false,
      message: "No se ha encontrado ningún formulario",
    };
  }
  return {
    success: true,
    data: response,
  };
};

export const updateForm = async (id_form, new_data) => {
  if (!id_form) {
    return {
      success: false,
      message: "Id Formulario es requerido",
    };
  }
  if (!mongoose.Types.ObjectId.isValid(id_form)) {
    return {
      success: false,
      message: "Id Formulario no es valido",
    };
  }

  const formExist = await FormularioRepository.findFormualrioByID(id_form);

  if (!formExist) {
    return {
      success: false,
      message: "Formulario no encontrado",
    };
  }

  const response = await FormularioRepository.updateFormulario(
    id_form,
    new_data
  );

  if (response && response.modifiedCount > 0) {
    return {
      success: true,
      message: "Formulario actualizada correctamente",
      data: response,
    };
  } else {
    return {
      success: false,
      message: "No se realizaron cambios en el Formulario",
    };
  }
};

export const findFormularioByVehiculo = async (vehiculoId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(vehiculoId)) {
      return { success: false, message: "ID del vehículo no es válido" };
    }

    if (!vehiculoId) {
      return { success: false, message: "ID del vehículo es requerido" };
    }

    // Buscar el vehículo por su ID
    const vehiculo = await VehiculoRepository.findVehiculeById(vehiculoId);

    if (!vehiculo) {
      return { success: false, message: "Vehículo no encontrado" };
    }

    console.log(vehiculo)


    let idClaseVehiculo = vehiculo.idClaseVehiculo;

    // IDs de referencia
    const idMotocicleta = "67a50fff122183dc3aaddbae"; // ID de motocicleta
    const idAutomovil = "67a50fff122183dc3aaddbb2"; // ID de automóvil

    // Si el vehículo no es motocicleta, asignamos el ID de automóvil
    idClaseVehiculo = idClaseVehiculo === idMotocicleta ? idMotocicleta : idAutomovil;

    console.log("📄 ID de clase asignado:", idClaseVehiculo);

    // Obtener el formulario según la clase del vehículo
    const formulario = await FormularioRepository.findFormulariosByUserAuth(idClaseVehiculo);


    if (!formulario || !formulario.success || !formulario.formularios.length) {
      return { success: false, message: "No se encontró un formulario para este tipo de vehículo" };
    }

    return { success: true, formulario: formulario.formularios };
  } catch (error) {
    console.error("❌ Error en findFormularioByVehiculo:", error);
    return { success: false, message: "Error interno del servidor" };
  }
};
