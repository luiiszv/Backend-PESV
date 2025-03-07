import {
  findAllFomularios,
  findFormualrioByID,
  insertFormulario,
  updateForm,
  findFormularioByVehiculo
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
    console.log("pasa");
    const response = await updateForm(params.id, body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong in uplaodFormulario", error });
  }
};

export const getFormularioByUserAuth = async (req, res) => {

  try {
    const response = await findFormularioByVehiculo(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor getFormularioBiUserAuth",
    });
  }

}
