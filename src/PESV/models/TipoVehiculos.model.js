import { Schema, model } from "mongoose";

//Actividad del vehiuculo 
const ActividadVehiculoSchema = new Schema({
    nombreTipo: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: false
    }
})

export default model('actividad_vehiculos', ActividadVehiculoSchema);