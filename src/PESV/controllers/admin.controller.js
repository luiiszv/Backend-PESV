

const getAllUsersBy = async (req, res) => {
  try {

  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong in getAllUsers", error });
  }
};
