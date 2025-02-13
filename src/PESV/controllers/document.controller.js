import { json } from "express";
import {
  saveDocumentUserToDatabase,
  saveDocumentVehiculeToDatabase,
} from "../services/documents.service.js";

export const getAllDocuments = async (req, res) => {
  try {
    res.status(200).json({ message: "Ok" })

  } catch (error) {
    res.status(500).json("Something was wrong in getAllDocuments");
  }

}

export const uploadUserDocument = async (req, res) => {
  try {

    const infoDocs = req.uploadedFiles;
    if (infoDocs.lenght < 1) {
      return res.status(400).json({ message: 'Error upload' })
    }

    console.log(infoDocs); 
    res.status(200).send({
      message: "Registro exitoso",
      data: response
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const uploadVehiculeDocument = async (req, res) => {
  try {

    const infoDocs = req.uploadedFiles;
    if (infoDocs.lenght < 1) {
      return res.status(400).json({ message: 'Error upload' })
    }

    const response = await saveDocumentVehiculeToDatabase(infoDocs);
 
    res.status(200).send({
      message: "Registro exitoso",
      data: response
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};




