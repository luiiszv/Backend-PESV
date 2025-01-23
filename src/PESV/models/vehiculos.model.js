import { Schema, model } from "mongoose";


const VehiculosSchema = new Schema({
    claseVehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'clase_vehiculos',
        require: true
    },
    tipoVehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'tipo_vehiculos',
        require: true
    },
    zona: {
        type: Schema.Types.ObjectId,
        ref: 'zonas',
        require: true
    },
    servicio: {
        type: String,
        enum: ['Publico', 'Particular'],
        require: true,

    },
    placa: {
        type: String,
        require: true,
    },
    estadoVehiculo: {
        type: Boolean,
        default: true
    }

})

export default model('vehiculos', VehiculosSchema)