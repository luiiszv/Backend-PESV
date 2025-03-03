import TipoDocumetoModel from "../models/TipoDocumentos.model.js";

const getTipoDocumentosVehiculo = async () => {
  return await TipoDocumetoModel.find({ categoria: "vehiculo" });
};

const getTipoDocumentosUsuario = async () => {
  return await TipoDocumetoModel.find({ categoria: "persona" });
};


export default {
  getTipoDocumentosVehiculo,
  getTipoDocumentosUsuario
};
