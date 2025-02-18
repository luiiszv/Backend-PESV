import { Schema, model } from "mongoose";

const PreguntasFormulariosSchema = new Schema(
  {
    preguntaTexto: {
      type: String,
      require: true,
      trim: true
    },
    determinancia: {
      type: Boolean,
      require: true,
    },
  
    fechaCreacion: {
      type: Date,
      default: Date.now, //  fecha por creacion
    },
  },
  { timestamps: true }
);

export default model("preguntas_formularios", PreguntasFormulariosSchema);
