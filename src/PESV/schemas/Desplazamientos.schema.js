import { z } from "zod";

// Esquema para coordenadas (opcional pero con validación estricta si existen)
const CoordenadasSchema = z.object({
    latitud: z.number({
        required_error: "La latitud es requerida si se proporcionan coordenadas",
        invalid_type_error: "La latitud debe ser un número"
    }).min(-90, { message: "La latitud no puede ser menor a -90" })
        .max(90, { message: "La latitud no puede ser mayor a 90" }),

    longitud: z.number({
        required_error: "La longitud es requerida si se proporcionan coordenadas",
        invalid_type_error: "La longitud debe ser un número"
    }).min(-180, { message: "La longitud no puede ser menor a -180" })
        .max(180, { message: "La longitud no puede ser mayor a 180" })
}).strict("No se permiten campos adicionales en coordenadas")
    .optional();

// Esquema principal
const registerDesplazamientos = z.object({
    puntoInicio: z.object({
        nombre: z.string({
            required_error: "El nombre del punto de inicio es obligatorio",
            invalid_type_error: "El nombre debe ser un texto"
        }).trim()
            .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
            .max(100, { message: "El nombre no puede exceder 100 caracteres" }),

        coordenadas: CoordenadasSchema
    }, {
        required_error: "El punto de inicio es obligatorio",
        invalid_type_error: "Estructura incorrecta para punto de inicio"
    }),

    puntoDestino: z.object({
        nombre: z.string({
            required_error: "El nombre del punto de destino es obligatorio",
            invalid_type_error: "El nombre debe ser un texto"
        }).trim()
            .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
            .max(100, { message: "El nombre no puede exceder 100 caracteres" }),

        coordenadas: CoordenadasSchema
    }, {
        required_error: "El punto de destino es obligatorio",
        invalid_type_error: "Estructura incorrecta para punto de destino"
    }),

    fechaInicio: z.coerce.date({
        required_error: "La fecha de inicio es requerida",
        invalid_type_error: "Formato de fecha inválido"
    }).min(new Date(2000, 0, 1), {
        message: "La fecha no puede ser anterior al año 2000"
    }).optional()
        .default(new Date()),

    estadoDesplazamiento: z.enum(["En Curso", "Completado", "Pendiente"], {
        required_error: "El estado es requerido",
        invalid_type_error: "Estado no válido"
    }).default("En Curso")
})

export { registerDesplazamientos };