import { Schema, model } from "mongoose";

const VehiculosSchema = new Schema(
  {
    idUsuario: {
      //Usuario que registra
      type: Schema.Types.ObjectId,
      ref: "usuarios",
      require: true,
    },
    idUsuarioAsignado: {
      type: Schema.Types.ObjectId,
      ref: "usuarios",
      default: null, // Solo se usa si el vehículo es de empresa
    },
    idClaseVehiculo: {
      type: Schema.Types.ObjectId,
      ref: "clase_vehiculos",
      require: true,
    },
    idTipoVehiculo: {
      type: Schema.Types.ObjectId,
      ref: "tipo_vehiculos",
      require: true,
    },
    idZona: {
      type: Schema.Types.ObjectId,
      ref: "zonas",
      require: true,
    },
    marca: {
      //Numero del Motor
      type: String,
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
      required: false,
      default: false,
    },
    vehiculoEnUso: { //estado de uso
      type: Boolean,
      require: false,
      default: false,
    },
    estadoVehiculo: { //estao en caso de que el vehiculo no se usa o se inactive
      type: Boolean,
      require: false,
      default: true,
    },
    fechaCreacion: {
      type: Date,
      default: Date.now, //  fecha por creacion
    },
  },
  { timestamps: true }
);

export default model("vehiculos", VehiculosSchema);