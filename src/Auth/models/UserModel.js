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
    idCargo: {
      type: Schema.Types.ObjectId,
      ref: "cargos",
      require: false,
    },
    fechaNacimiento: {
      type: Date,
      require: false,
      default: null,
    },
    telefono: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true, //  correo único
      match: /.+\@.+\..+/, // Validación básica para el formato del correo
      require: true
    },
    numeroDocumento: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    idRole: {
      type: Schema.Types.ObjectId,
      ref: "roles",
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, //  fecha por defecto
    },
    tipoLicencia: {
      type: String,
      enum: ["A1", "A2", "B1", "B2", "C1", "C2", "C3", "N/A"],
      require: false,
      default: "N/A",
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
