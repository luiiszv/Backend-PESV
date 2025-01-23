import RoleRepository from "../repositories/role.repository.js";

/**
 * Get Role
 * @params id_role
 * @returns Role
 */

export const findRoleById = async (id_role) => {
  const response = await RoleRepository.findRoleById(id_role);
  if (!response) {
    return {
      success: false,
      data: "Role not found",
    };
  }
  return {
    success: true,
    data: response,
  };
};
