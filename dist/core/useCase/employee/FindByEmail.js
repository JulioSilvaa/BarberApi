"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core/useCase/employee/FindByEmail.ts
var FindByEmail_exports = {};
__export(FindByEmail_exports, {
  default: () => Find_EmployeeByEmail
});
module.exports = __toCommonJS(FindByEmail_exports);

// src/errors/ErrorsHTTP.ts
var HTTPError = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
};

// src/core/useCase/employee/FindByEmail.ts
var Find_EmployeeByEmail = class {
  _employeeRepository;
  constructor(employeeRepository) {
    this._employeeRepository = employeeRepository;
  }
  async execute(email) {
    const employeeFound = await this._employeeRepository.findByEmail(email);
    if (employeeFound) {
      throw new HTTPError(209, "Email j\xE1 cadastrado");
    }
    return employeeFound;
  }
};
