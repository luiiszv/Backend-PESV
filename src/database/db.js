import { connect,connections } from "mongoose";

export const connectDb = async () => {
    try {
      const mongoUrl = process.env.MONGODB_URL;
      if (!mongoUrl) {
        throw new Error("La URL de MongoDB no está definida en el archivo .env");
      }
      await connect(mongoUrl);
      console.log("Connected to database");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
