import UserModel from "../../Auth/models/UserModel.js";
import CargoModel from "../models/Cargos.model.js";
const getAllUsers = async () => {
  return await UserModel.find().populate('cargo');
};

const getUserById = async (id_user) => {
  return await UserModel.findById(id_user).populate({
    path: 'cargo',
  });
};

const UpdateUser = async (user_data) => {
  return await UserModel.updateOne(
    { _id: user_data._id },
    { $set: user_data },
    { runValidators: true }
  )
};

export default {
  getAllUsers,
  getUserById,
  UpdateUser
};
