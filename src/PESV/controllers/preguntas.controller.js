import {
  insertPregunta,
  findPreguntaById,
  updatePregunta,
  findAllPreguntas,
} from "../services/preguntas.service.js";

export const registerPregunta = async ({ body }, res) => {
  try {
    const response = await insertPregunta(body);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong in filterUserByName", error });
  }
};

export const getPreguntaByID = async (req, res) => {
  try {
    const { params } = req;
    const response = await findPreguntaById(params.id);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong in filterUserByName", error });
  }
};

export const updatePreguntaByid = async (req, res) => {
  try {
    const { body, params } = req;
    const response = await updatePregunta(params.id, body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong in updatePreguntaByid", error });
  }
};

export const getAllPreguntas = async (req, res) => {
  try {
    const response = await findAllPreguntas();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong in getAllPreguntas", error });
  }
};

