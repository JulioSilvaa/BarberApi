"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/middlewares/AuthEmployee.ts
var AuthEmployee_exports = {};
__export(AuthEmployee_exports, {
  default: () => AuthEmployee_default
});
module.exports = __toCommonJS(AuthEmployee_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var AuthEmployeeMiddleware = class {
  auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token de acesso n\xE3o fornecido" });
    }
    const [, token] = authHeader.split(" ");
    if (!token) {
      return res.status(401).json({ message: "Token de acesso n\xE3o fornecido" });
    }
    try {
      if (!process.env.JWT_ACCESS_SECRET) {
        throw new Error("Chave secreta de acesso n\xE3o definida");
      }
      const { sub, role } = import_jsonwebtoken.default.verify(
        token,
        process.env.JWT_ACCESS_SECRET
      );
      req.employee_id = sub;
      req.employee_role = role;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token de acesso inv\xE1lido ou expirado" });
    }
  }
};
var AuthEmployee_default = new AuthEmployeeMiddleware();
