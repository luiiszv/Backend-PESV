import { Schema, model } from "mongoose";

const FormDesplazamientosSchema = new Schema({
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    required: true,
  },
  respuestas: [
    {
      idPregunta: {
        type: Schema.Types.ObjectId,
        ref: "preguntas_formularios",
        required: true,
      },
      respuesta: {
        type: String,
        required: true,
      },
    },
  ],
  estadoDesplazamiento: {
    type: String,
    enum: ["En Curso", "Completado", "Pendiente"],
    default: "En Curso",
  },
  fechaInicio: {
    type: Date,
    default: Date.now,
  },
  fechaFin: {
    type: Date,
  },
  rutaPrincipal: {
    type: {
      origen: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      destino: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      waypoints: [
        //PuntosIntermedio
        {
          lat: { type: Number },
          lng: { type: Number },
        },
      ],
    },
    required: true,
  },
  rutaAlterna: {
    type: {
      origen: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      destino: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      waypoints: [
        //Puntos opcionales por ejemplo puntos intemedios
        {
          lat: { type: Number },
          lng: { type: Number },
        },
      ],
    },
  },
  paradas: [
    {
      lugar: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      descripcion: { type: String }, // Por ejemplo, "Restaurante"
      hora: { type: String },
    },
  ],
});

export default model("form_desplazamientos", FormDesplazamientosSchema);
