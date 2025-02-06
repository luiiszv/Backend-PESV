import { findUsersByNameCCFilter } from "../services/filterUser.service.js";

export const filterUserByName = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const response = await findUsersByNameCCFilter(searchTerm);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong in filterUserByName", error });
  }
};
