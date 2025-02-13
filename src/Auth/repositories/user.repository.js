import UserModel from "../models/UserModel.js";

const getAll = async () => {
  return await UserModel.find().select('-password -numeroDocumento -telefono -email');
};

const createUser = async (user) => {
  const newUser = new UserModel(user);

  return await newUser.save();
};

const findUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
};

const findUserByIdentificationNumber = async (numeroDocumento) => {
  return await UserModel.findOne({ numeroDocumento });
};

const delteOneUser = async (_id) => {
  return await UserModel.deleteOne({ _id });
};



export default {
  delteOneUser,
  findUserByEmail,
  createUser,
  getAll,
  findUserByIdentificationNumber
};
