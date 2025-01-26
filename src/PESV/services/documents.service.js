import DocumentsRepository from "../repositories/document.Repository.js";


//Guardar Documento del Usuario
export const saveDocumentUserToDatabase = async (documentData) => {
  try {
    const savedUserDocument = await DocumentsRepository.saveUserDocument(documentData);
    return savedUserDocument;
  } catch (error) {
    throw new Error('Error al guardar el documento en la base de datos');
  }
};

//Guardar Documento del Vehiculo
export const saveDocumentVehiculeToDatabase = async (documentData) => {
    try {
      const savedUserDocument = await DocumentsRepository.saveVehiculeDocument(documentData);
      return savedUserDocument;
    } catch (error) {
      throw new Error('Error al guardar el documento en la base de datos');
    }
  };


