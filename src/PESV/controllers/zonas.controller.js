import { findAllZonas } from "../services/zona.service.js";


export const getAllZonas = async (req, res) => {

    try {
        const zonas = await findAllZonas();
        res.status(200).json(zonas);
    } catch (error) {
        res.status(400).json({ message: "Something went wrong in getAllUsers", error });
    }

}


