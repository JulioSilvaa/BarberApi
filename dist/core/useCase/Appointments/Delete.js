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

// src/core/useCase/Appointments/Delete.ts
var Delete_exports = {};
__export(Delete_exports, {
  default: () => Delete_Appointment
});
module.exports = __toCommonJS(Delete_exports);

// src/errors/ErrorsHTTP.ts
var HTTPError = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
};

// src/core/useCase/Appointments/Delete.ts
var Delete_Appointment = class {
  _appointmentsRepository;
  constructor(appointmentsRepository) {
    this._appointmentsRepository = appointmentsRepository;
  }
  async execute(appointmentId, loginId) {
    if (!loginId) {
      throw new HTTPError(401, "Usu\xE1rio precisa estar autenticado");
    }
    const appointment = await this._appointmentsRepository.find(appointmentId);
    if (!appointment) {
      throw new HTTPError(400, "Agendamento n\xE3o encontrado.");
    }
    if (loginId !== appointment.customerId) {
      throw new HTTPError(401, "N\xE3o autorizado.");
    }
    await this._appointmentsRepository.delete(appointmentId, loginId);
  }
};
