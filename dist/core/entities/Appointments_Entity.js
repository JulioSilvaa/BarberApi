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

// src/core/entities/Appointments_Entity.ts
var Appointments_Entity_exports = {};
__export(Appointments_Entity_exports, {
  default: () => Appointments_Entity
});
module.exports = __toCommonJS(Appointments_Entity_exports);
var Appointments_Entity = class {
  _appointments;
  _appointmentStatusId;
  _customerId;
  _employeeId;
  _serviceId;
  _dateTime;
  constructor(props) {
    this._appointmentStatusId = props.appointmentStatusId;
    this._customerId = props.customerId;
    this._employeeId = props.employeeId;
    this._serviceId = props.serviceId;
    this._dateTime = props.dateTime;
  }
};
