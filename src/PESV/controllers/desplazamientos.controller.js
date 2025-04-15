import { registerNewDesplazamiento, findAllDesplazaminetos } from "../services/desplazamientos.service.js";


export const createDesplazamiento = async (req, res) => {
    try {
        const { idUsuario } = req.use;
        const desplazamientoData = req.body;


        const result = await registerNewDesplazamiento(idUsuario, desplazamientoData);

        if (!result.success) {
            return res.status(400).json(result);
        }

        // Éxito - 201 Created
        return res.status(201).json({
            success: true,
            message: result.message,
            affectedRows: result.affectedRows,
            insertId: result.insertId,
            data: result.data
        });

    } catch (error) {
        console.error("Error en controlador createDesplazamiento:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message,
            affectedRows: 0
        });
    }
};


export const getAllDesplazamientos = async (req, res) => {

    try {

        const response = await findAllDesplazaminetos();

        // Éxito - 201 Created
        return res.status(201).json({
            success: true,
            data: response
        });

    } catch (error) {
        console.error("Error en controlador getAllDesplazamientos:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message,

        });
    }

}