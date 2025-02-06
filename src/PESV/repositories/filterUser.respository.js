import UserModel from "../../Auth/models/UserModel.js";

const findUsersByNameCCFilter = async (searchTerm) => {
  // Buscar usuarios por nombre o número de cédula con el término de búsqueda
  const users = await UserModel.find({
    $or: [
      { name: { $regex: `^${searchTerm}`, $options: "i" } }, // Busca por nombre
      { numeroDocumento: { $regex: `^${searchTerm}`, $options: "i" } }, // Busca por número de cédula
    ],
  }).limit(10); // Limita los resultados a 10

  return users; // Devuelve los resultados encontrados
};

export default {
  findUsersByNameCCFilter,
};
