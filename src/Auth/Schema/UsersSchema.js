import mongoose from "mongoose";
import { z } from "zod";

const registerUserSchema = z.object({
  name: z
    .string({ required_error: "name es required" })
    .min(3, { message: "name must be at least 3 characters" }),
  lastName: z
    .string({ required_error: "lastName is requeried" })
    .min(3, { message: "lastName must be at least 3 characters" }),

  telefono: z
    .string({ required_error: "telefono is reuqired" })
    .min(6, { message: "telefono must be at least 6 characters" }),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "password is required" })
    .min(4, { message: "password must be at least 4 characters" }),
  idRole: z
    .string({ required_error: "idRole es requerido" })
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Id Rol is not valid",
    }),
  idCargo: z
    .string({ required_error: "idCargo es requerido" })
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Id cargo is not valid",
    }),
  numeroDocumento: z
    .string({ required_error: "numeroDocumento is required" })
    .min(7, { message: "numeroDocumento must be at least 7 characters" }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "email is reqired" })
    .email({ message: "invalid Email" }),
  password: z
    .string({ required_error: "password is required" })
    .min(4, { message: "password must be at least 4 characters" }),
});

export { registerUserSchema, loginSchema };
