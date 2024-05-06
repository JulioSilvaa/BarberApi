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

// src/core/entities/Service.ts
var Service_exports = {};
__export(Service_exports, {
  default: () => Services
});
module.exports = __toCommonJS(Service_exports);
var Services = class {
  _serviceId;
  _serviceName;
  _serviceDescription;
  _servicePrice;
  constructor(props) {
    this._serviceId = props.serviceId;
    this._serviceName = props.serviceName;
    this._serviceDescription = props.serviceDescription;
    this._servicePrice = props.servicePrice;
  }
};
