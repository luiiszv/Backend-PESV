import { Schema, model } from "mongoose";

const DocumentosVehiculeModel = new Schema({
  idVehiculo: {
    type: Schema.Types.ObjectId,
    ref: "vehiculos",
    require: true,
  },
  tipoDocumentoId: {
    type: Schema.Types.ObjectId,
    ref: "tipos_documentos",
    require: true,
  },
  fechaExpiracion: {
    type: Date,
    require: true,
  },
});

export default model("documentos_vehiculos", DocumentosVehiculeModel);
