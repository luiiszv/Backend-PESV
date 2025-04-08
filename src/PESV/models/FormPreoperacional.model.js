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
      "operativo",  //Cuando lo reponde correctamene
      "en_revision", // No esta correcto, lo completo con errores
      "no_aplica", //Por algun motivo el usuario tiene la opcion de marcar como no aplica
      "no_reporta", // No lo contesto
      "revisado_corregido", // En caso de que se reponda mal pero lo reviso un admin y lo corrigio para que este operativo
    ],
    required: true,
  },
  fechaRespuesta: {
    type: Date,
    default: Date.now, //  fecha por defecto
  },
});

export default model("form_preoperacionales", FormPreoperacionalSchema);
