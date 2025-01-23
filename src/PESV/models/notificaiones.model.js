import { Schema, model } from "mongoose";

const notificacionesSchema = new Schema({
  id_usuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    require: true,
  },
  id_formulario: {
    type: Schema.Types.ObjectId,
    ref: "formularios",
    require: true,
  },
});

export default model("notificaciones", notificacionesSchema);
