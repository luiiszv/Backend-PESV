import {
  findAllFomularios,
  findFormualrioByID,
  insertFormulario,
  updateForm
} from "../services/formulario.service.js";

export const registerFormualrio = async ({ body }, res) => {
  try {
    const response = await insertFormulario(body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong in registerFormualrio", error });
  }
};

export const getAllFormualarios = async (req, res) => {
  try {
    const response = await findAllFomularios();
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong in filterUserByName", error });
  }
};
export const getFormularioById = async (req, res) => {
  try {
    const formId = req.params.id;
    const response = await findFormualrioByID(formId);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong in filterUserByName", error });
  }
};

export const uplaodFormulario = async (req, res) => {
  try {
    const { body, params } = req;
    const response = await updateForm(params.id, body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong in uplaodFormulario", error });
  }
};
