import { findAllVehiculos, findSelectInformationVehiculos } from "../services/vehicule.service.js";


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