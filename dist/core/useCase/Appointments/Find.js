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

// src/core/useCase/Appointments/Find.ts
var Find_exports = {};
__export(Find_exports, {
  default: () => Find_AppointmentsById
});
module.exports = __toCommonJS(Find_exports);

// src/errors/ErrorsHTTP.ts
var HTTPError = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
};

// src/core/useCase/Appointments/Find.ts
var Find_AppointmentsById = class {
  _appointmentsRepository;
  constructor(appointmentsRepository) {
    this._appointmentsRepository = appointmentsRepository;
  }
  async execute(loginId, customerId) {
    if (loginId !== customerId) {
      throw new HTTPError(401, "Usu\xE1rio n\xE3o autenticado.");
    }
    const appointmentsOfCustomer = await this._appointmentsRepository.find(
      loginId
    );
    if (!appointmentsOfCustomer) {
      throw new HTTPError(201, "Usu\xE1rio sem agendamentos realizados.");
    }
    return appointmentsOfCustomer;
  }
};
