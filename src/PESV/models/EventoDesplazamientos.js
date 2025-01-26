const EventoDesplazamientoSchema = new Schema(
  {
    idFormulario: {
      type: Schema.Types.ObjectId,
      ref: "form_desplazamientos",
      required: true,
    },

    tipoEvento: {
      type: String,
      enum: [
        "Tráfico", // Congestión o alto flujo vehicular.
        "Restaurante", // Parada en un lugar para comer.
        "Punto Crítico", // Zona peligrosa (ejemplo: curvas pronunciadas, derrumbes).
        "Parada en Finca", // Detención en una finca.
        "Parqueadero", // Parada en un estacionamiento.
        "Sitio de Descanso", // Parada en un área de descanso.
        "Curvas Peligrosas", // Identificación de una curva peligrosa.
        "Zona de Alta Accidentalidad", // Zona con alta frecuencia de accidentes.
        "Zona de Derrumbe", // Zona propensa a derrumbes.
        "Pendiente Pronunciada", // Vías con inclinación considerable.
        "Vías en Mal Estado", // Identificación de tramos en malas condiciones.
        "Ruta Bloqueada/Restringida", // Registro de una ruta bloqueada o con acceso limitado.
        "Punto Crítico de Seguridad", // Zona insegura por actividades ilícitas o presencia de grupos al margen de la ley.
      ],
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
    
  },
  { timestamps: true }
);

export default model("eventos_desplazamientos", EventoDesplazamientoSchema);
