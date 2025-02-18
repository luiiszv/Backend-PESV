import jwt from "jsonwebtoken";

export const validateToken = (token) => {
  try {
    const secret = process.env.SECRET_KEY;
    if (!secret) {
      throw new Error("No hay secreto en .env");
    }
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
  } catch (error) {
    return false;
  }
};

export const authMiddleware = (req, res, next) => {
  try {
    // const authorization =
    //   req.headers.authorization || req.headers["cookie"]?.split("=")[1];

    const authorization = req.headers.authorization?.split(' ')[1];

    if (!authorization) {
      res.status(401).json({ success: false, error: "Token no proporcionado" });
      return;
    }


    const validation = validateToken(authorization);

    if (!validation) {
      res.status(401).json({ success: false, message: "Access Denied" });
      return;
    }
    req.user = validation;
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error interno en el middleware de autenticación",
    });
  }
};




