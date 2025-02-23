import TipoDocumetoModel from "../models/TipoDocumentos.model.js";

const getTipoDocumentosVehiculo = async () => {
  return await TipoDocumetoModel.find({ categoria: "vehiculo" });
};

export default {
  getTipoDocumentosVehiculo,
};
