import RoleModel from "../models/RolModel.js";

const findRoleById = async (id_rol) => {
  return await RoleModel.findById(id_rol);
};

export default {
  findRoleById,
};
