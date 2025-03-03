import { getTipoDocumentosVehiculo } from "../services/tipoDocumento.service.js";

export const findTipoDocumentoVehiculos = async (req, res) => {
  try {
    const response = await getTipoDocumentosVehiculo();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong in findTipoDocumentoVehiculos",
      error,
    });
  }
};


