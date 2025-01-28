import { findAllUsers, updateUser, createFormPreguntas } from "../services/admin.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const response = await findAllUsers();
    res.status(200).json(response);

  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong in getAllUsers", error });
  }
};

export const updateOneUser = async ({ body }, res) => {
  try {
    const response = await updateUser(body);
    res.status(200).json(response);

  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong in updateOneUser", error });
  }
}

export const createFormPregunta = async ({ body }, res) => {
  const { userId } = req.user; //Auth
  try {
    const response = await createFormPreguntas(userId, body);
    res.status(200).json(response);

  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong in createFormPregunta", error });
  }
}

const changeEstadoPregunta = async (id_pregunta) => {
  try {
    
    
  } catch (error) {

  }


}


