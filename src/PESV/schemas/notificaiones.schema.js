import { z } from "zod";

// Esquema de validación con Zod para Notificaciones
const registerUserNotificacionesSchema = z.object({
  tipoNotificacion: z.enum(
    [
      "formulario_preoperacional",
      "vencimiento_documentacion",
      "desplazamiento_finalizado",
      "mensaje_admin",
      "mensaje_usuario",
      "recordatorio",
    ],
    { required_error: "El tipo de notificación es requerido" }
  ),
  detalle: z
    .string({ required_error: "El detalle de la notificación es requerido" })
    .min(5, { message: "El detalle debe tener al menos 5 caracteres" }),

  leida: z.boolean().default(false),
});

export { registerUserNotificacionesSchema };
