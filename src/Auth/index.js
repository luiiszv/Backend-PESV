import { Router } from "express";
import userRoutes from "./routes/user.routes.js";

const routerAuth = Router();

routerAuth.use('/users', userRoutes);
// routerAuth.use('/users', (req, res) => {
//     res.send('hola');
// });


export default routerAuth;



