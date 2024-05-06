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

// src/adapters/Appointments_Adapter.ts
var Appointments_Adapter_exports = {};
__export(Appointments_Adapter_exports, {
  default: () => AppointmentsAdapter
});
module.exports = __toCommonJS(Appointments_Adapter_exports);
var AppointmentsAdapter = class {
  static async adapt({
    appointmentStatusId,
    customerId,
    dateTime,
    employeeId,
    serviceId
  }) {
    return {
      customer_id: customerId,
      date_and_time: dateTime,
      employee_id: employeeId,
      service_id: serviceId,
      appointment_status_id: appointmentStatusId
    };
  }
};
