import FormularioRepository from "../repositories/formualrios.respository.js";
import claseVehiculosRepository from "../repositories/claseVehiculos.repository.js";
import PreguntasRepository from "../repositories/Preguntas.repository.js";
import UsuarioRepository from "../repositories/user.respository.js"
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
      message: "Id del Formualrio no es valido"
    }
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

export const findFormulariosByUserAuth = async (userId) => {
  if (!userId) {
    return {
      success: false,
      message: 'Id del usuario es requerido'
    };
  }

  const user = await UsuarioRepository.getUserById(userId);
  if (!user) {
    return {
      success: false,
      message: 'Usuario no encontrado'
    };
  }

  const { _id } = user;

  // Buscamos los vehículos activos del usuario
  const vehiculosActivos = await VehiculoRepository.findUserVehiuclesActives(_id);
  console.log('Vehículos Activos:', vehiculosActivos);

  if (!vehiculosActivos || vehiculosActivos.length === 0) {
    return {
      success: false,
      message: 'No hay Vehículos Activos Aún'
    };
  }

  // IDs de referencia
  const ID_MOTOCICLETA = "67a50fff122183dc3aaddbae";
  const ID_AUTOMOVIL = "67a50fff122183dc3aaddbb2";

  const formularios = [];

  for (const { idClaseVehiculo } of vehiculosActivos) {
    let idFormulario = ID_AUTOMOVIL; // Por defecto, usar formulario de Automóvil

    if (idClaseVehiculo.toString() === ID_MOTOCICLETA) {
      idFormulario = ID_MOTOCICLETA; // Si es motocicleta, usa su propio formulario
    }

    const responseForm = await FormularioRepository.findFormulariosByUserAuth(idFormulario);

    if (responseForm) {
      formularios.push({
        idClaseVehiculo,
        formularios: responseForm
      });
    }
  }

  if (formularios.length === 0) {
    return {
      success: false,
      message: 'No hay formularios disponibles para los vehículos del usuario'
    };
  }

  return {
    success: true,
    formularios
  };
};

