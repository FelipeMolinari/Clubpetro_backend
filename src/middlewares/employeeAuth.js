import jwt from "jsonwebtoken";
import auth from "../config/authConfigToken";
import { promisify } from "util";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }
  const [, token] = authHeader.split(" ");
  try {
    const decoded = await promisify(jwt.verify)(token, auth.secretKey);
    req.employeeCpf = decoded.cpfFormated;
    return next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};
