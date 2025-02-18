import UserModel from "../../Auth/models/UserModel.js";
import CargoModel from "../models/Cargos.model.js";


const getAllUsers = async () => {
  return await UserModel.find().populate("idCargo").select('-password');
};

const findUsersPagination = async (lastId, limit) => {
  const query = lastId ? { _id: { $gt: lastId } } : {}; //$gt mayor que / grather than
  return await UserModel.find(query)
    .sort({ _id: 1 })
    .limit(limit)
    .lean()
    .populate({ path: "idCargo", select: "-description" });
};


const findUsersWithFilterPagination = async (searchTerm, lastId, limit) => {
  const query = {
    $and: [
      searchTerm ? {
        $or: [
          { name: { $regex: `^${searchTerm}`, $options: "i" } }, // Filtro por nombre
          { numeroDocumento: { $regex: `^${searchTerm}`, $options: "i" } }, // Filtro por cédula
        ]
      } : {}, // Si hay término de búsqueda, aplicar el filtro de nombre o cédula


    ]
  };

  // Si hay un `lastId` (para paginación), lo usamos en la consulta
  if (lastId) {
    query._id = { $gt: lastId }; // Paginar usando el ID mayor que el último cargado
  }

  // Consulta con filtro y paginación
  const users = await UserModel.find(query)
    .sort({ _id: 1 }) // Ordenar por ID de forma ascendente
    .limit(limit) // Limitar los resultados a la cantidad especificada
    .lean()
    .populate({ path: "idCargo", select: "-description" }); // Relacionar el campo idCargo si es necesario

  return users;
};


const findTotalUsers = async () => {
  return await UserModel.countDocuments();
};

const getUserById = async (id_user) => {
  return await UserModel.findById(id_user).populate({
    path: "idCargo",
  });
};

const UpdateUser = async (user_data) => {
  return await UserModel.updateOne(
    { _id: user_data._id },
    { $set: user_data },
    { runValidators: true }
  );
};

const findTipoLicenciaEnum = async () => {
  return UserModel.schema.path("tipoLicencia").enumValues.map(value => ({
    _id: value,
    name: value,
  }));

}

const getDocumentsByIdUser = async (id_vehiculo) => {
  return DocumentosVehiculoModel.find({ idVehiculo: id_vehiculo }).populate({
    path: 'tipoDocumentoId',
    select: '-categoria -descripcion'

  })
}


export default {
  getAllUsers,
  getUserById,
  UpdateUser,
  findUsersPagination,
  findTotalUsers,
  findUsersWithFilterPagination,
  findTipoLicenciaEnum
};
