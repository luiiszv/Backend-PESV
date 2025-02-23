import { Schema, model } from "mongoose";

const TipoDocuemntos = new Schema({
  nombreDocumento: {
    type: String,
    require: true,
  },
  categoria: {
    type: String,
    enum: ["persona", "vehiculo"],
  },
  descripcion: {
    type: String,
    require: false,
  },
});

export default model("tipos_documentos", TipoDocuemntos);
