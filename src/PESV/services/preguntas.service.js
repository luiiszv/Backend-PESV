import PreguntasRepository from "../repositories/Preguntas.repository.js";




export const findPreguntaById = async (id_pregunta) => {
    const response = await PreguntasRepository.findPreguntaById(id_pregunta);
    return {
        success: true,
        data: response
    }

}

export const insertPregunta = async (pregunta_data) => {
    const response = await PreguntasRepository.insertPreguntas(pregunta_data);
    if (response && response.affectedRows > 0) {
        return {
            success: true,
            message: 'Pregunta Registrada',
            data: response
        }

    }
    else {
        return {
            success: false,
            message: 'Error al registrar la pregunta. No se realizaron cambios.',
        };

    }

}


