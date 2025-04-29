import { z } from "zod";
import mongoose from "mongoose";

const isValid = (value) => mongoose.Types.ObjectId.isValid(value);

export const regiterUserVehiculosSchema = z.object({
  idClaseVehiculo: z
    .string({ required_error: "idClaseVehiculo es requerido" })
    .refine(isValid, {
      message: "idClaseVehiculo es invalido",
    }),

  idActividadVehiculo: z
    .string({ required_error: "idActividadVehiculo es requerido" })
    .refine(isValid, {
      message: "idActividadVehiculo es invalido",
    }),

  idZona: z.string({ required_error: "idZona es requerido" }).refine(isValid, {
    message: "idUsuario es invalido",
  }),
  marca: z
    .string({ required_error: "marca es requerida" })
    .min(2, { message: "Marca debe tener al menos 2 caracteres" }),



  servicio: z.enum(["Publico", "Particular"], {
    errorMap: () => ({ message: "Servicio debe ser 'Publico' o 'Particular'" }),
  }).optional(),

  capacidadVehiculo: z.number({
    required_error: "Capacidad del vehículo es requerida",
  }),

  modeloVehiculo: z
    .string({
      required_error: "Modelo del vehículo es requerido",
    })
    
  ,

  color: z.string({ required_error: "Color es requerido" }),

  fechaMatricula: z
    .string({ required_error: "Fecha de matrícula es requerida" })
    .refine(
      (date) => {
        const fecha = new Date(date); // Convertir la cadena a un objeto Date
        return fecha <= new Date(); // Comparar si la fecha no es futura
      },
      {
        message: "Fecha de matrícula no puede ser futura",
      }
    ),

  placa: z
    .string({ required_error: "Placa es requerida" })
    .min(5, { message: "La placa debe tener al menos 5 caracteres" }).optional(),
});

export const regiterAdminVehiculosSchema = z.object({
  idClaseVehiculo: z
    .string({ required_error: "idClaseVehiculo es requerido" })
    .refine(isValid, {
      message: "idClaseVehiculo es invalido",
    }),

  idActividadVehiculo: z
    .string({ required_error: "idActividadVehiculo es requerido" })
    .refine(isValid, {
      message: "idActividadVehiculo es invalido",
    }),

  idZona: z.string({ required_error: "idZona es requerido" }).refine(isValid, {
    message: "idUsuario es invalido",
  }),
  marca: z
    .string({ required_error: "marca es requerida" })
    .min(2, { message: "Marca debe tener al menos 2 caracteres" }),

  servicio:
    z.enum(["Publico", "Particular", ""], {
      errorMap: () => ({ message: "Servicio debe ser 'Publico' o 'Particular'" }),
    }).optional(),


  capacidadVehiculo: z.number({
    required_error: "Capacidad del vehículo es requerida",
  }),

  modeloVehiculo: z.string({
    required_error: "Modelo del vehículo es requerido",
  }),

  fechaMatricula: z
    .string({ required_error: "Fecha de matrícula es requerida" }).optional(),

  placa:
    z.string({ required_error: "Placa es requerida" }).optional()



});
