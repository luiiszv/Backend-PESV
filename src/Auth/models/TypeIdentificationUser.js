import { Schema, model } from "mongoose";

const TipoIdentificacionSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: false,
    },
  },
  { collection: "tipo_identificacion" }
);

export default model("tipo_identificacion", TipoIdentificacionSchema);
