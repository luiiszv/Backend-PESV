import UserModel from "../models/UserModel.js";


export const getAll = async () => {
  return await UserModel.find();
};

export const createUser = async (user) => {
  return await UserModel.create(user);
};

export const findUserByEamil = async (email) => {
  return await UserModel.findOne({ email });
};

export const delteOneUser = async (_id) => {
  return await UserModel.deleteOne({ _id });
};

