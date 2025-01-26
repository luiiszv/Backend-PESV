import { Schema, model } from "mongoose";

const NotificacionSchema = new Schema({
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    required: true,
  },
  tipoNotificacion: {
    type: String,
    enum: [
      "Formulario No Completado",
      "Vencimiento de Documentación",
      "Desplazamiento Finalizado",
      "Mensaje Personalizado",
    ],
    required: true,
  },
  detalle: {
    type: String, // Detalle adicional de la notificación
    require: true,
  },
  fechaNotificacion: {
    type: Date,
    default: Date.now,
  },
  enviadoA: {
    type: String,
    enum: ["Usuario", "Administrador"], // Define si va al usuario, al admin o ambos
    required: true,
  },
  leido: {
    type: Boolean,
    default: false, // Para marcar si la notificación fue vista
  },
});

NotificacionSchema.index({ idUsuario: 1, leida: 1 });

export default model("notificaciones", NotificacionSchema);
