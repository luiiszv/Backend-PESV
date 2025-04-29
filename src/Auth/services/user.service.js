import { hash, compare } from "bcrypt";
import UserRepository from "../repositories/user.repository.js";
import RoleRepository from "../repositories/role.repository.js";

import { createAccessToken } from "../libs/jwt.js";
import {
  validateToken,
  authMiddleware,
} from "../../Middleware/ValidateAuth.js";
import mongoose from "mongoose";
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
      message: "Role not found",
    };
  }
  if (numeroDocumentoExist) {
    return {
      success: false,
      message: "Número de Documento ya Existe",
    };
  }
  if (emailExist) {
    return {
      success: false,
      message: "Email ya Existe",
    };
  }

  const userRistred = await UserRepository.createUser(userPassHashed);

  return {
    success: true,
    message: "Usuario Registrado",
    data: userRistred,
  };
};

/**
 * Consultar un usuario
 * @params email
 * @returns
 */
const getUser = async (email) => {
  const response = await UserRepository.findUserByEmail(email);
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
      message: "Usuario no Encontrado",
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
    user: payload

  };
};

const VerifyAuthUser = async (token) => {
  const responseValidation = validateToken(token);

  if (!responseValidation) {
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

const findUserById = async (id_user) => {
  if (!id_user) {
    return {
      success: false,
      message: "Id del usuario es requerido",
    };
  }

  if (!mongoose.Types.ObjectId.isValid(id_user)) {
    return { success: false, message: "Id Usuario no es valido" };
  }

  const response = await UserRepository.findUserById(id_user);
  if (!response) {
    return {
      success: false,
      message: "Usuario no encontrado",
    };
  }
  return {
    success: true,
    data: response,
  };
};

const updateUser = async (id_user, user_data) => {
  try {
    if (!id_user) {
      return { success: false, message: "El ID del usuario es requerido" };
    }
    if (!mongoose.Types.ObjectId.isValid(id_user)) {
      return { success: false, message: "ID de usuario no es válido" };
    }
    if (!user_data || Object.keys(user_data).length === 0) {
      return { success: false, message: "No hay cambios para actualizar" };
    }

    let updateFields = { ...user_data };

    // 🔹 Si hay contraseña en los datos enviados, la hasheamos
    if (user_data.password) {
      updateFields.password = await hash(user_data.password, 10);
    }

    const userExist = await UserRepository.findUserById(id_user);
    if (!userExist) {
      return {
        success: false,
        message: 'El Usuario no Existe'
      }
    }

    // 🔹 Intentar actualizar el usuario
    const userUpdated = await UserRepository.updateUser(id_user, updateFields);

    if (!userUpdated) {
      return {
        success: false,
        message: "Usuario no encontrado o no actualizado",
      };
    }

    return {
      success: true,
      message: "Usuario actualizado correctamente",
      data: userUpdated,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar el usuario",
      error: error.message,
    };
  }
};

export {
  insertUser,
  getUser,
  findUsers,
  deleteUser,
  loginUser,
  VerifyAuthUser,
  findUserById,
  updateUser,
};
