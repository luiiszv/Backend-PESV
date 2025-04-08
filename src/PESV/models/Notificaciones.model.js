import { Schema, model } from "mongoose";

const NotificacionSchema = new Schema({
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    required: true,
    index: true,
  },
  tipoNotificacion: {
    type: String,
    enum: [
      "formulario_preoperacional",
      "formulario_en_revision",
      "formulario_no_aplica",
      "vencimiento_documentacion",
      "documento_proximo_vencer",
      "desplazamiento_finalizado",
      "info",
      "warning",
      "error",
    ],
    required: true,
  },
  detalle: {
    type: String,
    required: true,
  },
  fechaNotificacion: {
    type: Date,
    default: Date.now,
  },

  fechaExpiracion: {
    type: Date,
    index: { expires: "7d" },
  },

  enviadoA: {
    type: [String],
    enum: ["usuario", "administrador"], // Permite múltiples destinatarios
    default: "usuario",
  },
  leida: {
    type: Boolean,
    default: false,
  },
});

// Índice para optimizar consultas de notificaciones no leídas por usuario
NotificacionSchema.index({ idUsuario: 1, leida: 1 });

export default model("notificaciones", NotificacionSchema);
