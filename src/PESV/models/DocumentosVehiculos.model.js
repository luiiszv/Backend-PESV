import { Schema, model } from "mongoose";

const DocumentosVehiculeModel = new Schema({
  idVehiculo: {
    type: Schema.Types.ObjectId,
    ref: "vehiculos",
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  tipoDocumentoId: {
    type: Schema.Types.ObjectId,
    ref: "tipos_documentos",
    require: true,
  },
  numeroDocumento: {
    type: String,
    require: false,
  },
  fechaExpiracion: {
    type: Date,
    require: false,
  },
  assetId: {
    type: String,
    require: true,
  },
  public_id: {
    type: String,
    require: true,
  },
  ruta: {
    type: String,
    require: true,
  },
});

DocumentosVehiculeModel.index({ idVehiculo: 1 });

export default model("documentos_vehiculos", DocumentosVehiculeModel);
