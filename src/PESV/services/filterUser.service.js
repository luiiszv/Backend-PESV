import UserFilers from "../repositories/filterUser.respository.js";

export const findUsersByNameCCFilter = async (searchTerm) => {
  const response = await UserFilers.findUsersByNameCCFilter(searchTerm);
  if (!response) {
    return {
      success: false,
      message: "No hay coincidencias",
    };
  }

  return {
    success: true,
    data: response,
  };
};
