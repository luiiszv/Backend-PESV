import RoleRepository from "../Auth/repositories/role.repository.js";

export const authAdminMiddleware = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "No se encontró el usuario en la solicitud",
      });
    }

    const { roleId } = req.user;
   
    const constantIdAdminPesv = "679195b408226e1ef20d8193";
    const constantSuperIdAdmin = "679195b408226e1ef20d8192";


    // ✅ 
    if (roleId === constantIdAdminPesv || roleId === constantSuperIdAdmin) {
      return next(); 
    }

    // ⛔ 
    return res.status(403).json({
      success: false,
      message: "El usuario no tiene permisos para esta acción",
    });

  } catch (error) {
    console.error("Error en el middleware de autenticación de administrador:", error);
    res.status(500).json({
      success: false,
      error: "Error interno en el middleware de autenticación de administrador",
    });
  }
};
