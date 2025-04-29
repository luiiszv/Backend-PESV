import desplazamientosRepository from "../repositories/desplazamientos.repository.js";
import userRepository from "../repositories/user.respository.js";
import vehiculoRepository from "../repositories/vehiculo.repository.js";
import vehiculeRepository from "../repositories/vehiculo.repository.js";
import { Types } from "mongoose";



export const registerNewDesplazamiento = async (idUsuario, data) => {
    try {
        const { idVehiculo } = data;

        if (!idVehiculo) {
            return {
                success: false,
                statusCode: 400,
                message: "El id del vehículo es requerido"
            };
        }

        if (!Types.ObjectId.isValid(idVehiculo)) {
            return {
                success: false,
                statusCode: 400,
                message: "El Id del vehículo no es valido"
            };
        }

        const vehiculeExist = await vehiculoRepository.findVehiculeById(idVehiculo);

        if (!vehiculeExist) {
            return {
                success: false,
                statusCode: 404,
                message: "No existe el vehiculo."
            };
        }

        const existDesplazamiento = await desplazamientosRepository.findFormInProgress(idUsuario, idVehiculo);
        if (existDesplazamiento) {
            return {
                success: false,
                statusCode: 400,
                message: "Ya existe un desplazamiento en curso para este usuario y vehículo."
            };
        }

        const newDesplazamiento = { ...data, idUsuario }
        const desplazamientoInsertado = await desplazamientosRepository.insertDesplazamiento(newDesplazamiento);

        if (!desplazamientoInsertado) {
            return {
                success: false,
                statusCode: 500,
                message: "No se pudo crear el desplazamiento"
            };
        }

        return {
            success: true,
            statusCode: 201,
            message: "Desplazamiento registrado correctamente",
            data: desplazamientoInsertado
        };

    } catch (error) {
        console.error("Error en registerNewDesplazamiento:", error);
        return {
            success: false,
            statusCode: 500,
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