import jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {
    const secret = process.env.SECRET_KEY;
    if (!secret) {
        throw new Error("JWT secret is not defined in environment variables");
    }
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn: "1d" }, (err, token) => {
            if (err) return reject(err);
            resolve(token);
        });
    });
};
