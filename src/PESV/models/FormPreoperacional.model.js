import { Schema, model } from "mongoose";


const FormPreoperacionalSchema = new Schema({
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        require: true
    },
    formularioId: {
        type: Schema.Types.ObjectId,
        ref: 'formularios',
        require: true
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
    }

})

export default model('form_preoperacionales', FormPreoperacionalSchema);