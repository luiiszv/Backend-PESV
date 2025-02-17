import { findAllVehiculos, findSelectInformationVehiculos } from "../services/vehicule.service.js";
import { getDocuemntsByIdVehiculo } from "../services/documents.service.js";

export const getAllVehiculos = async (req, res) => {
    try {

        const response = await findAllVehiculos();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Something went wrong in getAllVehiculos",
            error,
        });
    }

}

export const getAllSelectVehicules = async (req, res) => {
    try {
        const response = await findSelectInformationVehiculos();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Something went wrong in getAllSelectVehicules",
            error,
        });

    }

}

export const getDocsByIdVehiculo = async (req, res) => {
    try {
        const id_vehiculo = req.params.id;
        const response = await getDocuemntsByIdVehiculo(id_vehiculo);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Something went wrong in getAllSelectVehicules",
            error,
        });

    }
}