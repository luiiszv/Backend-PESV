import userRespository from "../repositories/user.respository.js";


export const userProfile = async (id_user) => {
    const profileUser = await userRespository.getUserById(id_user);
    if (!profileUser) {
        return {
            success: false,
            message: 'Perfil no encontrado'
        }
    }
    return {
        success: true,
        data: profileUser
    }
}

//Encontrar las preguntas realcionadas al usuario
export const findPreguntasByUserVehiculesActive = async (user) => {

    if (!user) {
        return {
            success: false,
            message: "User not found "
        }
    }




}