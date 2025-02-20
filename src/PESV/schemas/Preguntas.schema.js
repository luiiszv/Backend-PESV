
import { z } from "zod";


const regiterPreguntasSchema = z.array(
    z.object({
      preguntaTexto: z.string({ required_error: "La pregunta es requerida" })
        .min(4, { message: "La pregunta debe tener al menos 4 caracteres" }),
      determinancia: z.boolean({ required_error: "La determinancia es requerida" })
    })
  );

export { regiterPreguntasSchema };