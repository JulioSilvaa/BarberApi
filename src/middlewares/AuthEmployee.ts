import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
  sub: string;
  role: string;
}

class AuthEmployeeMiddleware {
  auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token de acesso não fornecido" });
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      return res.status(401).json({ message: "Token de acesso não fornecido" });
    }

    try {
      if (!process.env.JWT_ACCESS_SECRET) {
        throw new Error("Chave secreta de acesso não definida");
      }

      const { sub, role } = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET
      ) as IPayload;

      req.employee_id = sub;
      req.employee_role = role;

      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Token de acesso inválido ou expirado" });
    }
  }
}

export default new AuthEmployeeMiddleware();
