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

// src/core/entities/Customer_Entity.ts
var Customer_Entity_exports = {};
__export(Customer_Entity_exports, {
  default: () => Customer_Entity
});
module.exports = __toCommonJS(Customer_Entity_exports);
var Customer_Entity = class {
  _customerId;
  _customerName;
  _customerPhone;
  _customerEmail;
  _customerPassword;
  _customerCreatedAt;
  constructor(props) {
    this._customerId = props.customerId;
    this._customerName = props.customerName;
    this._customerPhone = props.customerPhone;
    this._customerEmail = props.customerEmail;
    this._customerPassword = props.customerPassword;
    this._customerCreatedAt = props.customerCreatedAt;
  }
};
