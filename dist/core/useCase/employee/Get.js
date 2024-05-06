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

// src/core/useCase/employee/Get.ts
var Get_exports = {};
__export(Get_exports, {
  default: () => GetAll_Employee
});
module.exports = __toCommonJS(Get_exports);

// src/errors/ErrorsHTTP.ts
var HTTPError = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
};

// src/core/useCase/employee/Get.ts
var GetAll_Employee = class {
  _employeeRepository;
  constructor(employeeRepository) {
    this._employeeRepository = employeeRepository;
  }
  async execute() {
    const employeeList = await this._employeeRepository.get();
    if (employeeList.length === 0) {
      throw new HTTPError(204, "Lista de Funcion\xE1rios vazia!");
    }
    return employeeList;
  }
};
