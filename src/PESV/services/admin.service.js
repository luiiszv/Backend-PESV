import UserRepository from "../repositories/user.respository.js";

export const findAllUsers = async () => {
  const response = await UserRepository.getAllUsers();
  if (!response) {
    return {
      success: false,
      message: "Users not found",
    };
  }
};
