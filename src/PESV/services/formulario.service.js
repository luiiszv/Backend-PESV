import FormularioRepository from "../repositories/formualrios.respository.js";
import claseVehiculosRepository from "../repositories/claseVehiculos.repository.js";
import PreguntasRepository from "../repositories/Preguntas.repository.js";


export const insertFormulario = async (form_data) => {

    const { idClaseVehiculo, preguntas } = form_data;

    const idClaseVehiculoExist = await claseVehiculosRepository.findClaseVehiculoById(idClaseVehiculo);
    if (!idClaseVehiculoExist) {
        return {
            success: false,
            message: 'Id Clase de Vehiculo no es valido'
        }
    }
    console.log(preguntas);

    // Validar cada idClaseVehiculo
    for (const idPregunta of preguntas) {
        const preguntaExist = await PreguntasRepository.findPreguntaById(idPregunta);

        if (!preguntaExist) {
            return {
                success: false,
                message: `Pregunta con ID ${idPregunta} no fue encontrada`,

            }
        }
    }

    const response = await FormularioRepository.insertFormulario(form_data);
    return {
        success: true,
        data: response,
        message: 'Formulario Registrado Correctamente'
    }
}

export const findAllFomularios = async () => {
    const response = await FormularioRepository.findAllFomularios();
    if (!response) {
        return {
            success: false,
            message: 'No hay Formularios aún'

        }
    }
    return {
        success: true,
        data: response
    }

}

export const findFormualrioByID = async (id_formulario) => {
    const response = await FormularioRepository.findFormualrioByID(id_formulario);
    if (!response) {
        return {
            success: false,
            message: 'No se ha encontrado ningún formulario'

        }
    }
    return {
        success: true,
        data: response
    }
}

