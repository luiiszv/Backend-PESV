import UserModel from "../../Auth/models/UserModel.js";

const getAllUsers = async () => {
  return await UserModel.find();
};

const getUserById = async (id_user) => {
  return await UserModel.findById(id_user);
};

export default {
  getAllUsers,
  getUserById
};
