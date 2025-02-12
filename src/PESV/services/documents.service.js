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
    const savedDocuments = await Promise.all(
      documentData.map(async (doc) => {
        try {
          const response = await DocumentsRepository.saveVehiculeDocument(doc);

          if (response?.affectedRows > 0) {
            return { success: true, message: "Documento guardado correctamente", doc };
          } else {
            return { success: false, message: "No se pudo guardar el documento", doc };
          }
        } catch (error) {
          console.error(`Error al guardar el documento ${doc.tipoDocumentoId}:`, error);
          return { success: false, message: "Error al guardar el documento", doc, error: error.message };
        }
      })
    );

    return savedDocuments;
  } catch (error) {
    console.error("Error general al guardar los documentos:", error);
    throw new Error("Error general al guardar los documentos en la base de datos");
  }
};


