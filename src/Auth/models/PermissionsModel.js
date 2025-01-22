import { Schema, model } from "mongoose";

const PermisosSchema = new Schema({
    _id_rol: {
        type: Schema.Types.ObjectId,
        ref: 'rol',
        require,
    },
    canRead: { type: Boolean, default: false },
    canWrite: { type: Boolean, default: false },
    canEdit: { type: Boolean, default: false },
    canDelete: { type: Boolean, default: false },
});

export default model("permisos", PermisosSchema);
