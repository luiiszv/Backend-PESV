import { Schema, model } from "mongoose";

const FormulariosSchema = new Schema(
    {
        nombreFormulario: {
            type: String, //Para Inactivarla en caso de que no se use mas
            require: true,
        },
        preguntas: [
            {
                type: Schema.Types.ObjectId,
                ref: "preguntas_formularios",
                default: null,
            },
        ],
        idClaseVehiculo: [
            {
                type: Schema.Types.ObjectId,
                ref: "clase_vehiculos",
                required: true,
            }
        ],
        estadoFormulario: {
            type: Boolean, //Para Inactivarla en caso de que no se use mas
            require: true,
            default: true,
        },

    },
    { timestamps: true }
);

export default model("formularios", FormulariosSchema);
