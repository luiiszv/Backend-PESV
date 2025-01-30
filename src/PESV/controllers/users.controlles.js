import { userProfile } from "../services/users.service.js";

export const getProfile = async (req, res) => {
    try {
        const { userId } = req.user;
        const response = await userProfile(userId);
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something went wrong in getProfile", error });

    }

}
