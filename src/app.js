import express from "express";
import { config } from "dotenv";

//Routes
import authRoutes from "./Auth/index.js";
import PESVRoutes from "./PESV/index.js";

config();
const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/pesv', PESVRoutes);


app.set("port", process.env.PORT || 4000);



export default app;