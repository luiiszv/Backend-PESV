import PreguntasRepository from "../repositories/Preguntas.repository.js";


export const findPreguntasByIdClaseVehiculo = async (id_vehiculo) => {
    const preguntas = await PreguntasRepository.findPreguntasByIdClaseVehiculo(id_vehiculo);
    if (!preguntas) {
        return {
            success: false,
            message: "No hay Pregutas por tipo de vehiculo"
        }
    }

    return {
        success: true,
        data: preguntas
    }
}