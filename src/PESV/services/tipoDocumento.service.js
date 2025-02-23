import TipoDocumentosRepository from "../repositories/tipoDocumento.repository.js";

export const getTipoDocumentosVehiculo = async () => {
  const response = await TipoDocumentosRepository.getTipoDocumentosVehiculo();
  return {
    success: true,
    data: response,
  };
};
