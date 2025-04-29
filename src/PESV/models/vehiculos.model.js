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

    claseUnidad: {
      type: String,
      enum: ["Vehiculo", "Equipo"],  //Equipo es maquinaria
      default: "Vehiculo",
      required: true
    },

    idClaseVehiculo: {
      type: Schema.Types.ObjectId,
      ref: "clase_vehiculos",
      require: true,
    },
    idActividadVehiculo: {
      type: Schema.Types.ObjectId,
      ref: "actividad_vehiculos",
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
      required: false,
    },


    capacidadVehiculo: {
      //40
      type: Number,
      require: false,
    },

    numero_equipo: {
      //40
      type: String,
      require: false,
    },

    codigo: {
      //40
      type: String,
      require: false,
    },

    modeloVehiculo: {
      //año 2030 || D39EX-22 modelo de un equipo (maquinaria)
      type: String,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    fechaMatricula: {
      type: Date,
      required: false,

    },
    placa: {
      type: String,
      required: false,

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