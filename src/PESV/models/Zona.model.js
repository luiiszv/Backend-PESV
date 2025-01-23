
import { Schema, model } from "mongoose";
const ZonaSchema = new Schema({
    nombreZona: { type: String, required: true },
    codeZona: { type: String },
});

export default model("zonas", ZonaSchema);