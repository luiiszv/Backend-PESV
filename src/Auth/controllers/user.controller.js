import {
  getUser,
  insertUser,
  findUsers,
  loginUser,
  VerifyAuthUser
} from "../services/user.service.js";

export const registerUsers = async ({ body }, res) => {

  console.log("hola");
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
    const { success, token } = await loginUser(body.email, body.password);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({ success, token });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong in login", error });
  }
};


export const verifyToken = async (req, res) => {

  try {
    const authorization = req.headers.authorization || req.headers["cookie"]?.split("=")[1];
    if (!authorization) return res.status(401).json({ message: "Token not Provided" })

    const response = await VerifyAuthUser(authorization);
    res.status(200).json(response);

  } catch (error) {
    res.status(400).json({ message: "Something went wrong in verifyToken", error });
  }
}
