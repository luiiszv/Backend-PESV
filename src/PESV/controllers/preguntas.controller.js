

import { insertPregunta } from "../services/preguntas.service.js";

export const registerPregunta = async ({ body }, res) => {
    try {

        const response = await insertPregunta(body);
        res.status(200).json(response);

    } catch (error) {
        res
            .status(400)
            .json({ message: "Something went wrong in filterUserByName", error });

    }

}