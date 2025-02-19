import { Schema, model } from "mongoose";

const FormulariosSchema = new Schema(
    {
        nombreFormulario: {
            type: String,
            require: true,
        },
        preguntas: [
            {
                type: Schema.Types.ObjectId,
                ref: "preguntas_formularios",
            },
        ],
        idClaseVehiculo: {
            type: Schema.Types.ObjectId,
            ref: "clase_vehiculos",
            required: true,
        },
        version: {
            type: Number,
            required: true
        },
        estadoFormulario: {
            type: Boolean,
            require: true,
            default: true,
        },

    },
    { timestamps: true }
);

export default model("formularios", FormulariosSchema);
