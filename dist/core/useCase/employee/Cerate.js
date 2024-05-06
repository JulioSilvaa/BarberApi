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

// src/core/useCase/employee/Cerate.ts
var Cerate_exports = {};
__export(Cerate_exports, {
  default: () => Create_Employee
});
module.exports = __toCommonJS(Cerate_exports);
var import_bcrypt = __toESM(require("bcrypt"));

// src/errors/ErrorsHTTP.ts
var HTTPError = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
};

// src/core/useCase/employee/Cerate.ts
var Create_Employee = class {
  _employeeRepository;
  constructor(employeeRepository) {
    this._employeeRepository = employeeRepository;
  }
  async execute(props) {
    if (!props.employeeName || !props.employeePassword || !props.employeeRole || !props.employeeEmail) {
      throw new HTTPError(400, "Favor preencher todos os campos!");
    }
    const numberOfSalt = 14;
    const passwordHash = await import_bcrypt.default.hash(props.employeePassword, numberOfSalt);
    await this._employeeRepository.add({ ...props, employeePassword: passwordHash });
  }
};
