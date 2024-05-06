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

// src/core/useCase/employee/Auth.ts
var Auth_exports = {};
__export(Auth_exports, {
  default: () => AuthEmployee
});
module.exports = __toCommonJS(Auth_exports);
var import_bcrypt = __toESM(require("bcrypt"));

// src/utils/generateToken.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
function generateAccessToken(id, role) {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("Access token failed");
  }
  if (typeof id !== "string") {
    throw new Error("O id deve ser uma string");
  }
  return import_jsonwebtoken.default.sign({ paramsId: id, role }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "7d",
    subject: id
  });
}

// src/errors/ErrorsHTTP.ts
var HTTPError = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
};

// src/core/useCase/employee/Auth.ts
var AuthEmployee = class {
  _employeeRepository;
  constructor(employeeRepository) {
    this._employeeRepository = employeeRepository;
  }
  async execute(email, password) {
    try {
      const employeeFound = await this._employeeRepository.findByEmail(email);
      if (!employeeFound) {
        throw new HTTPError(401, "Usu\xE1rio ou senha incorreto");
      }
      const passwordIsValid = await import_bcrypt.default.compare(
        password,
        employeeFound.employeePassword
      );
      if (!passwordIsValid) {
        throw new HTTPError(401, "Usu\xE1rio ou senha incorreto");
      }
      const AuthenticatedEmployee = {
        id: employeeFound.employeeId,
        name: employeeFound.employeeName,
        email: employeeFound.employeeEmail,
        role: employeeFound.employeeRole
      };
      const token = generateAccessToken(
        AuthenticatedEmployee.id,
        AuthenticatedEmployee.role
      );
      return {
        ...AuthenticatedEmployee,
        token
      };
    } catch (error) {
      throw new HTTPError(401, "Usu\xE1rio ou senha incorreto");
    }
  }
};
