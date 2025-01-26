import { Schema, model } from "mongoose";

const VehiculosSchema = new Schema({
  idUsuario: {
    //Usuario Asignado
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    require: true,
  },
  ownerId: {
    //Dueno
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    require: true,
  },
  claseVehiculo: {
    type: Schema.Types.ObjectId,
    ref: "clase_vehiculos",
    require: true,
  },
  tipoVehiculo: {
    type: Schema.Types.ObjectId,
    ref: "tipo_vehiculos",
    require: true,
  },
  zona: {
    type: Schema.Types.ObjectId,
    ref: "zonas",
    require: true,
  },
  servicio: {
    type: String,
    enum: ["Publico", "Particular"],
    require: true,
  },
  capacidadVehiculo: {
    //40
    type: Number,
    require: true,
  },
  noChasis: {
    //Numero del chassis
    type: String,
    require: false,
  },
  noMotor: {
    //Numero del Motor
    type: String,
    require: false,
  },
  modeloVehiculo: {
    //año 2030
    type: Number,
    require: true,
  },
  color: {
    type: String,
    require: true,
  },
  fechaMatricula: {
    type: Date,
    require: true,
  },
  placa: {
    type: String,
    require: true,
  },
  VehicleEmpresa: {
    // Si es vehículo de empresa
    type: Boolean,
    required: true,
  },
  estadoVehiculo: {
    //Estado Activo = true Inactivo = 🍕
    type: Boolean,
    require: true,
    default: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now, //  fecha por creacion
}
}, {timestamps: true});

export default model("vehiculos", VehiculosSchema);
