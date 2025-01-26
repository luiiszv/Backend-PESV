import { Schema, model } from "mongoose";


const FormPreoperacionalSchema = new Schema({
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        require: true
    },
    tipoFormulario: {
        type: String,
        enum: ["Pre-operacional", "Desplazamientos"],
        required: true,
    },
    claseVehiculo: {
        type: Schema.Types.ObjectId,
        ref: "clase_vehiculos",
        required: true,
    },
    respuestas: [
        {
            idPregunta: {
                type: Schema.Types.ObjectId,
                ref: "preguntas_formularios",
                required: true,
            },
            respuesta: {
                type: String,
                required: true,
            }
        },
    ],
    fechaRespuesta: {
        type: Date,
        default: Date.now, //  fecha por defecto
    },
    estadoForm: {
        type: String, // Cambiado a String para soportar el enum
        enum: ["Completado", "Completado con Errores"],
        default: "Completado",
    },


})

export default model('form_preoperacionales', FormPreoperacionalSchema);