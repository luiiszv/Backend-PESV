import express from "express";
import { config } from "dotenv";
import swaggerUi from "swagger-ui-express";

//Routes
import authRoutes from "./Auth/index.js";
import PESVRoutes from "./PESV/index.js";

//spects swagger
import specs from "../swagger/swagger.js";

config();
const app = express();

app.use(express.json());

//SwaggerDocs
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(specs));

app.use('/auth', authRoutes); 
app.use('/pesv', PESVRoutes);


app.set("port", process.env.PORT || 4000);

app.use((req, res, next) => {
    res.status(404).json({
      message: "PESV EndPont Not Found",
    });
  });



export default app;