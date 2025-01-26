import { Schema, model } from "mongoose";

const HistroiaslAsignacion = new Schema(
  {
    vehiculoId: {
      type: Schema.Types.ObjectId,
      ref: "vehiculos",
      required: true,
    },
    usuarioAnteriorId: {
      type: Schema.Types.ObjectId,
      ref: "usuarios",
      default: null,
    },
    nuevoUsuarioId: {
      type: Schema.Types.ObjectId,
      ref: "usuarios",
      required: true,
    },
    asignadoPor: {
      type: Schema.Types.ObjectId,
      ref: "usuarios",
      required: true,
    },
    asignadoEn: { type: Date, default: Date.now }, // Fecha de asignación
  },
  { timestamps: true }
);

export default model("historial_asignacion_vehiculos", HistroiaslAsignacion);
