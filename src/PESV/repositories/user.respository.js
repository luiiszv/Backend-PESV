import UserModel from "../../Auth/models/UserModel.js";
import CargoModel from "../models/Cargos.model.js";
const getAllUsers = async () => {
  return await UserModel.find().populate("idCargo");
};

const findUsersPagination = async (lastId , limit) => {
  const query = lastId ? { _id: { $gt: lastId } } : {}; //$gt mayor que / grather than
  return await UserModel.find(query).sort({ _id: 1 }).limit(limit).lean().populate({path: "idCargo", select: "-description"});
};

const getUserById = async (id_user) => {
  return await UserModel.findById(id_user).populate({
    path: "idCargo",
  });
};

const UpdateUser = async (user_data) => {
  return await UserModel.updateOne(
    { _id: user_data._id },
    { $set: user_data },
    { runValidators: true }
  );
};

export default {
  getAllUsers,
  getUserById,
  UpdateUser,
  findUsersPagination,
};
