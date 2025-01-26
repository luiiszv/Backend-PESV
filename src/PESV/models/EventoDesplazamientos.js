const EventoDesplazamientoSchema = new Schema({
  idFormulario: {
    type: Schema.Types.ObjectId,
    ref: "form_desplazamientos",
    required: true,
  },

  tipoEvento: {
    type: String,
    enum: ["Tráfico", "Restaurante", "Punto Crítico", "Otro"],
    required: true,
  },
  ubicacion: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  descripcion: {
    type: String, // Detalles opcionales sobre el evento
  },
  tiempoInicio: {
    type: Date, // Fecha y hora del inicio del evento
  },
  tiempoFin: {
    type: Date, // Fecha y hora del fin del evento
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default model("eventos_desplazamientos", EventoDesplazamientoSchema);
