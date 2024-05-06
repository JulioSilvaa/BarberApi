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

// src/core/useCase/services/Delete.ts
var Delete_exports = {};
__export(Delete_exports, {
  default: () => Delete_Service
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

// src/core/useCase/services/Delete.ts
var Delete_Service = class {
  _serviceRepository;
  constructor(serviceRepository) {
    this._serviceRepository = serviceRepository;
  }
  async execute(id, credential) {
    const serviceFound = await this._serviceRepository.find(id);
    if (!serviceFound) {
      throw new HTTPError(400, "Servi\xE7o n\xE3o encontrado!");
    }
    if (credential !== "admin" && credential !== "gerente") {
      throw new HTTPError(403, "Apenas administradores podem remover servi\xE7os.");
    }
    await this._serviceRepository.delete(id);
  }
};
