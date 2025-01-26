import { Schema, model } from "mongoose";

const notificacionesSchema = new Schema({
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    require: true,
  },
  idFormulario: {
    type: Schema.Types.ObjectId,
    ref: "formularios",
    require: true,
  },
  
});

export default model("notificaciones", notificacionesSchema);
