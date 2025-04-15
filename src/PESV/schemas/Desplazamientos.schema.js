import { z } from "zod";

// Esquema para coordenadas (opcional)
const CoordenadasSchema = z.object({
    latitud: z.number(),
    longitud: z.number()
}).optional();

// Esquema principal de validación
const registerDesplazamientos = z.object({


    puntoInicio: z.object({
        nombre: z.string({ required_error: "El nombre del punto de inicio es requerido" }),
        coordenadas: CoordenadasSchema
    }),

    puntoDestino: z.object({
        nombre: z.string({ required_error: "El nombre del punto de destino es requerido" }),
        coordenadas: CoordenadasSchema
    }),

    fechaInicio: z.coerce.date().optional().default(new Date()),


    estadoDesplazamiento: z.enum(["En Curso", "Completado", "Pendiente"])
        .default("En Curso")
});

export { registerDesplazamientos };