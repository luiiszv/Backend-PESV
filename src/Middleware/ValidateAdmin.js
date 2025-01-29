
export const authAdminMiddleware = (req, res, next) => {
    try {
  
      console.log(req.user);
      next();
  
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Error interno en el middleware de autenticaciónAdministrador",
      });
    }
  };