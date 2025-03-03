import TipoDocumentosRepository from "../repositories/tipoDocumento.repository.js";

export const getTipoDocumentosVehiculo = async () => {
  const tipoDocVehiculo =
    await TipoDocumentosRepository.getTipoDocumentosVehiculo();
  const tipoDocUsuario =
    await TipoDocumentosRepository.getTipoDocumentosUsuario();
  return {
    success: true,
    data: {
      tipoDocVehiculo,
      tipoDocUsuario,
    },
  };
};
