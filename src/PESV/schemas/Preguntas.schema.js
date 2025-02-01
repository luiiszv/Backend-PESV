import mongoose from "mongoose";
import { z } from "zod";


const isValid = (value) => mongoose.Types.ObjectId.isValid(value);

const regiterPreguntasSchema = z.object({
    calseVehiculo: z.string({required_error: "claseVehiculo es requerido"}).refine(isValid, { message: 'Id Vehiculo no es valido' }),
    preguntaTexto: z.string({required_error: "pregunta es requerida"}).min(4, { message: 'La pregunta debe tener al menos 4 caracteres' }),
    determinancia: z.boolean({required_error: "determinancia es requerida"})
})

export { regiterPreguntasSchema };