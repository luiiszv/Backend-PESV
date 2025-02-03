import { Schema, model } from "mongoose";

const PreguntasFormulariosSchema = new Schema(
  {
    idUsuarioCreador: {
      type: Schema.Types.ObjectId,
      ref: "usuarios",
      required: true,
    },
    idClaseVehiculo: [
      {
        type: Schema.Types.ObjectId,
        ref: "clase_vehiculos",
        required: true,
      }
    ],
    preguntaTexto: {
      type: String,
      require: true,
      trim: true
    },
    determinancia: {
      type: Boolean,
      require: true,
    },
    estadoPregunta: {
      type: Boolean, //Para Inactivarla en caso de que no se use mas
      require: true,
      default: true,
    },
    fechaCreacion: {
      type: Date,
      default: Date.now, //  fecha por creacion
    },
  },
  { timestamps: true }
);

export default model("preguntas_formularios", PreguntasFormulariosSchema);
