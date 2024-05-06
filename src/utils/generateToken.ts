import jwt from "jsonwebtoken";

export function generateAccessToken(id: any, role?: any) {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("Access token failed");
  }

  if (typeof id !== "string") {
    throw new Error("O id deve ser uma string");
  }

  return jwt.sign({ paramsId: id, role }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "7d",
    subject: id,
  });
}

export function generateRefreshToken(sub: any) {
  if (!process.env.JWT_ACCESS_SECRET) throw new Error("Refresh token failed");
  return jwt.sign({ customerId: sub }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "7d",
    subject: sub,
  });
}
