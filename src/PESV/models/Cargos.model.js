import { Schema, model } from "mongoose";

const CargosSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

export default model("cargos", CargosSchema);
