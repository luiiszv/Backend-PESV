import { Schema, model } from "mongoose";

const rolsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Cada rol debe ser único
  },
  description: {
    type: String,
    required: false, // Opcional, para describir el propósito del rol
  }
});

// Exporta el modelo de rol
export default model("roles", rolsSchema);
