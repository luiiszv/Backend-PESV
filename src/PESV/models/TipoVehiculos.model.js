import { Schema, model } from "mongoose";


const TipoVehiculoSchema = new Schema({
    nombreTipo: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: false
    }
})

export default model('tipo_vehiculos', TipoVehiculoSchema);