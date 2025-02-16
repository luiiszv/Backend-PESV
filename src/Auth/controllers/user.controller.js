import {
  getUser,
  insertUser,
  findUsers,
  loginUser,
  VerifyAuthUser,
  findUserById,
  updateUser,
} from "../services/user.service.js";

export const registerUsers = async ({ body }, res) => {
  try {
    const user = await insertUser(body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong in registerUsers", error });
  }
};

export const getUserDetail = async ({ body }, res) => {
  try {
    const user = await getUser(body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong in getUserDetail", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id_user = req.params.id;
    const response = await findUserById(id_user);
    res.status(200).json(response);
  } catch (error) {}
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await findUsers();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong in getAllUsers", error });
  }
};

export const login = async ({ body }, res) => {
  try {
    const response = await loginUser(body.email, body.password);

    if (response.success) {
      res.cookie("token", response.token, {
        httpOnly: true,
        secure: true,
      });

      return res.status(200).json(response);
    }

    return res.status(401).json(response);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong in login", error });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const authorization = req.headers.authorization || req.headers["cookie"];
    if (!authorization)
      return res.status(401).json({ message: "Token not Provided" });

    const response = await VerifyAuthUser(authorization);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong in verifyToken", error });
  }
};

export const editUser = async (req, res) => {
  try {
    const response = await updateUser(req.params.id, req.body);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong in editUser", error });
  }
};
