import UserModel from "../models/UserModel.js";

const getAll = async () => {
  return await UserModel.find().select(
    "-password -numeroDocumento -telefono -email"
  );
};

const createUser = async (user) => {
  const newUser = new UserModel(user);

  return await newUser.save();
};

const findUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
};

const findUserById = async (id_user) => {
  return await UserModel.findById(id_user)
    .select("-password")
    .populate({
      path: "idRole",
      select: "-description ",
    })
    .populate({
      path: "idCargo",
      select: "-description ",
    });
};

const findUserByIdentificationNumber = async (numeroDocumento) => {
  return await UserModel.findOne({ numeroDocumento });
};

const delteOneUser = async (_id) => {
  return await UserModel.deleteOne({ _id });
};

const updateUser = async (id_user, user_data) => {
  return await UserModel.updateOne({ _id: id_user }, user_data);
};

export default {
  delteOneUser,
  findUserByEmail,
  createUser,
  getAll,
  findUserByIdentificationNumber,
  findUserById,
  updateUser,
};
