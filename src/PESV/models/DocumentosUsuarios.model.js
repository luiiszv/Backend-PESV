import { Schema, model } from "mongoose";
import { string } from "zod";

const DocumentosUsuariosSchema = new Schema({
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
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
    require: true,
  },
  fechaExpiracion: {
    type: Date,
    require: true,
  },
  assetId: {
    type: String,
    require: true
  },
  ruta: {
    type: String,
    require: true,
  },
});

export default model("documentos_usuarios", DocumentosUsuariosSchema);
