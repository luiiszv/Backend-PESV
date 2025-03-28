import { Schema, model } from "mongoose";

const FormPreoperacionalSchema = new Schema({
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    require: true,
  },

  idVehiculo: {
    type: Schema.Types.ObjectId,
    ref: "vehiculos",
    require: true,
  },
  formularioId: {
    type: Schema.Types.ObjectId,
    ref: "formularios",
    require: true,
  },
  respuestas: [
    {
      idPregunta: {
        type: Schema.Types.ObjectId,
        ref: "preguntas_formularios",
        required: false,
      },
      respuesta: {
        type: Boolean,
        required: true,
      },
    },
  ],
  estadoFormulario: {
    type: String,
    enum: [
      "completado",
      "completado_con_errores",
      "no_aplica",
      "no_contestado",
    ],
    required: true,
  },
  fechaRespuesta: {
    type: Date,
    default: Date.now, //  fecha por defecto
  },
});

export default model("form_preoperacionales", FormPreoperacionalSchema);
