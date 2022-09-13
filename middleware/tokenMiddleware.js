import jwt from "jsonwebtoken";

export const createToken = (email, id) => {
  const token = jwt.sign({ email, id }, process.env.JWT_SECRETE);
  return token;
};
