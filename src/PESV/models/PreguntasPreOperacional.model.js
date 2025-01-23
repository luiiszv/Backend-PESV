import { Schema, model } from "mongoose";

const FormPreguntasPreOperacionalSchema = new Schema({
    calseVehiculo: {
        type: Schema.Types.ObjectId,
        ref: "clase_vehiculos",
        required: true,
    },
    preguntaTexto: {
        type: String,
        require: true,
    },
    determinancia: {
        type: Boolean,
        require: true

    },
    estado_pregunta: {
        type: Boolean, //Para Inactivarla en caso de que no se use mas
        require: true,
        default: true

    },
    fecha: {
        type: Date,
        default: Date.now, //  fecha por creacion
    }

});

export default model("form_preguntas_pre_operacioanal", FormPreguntasPreOperacionalSchema);
