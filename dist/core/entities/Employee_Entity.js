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

// src/core/entities/Employee_Entity.ts
var Employee_Entity_exports = {};
__export(Employee_Entity_exports, {
  default: () => Employee_Entity
});
module.exports = __toCommonJS(Employee_Entity_exports);
var Employee_Entity = class {
  _employeeId;
  _employeeName;
  _employeeRole;
  _employeeEmail;
  _employeePassword;
  constructor(props) {
    this._employeeId = props.employeeId;
    this._employeeName = props.employeeName;
    this._employeeEmail = props.employeeEmail;
    this._employeeRole = props.employeeRole;
    this._employeePassword = props.employeePassword;
  }
};
