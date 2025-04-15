import { Schema, model } from "mongoose";



const FormDesplazamientosSchema = new Schema({
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    required: true,
  },

  puntoInicio: {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    coordenadas: {
      latitud: { type: Number, required: false }, // Opcional pero estructurado
      longitud: { type: Number, required: false }
    }
  },

  puntoDestino: {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    coordenadas: {
      latitud: { type: Number, required: false }, // Opcional pero estructurado
      longitud: { type: Number, required: false }
    }
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
    require: true
  }

});

export default model("form_desplazamientos", FormDesplazamientosSchema);
