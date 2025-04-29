import mongoose from "mongoose";
import FormPreoperacionalRepository from "../repositories/formPreoperacional.repository.js";
import UserRepository from "../../Auth/repositories/user.repository.js";
import FormRepository from "../repositories/formualrios.respository.js";
import PreguntasRepository from "../repositories/Preguntas.repository.js";
import vehiculoRepository from "../repositories/vehiculo.repository.js";
import NotifyRepository from "../repositories/notificaiones.repository.js";
import moment from "moment-timezone";
const TIMEZONE = "America/Bogota";

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

export const insertFormPreOperacional = async (idUsuario, form_data) => {
  const { formularioId, respuestas, idVehiculo } = form_data;

  // Verificar si el usuario existe
  const usuarioExist = await UserRepository.findUserById(idUsuario);
  if (!usuarioExist) {
    return { success: false, message: "El usuario no fue encontrado." };
  }

  // Verificar si el formulario existe
  const formularioExist = await FormRepository.findFormualrioByID(formularioId);
  if (!formularioExist) {
    return { success: false, message: "El formulario no fue encontrado." };
  }

  // Verificar si el vehículo existe
  const vehiculoExist = await vehiculoRepository.findVehiculeById(idVehiculo);
  if (!vehiculoExist) {
    return { success: false, message: "Vehículo no encontrado." };
  }

  let estadoFormulario = "operativo";

  // Si no hay respuestas, se considera "no_aplica"
  if (!Array.isArray(respuestas) || respuestas.length === 0) {
    estadoFormulario = "no_aplica";
  } else {
    for (const { idPregunta, respuesta } of respuestas) {
      const preguntaExist = await PreguntasRepository.findPreguntaById(
        idPregunta
      );

      if (!preguntaExist) {
        return {
          success: false,
          message: `La pregunta con ID ${idPregunta} no fue encontrada.`,
        };
      }

      if (preguntaExist.determinancia && respuesta === false) {
        estadoFormulario = "en_revision";
      }
    }
  }

  // Registrar el formulario con su estado
  const formDataStatus = { ...form_data, estadoFormulario, idUsuario };
  const response = await FormPreoperacionalRepository.insertFormPreOperacional(
    formDataStatus
  );

  // Notificar en caso de errores en el formulario
  if (estadoFormulario == "en_revision") {
    const descripcionVehiculo = vehiculoExist.placa && vehiculoExist.placa.trim() !== ""
      ? `vehículo con placa ${vehiculoExist.placa}`
      : `equipo con código ${vehiculoExist.codigo}`;

    const res = await NotifyRepository.createNotificacion({
      idUsuario: vehiculoExist.idUsuarioAsignado || vehiculoExist.idUsuario,
      tipoNotificacion: "formulario_en_revision",
      detalle: `El ${descripcionVehiculo} ha realizado un formulario en estado revision.`,
      enviadoA: ["administrador"],
    });

    const placaOcodigo = vehiculoExist.placa && vehiculoExist.placa.trim() !== ""
      ? `vehículo con placas ${vehiculoExist.placa}`
      : `equipo con código ${vehiculoExist.codigo}`;

    const res2 = await NotifyRepository.createNotificacion({
      idUsuario: vehiculoExist.idUsuarioAsignado,
      tipoNotificacion: "formulario_en_revision",
      detalle: `Según los resultados del formulario preoperacional, el ${placaOcodigo} NO cumple con las condiciones mínimas de seguridad para su circulación.`,
      enviadoA: ["usuario"],
    });

  }

  return {
    success: true,
    message:
      estadoFormulario === "en_revision"
        ? "Formulario Registrado Con Errores"
        : "Formulario Registrado",
    data: response,
  };
};


//Insert preoperacional no_aplica
export const insertFormPreOperacionalNoAplica = async (idUsuario, data) => {

  const { idVehiculo } = data;

  if (!idVehiculo) {
    return { success: false, message: "El id del vehiculo es requerido" };
  }

  // Verificar si el usuario existe
  const usuarioExist = await UserRepository.findUserById(idUsuario);
  if (!usuarioExist) {
    return { success: false, message: "El usuario no fue encontrado." };
  }

  if (!mongoose.Types.ObjectId.isValid(idVehiculo)) {
    return { success: false, message: "El id del vehiculo no es valido" };
  }

  // Verificar si el vehículo existe
  const vehiculoExist = await vehiculoRepository.findVehiculeById(idVehiculo);
  if (!vehiculoExist) {
    return { success: false, message: "Vehículo no encontrado." };
  }

  const idFormulario = await FormRepository.findFomularioActiveByClase(vehiculoExist.idClaseVehiculo);

  const formData = { estadoFormulario: "no_aplica", idUsuario, idVehiculo, idFormulario };

  const response = await FormPreoperacionalRepository.insertFormPreOperacional(
    formData
  );


  // Notificar en caso de errores en el formulario

  const res = await NotifyRepository.createNotificacion({
    idUsuario: vehiculoExist.idUsuarioAsignado || vehiculoExist.idUsuario,
    tipoNotificacion: "formulario_no_aplica",
    detalle: `El vehículo con placa ${vehiculoExist.placa} ha marcado un formulario como no aplica.`,
    enviadoA: ["administrador"],
  });



  return {
    success: true,
    message: "Formulario registrado como no aplica",
    data: response
  };
};

//Estadisticas
export const obtenerVehiculosFaltantes = async (fechaString, horaLimite) => {
  const fecha = fechaString || moment.tz(TIMEZONE).format("YYYY-MM-DD");
  const faltantes =
    await FormPreoperacionalRepository.findVehiculosFaltantesPreoperacional(
      fecha,
      horaLimite
    );

  // Filtrar solo los datos necesarios para la respuesta
  const data = faltantes.map((item) => ({
    vehiculo: {
      _id: item.vehiculo._id,
      placa: item.vehiculo.placa,
      marca: item.vehiculo.marca,
      claseVehiculo: item.vehiculo.idClaseVehiculo, //puede generar error
    },
    formularioAsignado: item.formularioAsignado
      ? {
        _id: item.formularioAsignado._id,
        nombreFormulario: item.formularioAsignado.nombreFormulario,
        version: item.formularioAsignado.version,
      }
      : null,
    debeRealizar: !!item.formularioAsignado,
  }));

  return {
    success: true,
    data,
    message: `Se encontraron ${faltantes.length} vehículos sin preoperacional`,
  };
};
export const marcarFaltantesComoNoContestado = async () => {
  const ahora = moment().tz(TIMEZONE);
  console.log(`[${ahora.format()}] Iniciando marcado automático`);

  const fechaString = ahora.format("YYYY-MM-DD");
  const fechaInicio = ahora.clone().startOf("day").toDate();
  const fechaFin = ahora.clone().endOf("day").toDate();


  try {
    console.log("🔍 Buscando vehículos que no han realizado el preoperacional...");
    const vehiculosFaltantes = await FormPreoperacionalRepository.findVehiculosFaltantesPreoperacional(fechaString);
    console.log(`📌 Vehículos faltantes encontrados: ${vehiculosFaltantes.length}`);

    let contador = 0;
    const resultados = [];
    const notificacionesCreadas = [];

    for (const item of vehiculosFaltantes) {
      try {
        const vehiculo = item.vehiculo;
        console.log(`🚗 Procesando vehículo: ${vehiculo.placa} (${vehiculo._id})`);

        // Validación robusta del usuario
        const usuarioNotificacion = vehiculo.idUsuarioAsignado || vehiculo.idUsuario;
        if (!usuarioNotificacion) {
          console.error(`⚠️ Vehículo ${vehiculo.placa} no tiene usuario válido. Se omite.`);
          continue;
        }

        // Verificar si ya está marcado
        const yaMarcado = await FormPreoperacionalRepository.existeNoContestdadoParaVehiculo(
          vehiculo._id,
          fechaInicio,
          fechaFin
        );
        if (yaMarcado) {
          console.log(`⚠️ Vehículo ${vehiculo.placa} ya está marcado. Se omite.`);
          continue;
        }

        const formulario = item.formularioAsignado;
        if (!formulario) {
          console.log(`❌ No hay formulario para ${vehiculo.placa}. Se omite.`);
          continue;
        }

        // Crear registro
        await FormPreoperacionalRepository.createNoAplicaAutomatico({
          idUsuario: usuarioNotificacion,
          idVehiculo: vehiculo._id,
          formularioId: formulario._id,
          respuestas: [],
          estadoFormulario: "no_reporta",
        });
        console.log(`✅ Vehículo ${vehiculo.placa} marcado como "no_reporta"`);

        // Crear notificación
        const notificacion = await NotifyRepository.createNotificacion({
          idUsuario: usuarioNotificacion,
          tipoNotificacion: "info",
          detalle: `Vehículo ${vehiculo.placa} marcado como no contestado (no preoperacional)`,
          enviadoA: ["administrador"],
          fechaExpiracion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        notificacionesCreadas.push(notificacion._id);
        contador++;
        resultados.push({
          vehiculo: vehiculo._id,
          placa: vehiculo.placa,
          status: "success",
        });
      } catch (error) {
        console.error(`❌ Error procesando ${item.vehiculo.placa}:`, error);
        resultados.push({
          vehiculo: item.vehiculo._id,
          placa: item.vehiculo.placa,
          status: "error",
          error: error.message,
        });
      }
    }

    console.log(`✅ Marcado completado. ${contador} vehículos procesados.`);
    return {
      success: true,
      message: `Proceso completado. ${contador} vehículos procesados.`,
      totalVehiculos: vehiculosFaltantes.length,
      vehiculosProcesados: contador,
      notificacionesCreadas: notificacionesCreadas.length,
      errores: resultados.filter((r) => r.status === "error").length,
      detalles: resultados,
      horaEjecucion: ahora.format("HH:mm:ss"),
    };
  } catch (error) {
    console.error("🚨 Error en el proceso automático:", error);
    return {
      success: false,
      message: "Error en el proceso automático",
      error: error.message,
    };
  }
};



export const updatePreoperacionalById = async (id_form, datos) => {

  try {


    if (!mongoose.Types.ObjectId.isValid(id_form)) {
      return {
        success: false,
        message: "El id del formulario es invalido"
      }

    }

    const preoperacionalExist = await FormPreoperacionalRepository.getFormPreOperacionalById(id_form);

    if (!preoperacionalExist) {
      return {
        success: false,
        message: "No se ha encontrado el formulario"
      }

    }

    const resUpdate = await FormPreoperacionalRepository.updateForm(id_form, {
      estadoFormulario: datos.estadoFormulario,
      respuestas: datos.respuestas,
      fechaRespuesta: new Date()

    })

    return {
      success: true,
      data: resUpdate,
      message: "Formualario Actualizado"
    }



  } catch (error) {
    console.error("🚨 Error en PreoperacionalById:", error);
    return {
      success: false,
      message: "Error en el proceso automático",
      error: error.message,
    };
  }
}


export const findPreoperacionalById = async (id_form) => {

  try {


    if (!mongoose.Types.ObjectId.isValid(id_form)) {
      return {
        success: false,
        message: "El id del formulario es invalido"
      }

    }

    const preoperacionalExist = await FormPreoperacionalRepository.getFormPreOperacionalById(id_form);

    if (!preoperacionalExist) {
      return {
        success: false,
        message: "No se ha encontrado el formulario"
      }

    }

    return {
      success: true,
      data: preoperacionalExist,

    }

  } catch (error) {
    console.error("🚨 Error en PreoperacionalById:", error);
    return {
      success: false,
      message: "Error en el proceso automático",
      error: error.message,
    };
  }
}



export const deletePreoperacioalById = async (id_form) => {

  try {
    if (!mongoose.Types.ObjectId.isValid(id_form)) {
      return {
        success: false,
        message: "El id del formulario es invalido"
      }

    }

    const preoperacionalExist = await FormPreoperacionalRepository.getFormPreOperacionalById(id_form);

    if (!preoperacionalExist) {
      return {
        success: false,
        message: "No se ha encontrado el formulario"
      }

    }
    const res = await FormPreoperacionalRepository.deleteFormPreoperacional(id_form);

    return {
      success: true,
      data: res,
      message: "Preoperacional eliminado"

    }

  } catch (error) {
    console.error("🚨 Error en PreoperacionalById:", error);
    return {
      success: false,
      message: "Error en el proceso automático",
      error: error.message,
    };
  }
}
