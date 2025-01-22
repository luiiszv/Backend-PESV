import { Shema, model } from "mongoose";



const TipoDocumentoUsuarioSchema = new Shema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: false
    }

})

export default model('tipo_documento_usuario', TipoDocumentoUsuarioSchema);