import ZonaRepository from "../repositories/zona.repository.js";

export const findAllZonas = async () => {
  const response = await ZonaRepository.findAllZonas();
  if (!response) {
    return {
      success: false,
      message: "Zonas not found",
    };
  }

  return {
    success: true,
    data: response,
  };
};
