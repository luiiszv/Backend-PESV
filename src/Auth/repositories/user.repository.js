import UserModel from "../models/UserModel.js";

const getAll = async () => {
  return await UserModel.find();
};

const createUser = async (user) => {
  const newUser = new UserModel(user);

  return await newUser.save();
};

const findUserByEamil = async (email) => {
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
  findUserByEamil,
  createUser,
  getAll,
  findUserByIdentificationNumber,
};
