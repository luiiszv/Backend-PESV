import { Schema, model } from "mongoose";

const PermisosSchema = new Schema({
    id_rol: {
        type: Schema.Types.ObjectId,
        ref: 'roles',
        require,
    },
    canRead: { type: Boolean, default: true },
    canWrite: { type: Boolean, default: true },
    canEdit: { type: Boolean, default: true },
    canDelete: { type: Boolean, default: true },
});

export default model("permisos", PermisosSchema);
