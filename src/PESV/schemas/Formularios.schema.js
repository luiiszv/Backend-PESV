import mongoose from "mongoose";
import { z } from "zod";

const isValid = (value) => mongoose.Types.ObjectId.isValid(value);
//Este formulario es el general
const regiterFormualarioSchema = z.object({
  nombreFormulario: z.string({
    required_error: "El nombre del formulario es requerido.",
  }),
  idClaseVehiculo: z
    .string({
      required_error: "El idClaseVehiculo es requerido.",
    })
    .refine(isValid, { message: "El idClaseVehiculo no es válido." }),
  preguntas: z
    .array(
      z
        .string({
          required_error: "El ID de la pregunta es requerido.",
          invalid_type_error: "Cada pregunta debe ser un string válido.",
        })
        .refine(isValid, {
          message: "El ID de la pregunta no es válido.",
        })
    )
    .min(1, { message: "Debe haber al menos una pregunta." }),
});

export { regiterFormualarioSchema };
