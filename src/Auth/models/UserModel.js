import { Schema, model } from "mongoose";

const UsuariosSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true, //  correo único
      match: /.+\@.+\..+/, // Validación básica para el formato del correo
    },
    numeroDocumento: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "rol",
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, //  fecha por defecto
    },
    tipoLicencia: {
      type: String,
      enum: ["A1", "A2", "B1", "B2", "C1", "C2", "C3"],
      require: true,
    },
    active: {
      type: Boolean,
      default: true, // Estado activo por defecto
    },
  },
  { timestamps: true }
);



// Exporta el modelo de usuario
export default model("usuarios", UsuariosSchema);
