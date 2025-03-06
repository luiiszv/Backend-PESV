import mongoose from "mongoose";
import { z } from "zod";

const isValid = (value) => mongoose.Types.ObjectId.isValid(value);

// Esquema de validación para el formulario preoperacional
const registerFormularioPreOperacionalSchema = z.object({
  formularioId: z
    .string({ required_error: "El ID del formulario es requerido." })
    .refine(isValid, { message: "El ID del formulario no es válido." }),

  idVehiculo: z
    .string({ required_error: "El ID del vehiculo es requerido." })
    .refine(isValid, { message: "El ID del vehiculo no es válido." }),

  respuestas: z
    .array(
      z.object({
        idPregunta: z
          .string()
          .optional() // Ahora el ID de la pregunta es opcional
          .refine((value) => !value || isValid(value), {
            message: "El ID de la pregunta no es válido.",
          }),

        respuesta: z.boolean().optional(), // También permitimos que la respuesta sea opcional
      })
    )
    .optional(), // Permite que el campo respuestas no esté presente en el JSON

  fechaRespuesta: z.date().optional(), // Opcional, ya que Mongoose asignará una por defecto
});

export { registerFormularioPreOperacionalSchema };
