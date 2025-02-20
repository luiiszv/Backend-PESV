import { z } from "zod";

// Esquema de validación con Zod para Notificaciones
const registerNotificacionesSchema = z.object({
  idUsuario: z.string({ required_error: "El ID del usuario es requerido" }),

  tipoNotificacion: z.enum(
    [
      "formulario_con_errores",
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
  enviadoA: z
    .array(z.enum(["usuario", "administrador"]))
    .min(1, { message: "Debe especificar al menos un destinatario" }),
  leida: z.boolean().default(false),
});

export { registerNotificacionesSchema };
