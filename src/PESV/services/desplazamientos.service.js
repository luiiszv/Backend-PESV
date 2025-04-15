import desplazamientosRepository from "../repositories/desplazamientos.repository.js";
import userRepository from "../repositories/user.respository.js";





export const registerNewDesplazamiento = async (idUsuario, data) => {
    try {
        // Verificar si el usuario existe
        const userExist = await userRepository.getUserById(idUsuario);
        if (!userExist) {
            return {
                success: false,
                message: "El id del usuario no existe"
            };
        }

        // Insertar el desplazamiento
        const desplazamientoInsertado = await desplazamientosRepository.insertDesplazamiento(data);

        // Verificar si se insertó correctamente
        if (!desplazamientoInsertado) {
            return {
                success: false,
                message: "No se pudo crear el desplazamiento"
            };
        }

        // Retornar éxito con los datos del desplazamiento
        return {
            success: true,
            message: "Desplazamiento registrado correctamente",
            data: desplazamientoInsertado
        };

    } catch (error) {
        console.error("Error en registerNewDesplazamiento:", error);
        return {
            success: false,
            message: "Error al registrar un desplazamiento",
            error: error.message
        };
    }
};

export const findAllDesplazaminetos = async () => {
    try {
        const allDesplazamientos = await desplazamientosRepository.getAllDesplazamientos();

        return {
            success: true,
            allDesplazamientos
        }

    } catch (error) {
        console.error("Error en findAllDesplazaminetos:", error);
        return {
            success: false,
            message: "Error al obtener all desplazamientos",
            error: error.message
        };
    }


}