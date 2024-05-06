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

// src/core/useCase/customer/FindById.ts
var FindById_exports = {};
__export(FindById_exports, {
  default: () => Find_CustomerById
});
module.exports = __toCommonJS(FindById_exports);

// src/errors/ErrorsHTTP.ts
var HTTPError = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
};

// src/core/useCase/customer/FindById.ts
var Find_CustomerById = class {
  _customerRepository;
  constructor(customerRepository) {
    this._customerRepository = customerRepository;
  }
  async execute(props) {
    const customerFound = await this._customerRepository.findById(props);
    if (!customerFound) {
      throw new HTTPError(400, "Cliente n\xE3o encontrado!");
    }
    return customerFound;
  }
};
