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

// src/adapters/Employee_Adapter.ts
var Employee_Adapter_exports = {};
__export(Employee_Adapter_exports, {
  default: () => Employee_Adapter
});
module.exports = __toCommonJS(Employee_Adapter_exports);
var Employee_Adapter = class {
  static async adapt({
    employeeId,
    employeeName,
    employeeRole,
    employeePassword,
    employeeEmail
  }) {
    return {
      employee_id: employeeId,
      name: employeeName,
      password: employeePassword,
      role: employeeRole,
      email: employeeEmail
    };
  }
};
