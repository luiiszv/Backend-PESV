import { Schema, model } from "mongoose";

const UsuariosSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, //  correo único
        match: /.+\@.+\..+/ // Validación básica para el formato del correo
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId, // Relación con la colección "roles"
        ref: "Rol", // Nombre del modelo relacionado
        required: false
    },
    creationDate: {
        type: Date,
        default: Date.now //  fecha por defecto 
    },
    active: {
        type: Boolean,
        default: true // Estado activo por defecto
    }
});

// Exporta el modelo de usuario
export default model("usuarios", UsuariosSchema);
