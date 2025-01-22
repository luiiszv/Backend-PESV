
import { hash, compare } from "bcrypt";
import {
  getAll,
  createUser,
  findUserByEamil,
  delteOneUser,
} from "../repositories/user.repository.js";

import { createAccessToken } from "../libs/jwt.js";

/**
 * Registar usuario
 * @params user
 * @returns
 */

const insertUser = async (user) => {
  const passwordHashed = await hash(user.password, 10);
  const userPassHashed = { ...user, password: passwordHashed };
  const response = await createUser(userPassHashed);
  return {
    success: true,
    message: "User registred",
    data: response,
  };
};

/**
 * Consultar un usuario
 * @params email
 * @returns
 */
const getUser = async (email) => {
  const response = await findUserByEamil(email);
  return {
    success: true,
    message: "User Found",
    data: response,
  };
};

/**
 * Consultar todos los usuarios
 * @params -
 * @returns Users
 */
const findUsers = async () => {
  const response = await getAll();
  return {
    success: true,
    data: response,
  };
};

/**
 * Elimiar usuarios
 * @params id_user
 * @returns
 */
const deleteUser = async (_id) => {
  const response = await delteOneUser(_id);
  return {
    seccess: true,
    message: "User Deleted",
    data: response,
  };
};

/**
 * Login user
 * @params email, password
 * @returns token
 */

const loginUser = async (email, password) => {
  const userExist = await findUserByEamil(email);
  if (!userExist) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const match = await compare(password, userExist.password);
  if (!match) {
    return {
      success: false,
      message: "Incorrect Password",
    };
  }
  const payload = {
    userId: userExist._id,
    email: userExist.email,
    roleId: userExist.role,
  };

  const token = await createAccessToken(payload);
  return {
    success: true,
    token: token,
  };
};
export { insertUser, getUser, findUsers, deleteUser, loginUser };
