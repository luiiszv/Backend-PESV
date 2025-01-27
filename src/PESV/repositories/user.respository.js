import UserModel from "../../Auth/models/UserModel.js";

const getAllUsers = async () => {
  return await UserModel.find();
};

const getUserById = async (id_user) => {
  return await UserModel.findById(id_user).populate('');
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
