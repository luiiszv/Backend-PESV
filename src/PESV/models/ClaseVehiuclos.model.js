import { Schema, model } from "mongoose";


const ClaseVehiculoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    requierePlaca: {
        type: Boolean,
        required: true,
        default: true
    }
});

export default model('clase_vehiculos', ClaseVehiculoSchema);