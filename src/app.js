import express from "express";
import { config } from "dotenv";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";

//Fun
import { initPreoperacionalCron } from "./PESV/jobs/preoperacionalCron.js";

//Routes
import authRoutes from "./Auth/index.js";
import PESVRoutes from "./PESV/index.js";

//spects swagger
import specs from "../swagger/swagger.js";

config();
const app = express();

app.use(express.json());

app.use(morgan("dev"));

const allowedOrigins = [
  "http://localhost:5173",
  "https://front-end-pesv.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//SwaggerDocs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(
  fileUpload({
    useTempFiles: true, // IMPORTANTE para trabajar con archivos temporales
    tempFileDir: "/tmp/", // Carpeta temporal donde guarda los archivos
  })
);





app.use("/auth", authRoutes);
app.use("/pesv", PESVRoutes);

app.set("port", process.env.PORT || 4000);

app.use("*", (req, res, next) => {
  res.status(404).json({
    message: "PESV EndPont Not Found",
  });
});

export default app;
