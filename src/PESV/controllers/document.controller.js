import { json } from "express";
import {
  saveDocumentUserToDatabase,
  saveManyDocumentVehiculeToDatabase,
  saveVehiculeDocument,
  saveUserDocument,
  findDocsPorExpirar,
  updateDocsByVehicule,
  updateDocsByUser,
  findUserDocById,
  findVehicleDocById,
} from "../services/documents.service.js";

export const getAllDocuments = async (req, res) => {
  try {
    res.status(200).json({ message: "Ok" });
  } catch (error) {
    res.status(500).json("Something was wrong in getAllDocuments");
  }
};

export const uploadUserDocument = async (req, res) => {
  try {
    const infoDocs = req.uploadedFiles;
    if (infoDocs.lenght < 1) {
      return res.status(400).json({ message: "Error upload" });
    }

    console.log("controllers", infoDocs);
    const response = await saveDocumentUserToDatabase(infoDocs);
    res.status(200).send({
      message: "Registro exitoso 🚙",
      data: response,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const uploadManyVehiculeDocument = async (req, res) => {
  try {
    const infoDocs = req.uploadedFiles;
    if (infoDocs.lenght < 1) {
      return res.status(400).json({ message: "Error upload" });
    }
    const response = await saveManyDocumentVehiculeToDatabase(infoDocs);

    res.status(200).send({
      message: "Registro exitoso",
      data: response,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const uploadOneVehiculeDocuemnt = async (req, res) => {
  try {
    const infoDocs = req.uploadedFiles;
    console.log(infoDocs);
    const response = await saveVehiculeDocument(infoDocs);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

export const uploadOneUserDocuemnt = async (req, res) => {
  try {
    const infoDocs = req.uploadedFiles;
    const response = await saveUserDocument(infoDocs);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

export const getDocumetosPorExpirar = async (req, res) => {
  try {
    const response = await findDocsPorExpirar();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateVehicleDocuemnt = async (req, res) => {
  try {
    const response = await updateDocsByVehicule(
      req.params.id,
      req.body,
      req.files
    );
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateUserDocuemnt = async (req, res) => {
  try {
    const response = await updateDocsByUser(req.params.id, req.body, req.files);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getUserDocumentById = async (req, res) => {
  try {
    const response = await findUserDocById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getVehicleDocumentById = async (req, res) => {
  try {
    const response = await findVehicleDocById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

