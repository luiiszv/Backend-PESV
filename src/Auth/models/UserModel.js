import { Schema, model } from "mongoose";

const UsuariosSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, //  correo único
      match: /.+\@.+\..+/, // Validación básica para el formato del correo
    },
    tipoIdentificacion: {
      type: Schema.Types.ObjectId,
      ref: "tipo_identificacion",
      required: true,
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
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, //  fecha por defecto
    },
    vehiculos: {
      type: Schema.Types.ObjectId,
      ref: "vehiclos",
      require: false,
      default: null
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
