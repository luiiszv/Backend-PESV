import { z } from "zod";
import mongoose from "mongoose";

const isValid = (value) => mongoose.Types.ObjectId.isValid(value);

export const regiterUserVehiculosSchema = z.object({
  idClaseVehiculo: z
    .string({ required_error: "idClaseVehiculo es requerido" })
    .refine(isValid, {
      message: "idClaseVehiculo es invalido",
    }),

  idTipoVehiculo: z
    .string({ required_error: "idTipoVehiculo es requerido" })
    .refine(isValid, {
      message: "idTipoVehiculo es invalido",
    }),

  idZona: z.string({ required_error: "idZona es requerido" }).refine(isValid, {
    message: "idUsuario es invalido",
  }),
  marca: z
    .string({ required_error: "marca es requerida" })
    .min(2, { message: "Marca debe tener al menos 2 caracteres" }),

  servicio: z.enum(["Publico", "Particular"], {
    error_map: () => "Servicio debe ser 'Publico' o 'Particular'",
  }),

  capacidadVehiculo: z.number({
    required_error: "Capacidad del vehículo es requerida",
  }),

  modeloVehiculo: z
    .number({
      required_error: "Modelo del vehículo es requerido",
    })
    .int()
    .gte(1000, { message: "El modelo debe ser de al menos 4 dígitos" })
    .lte(9999, { message: "El modelo debe ser de máximo 4 dígitos" }),

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
    .min(6, { message: "La placa debe tener al menos 6 caracteres" }),
});

export const regiterAdminVehiculosSchema = z.object({
  idUsuarioAsignado: z.string().refine(isValid, {
    message: "idUsuarioAsignado no es invalido",
  }),
  idClaseVehiculo: z
    .string({ required_error: "idClaseVehiculo es requerido" })
    .refine(isValid, {
      message: "idClaseVehiculo es invalido",
    }),

  idTipoVehiculo: z
    .string({ required_error: "idTipoVehiculo es requerido" })
    .refine(isValid, {
      message: "idTipoVehiculo es invalido",
    }),

  idZona: z.string({ required_error: "idZona es requerido" }).refine(isValid, {
    message: "idUsuario es invalido",
  }),
  marca: z
    .string({ required_error: "marca es requerida" })
    .min(2, { message: "Marca debe tener al menos 2 caracteres" }),

  servicio: z.enum(["Publico", "Particular"], {
    error_map: () => "Servicio debe ser 'Publico' o 'Particular'",
  }),

  capacidadVehiculo: z.number({
    required_error: "Capacidad del vehículo es requerida",
  }),

  modeloVehiculo: z
    .number({
      required_error: "Modelo del vehículo es requerido",
    })
    .int()
    .gte(1000, { message: "El modelo debe ser de al menos 4 dígitos" })
    .lte(9999, { message: "El modelo debe ser de máximo 4 dígitos" }),

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
    .min(6, { message: "La placa debe tener al menos 6 caracteres" }),
});
