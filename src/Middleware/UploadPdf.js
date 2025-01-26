import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';

const personalStorage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: `usuarios/${req.body.idUsuario}/documentos/`,
    resource_type: 'raw',
  }),
});

const vehicleStorage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: `usuarios/${req.body.idUsuario}/vehiculos/${req.body.idVehiculo}/`,
    resource_type: 'raw',
  }),
});

export const uploadMiddleware = (req, res, next) => { //Agregar Validaciones mi bro
  const { tipoDocumentoId } = req.body; //Desestrucure no esta completo

  if (tipoDocumentoId == 'Persona') {
    return multer({ storage: personalStorage }).single('file')(req, res, next);  //Retoirna la url
  } else if (tipoDocumentoId == 'Vehiculo') {
    return multer({ storage: vehicleStorage }).single('file')(req, res, next);
  }

  return res.status(400).send({ error: 'Tipo de documento no válido' });
};


