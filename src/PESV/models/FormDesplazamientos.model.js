import { Schema, model } from "mongoose";

const FormDesplazamientosSchema = new Schema({
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    required: true,
  },
 
  puntoInicio: {
    nombre: { type: String, required: true },
    coordenadas: { type: CoordenadasSchema, required: false } // opcional
  },

  puntoDestino: {
    nombre: { type: String, required: true },
    coordenadas: { type: CoordenadasSchema, required: false } // opcional
  },

  fechaInicio: {
    type: Date,
    default: Date.now,
  },
  fechaFin: {
    type: Date,
  },

  estadoDesplazamiento: {
    type: String,
    enum: ["En Curso", "Completado", "Pendiente"],
    default: "En Curso",
  },



});

export default model("form_desplazamientos", FormDesplazamientosSchema);
