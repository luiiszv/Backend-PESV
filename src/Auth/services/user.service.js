import { hash, compare } from "bcrypt";
import UserRepository from "../repositories/user.repository.js";
import RoleRepository from "../repositories/role.repository.js";

import { createAccessToken } from "../libs/jwt.js";
import { validateToken } from "../../Middleware/ValidateAuth.js";

/**
 * Registar usuario
 * @params user
 * @returns
 */

const insertUser = async (user) => {
  const { idRole, tipoIdentificacion, numeroDocumento, email } = user;
  const passwordHashed = await hash(user.password, 10);
  const userPassHashed = { ...user, password: passwordHashed };

  //ROLE
  const roleExist = await RoleRepository.findRoleById(idRole);
  const numeroDocumentoExist =
    await UserRepository.findUserByIdentificationNumber(numeroDocumento);
  const emailExist = await UserRepository.findUserByEmail(email);

  if (!roleExist) {
    return {
      success: false,
      data: "Role not found",
    };
  }

  if (!roleExist) {
    return {
      success: false,
      data: "Role not found",
    };
  }
  if (numeroDocumentoExist) {
    return {
      success: false,
      data: "Identification number is already registered",
    };
  }
  if (emailExist) {
    return {
      success: false,
      data: "Email is already registered",
    };
  }

  await UserRepository.createUser(userPassHashed);

  return {
    success: true,
    data: "User registered",
  };
};

/**
 * Consultar un usuario
 * @params email
 * @returns
 */
const getUser = async (email) => {
  const response = await UserRepository.findUserByEamil(email);
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
  const response = await UserRepository.getAll();
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
  const response = await UserRepository.delteOneUser(_id);
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
  const userExist = await UserRepository.findUserByEmail(email);
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
    roleId: userExist.idRole,
  };


  const token = await createAccessToken(payload);
  return {
    success: true,
    message: "logged user",
    token: token,
  };
};

const VerifyAuthUser = async (token) => {
  const responseValidation = validateToken(token);

  if (!responseValidation) {
    console.log(responseValidation);
    return {
      success: false,
      data: "Token is't valid",
    };
  }

  return {
    success: true,
    data: responseValidation,
  };
};
export {
  insertUser,
  getUser,
  findUsers,
  deleteUser,
  loginUser,
  VerifyAuthUser,
};
