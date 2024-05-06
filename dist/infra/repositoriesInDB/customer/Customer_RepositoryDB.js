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

// src/infra/repositoriesInDB/customer/Customer_RepositoryDB.ts
var Customer_RepositoryDB_exports = {};
__export(Customer_RepositoryDB_exports, {
  default: () => Customer_RepositoryDB
});
module.exports = __toCommonJS(Customer_RepositoryDB_exports);
var import_client = require("@prisma/client");

// src/adapters/Customer_Adapter.ts
var Customer_Adapter = class {
  static async adapt({
    customerId,
    customerName,
    customerEmail,
    customerPhone,
    customerPassword,
    customerCreatedAt
  }) {
    return {
      customer_id: customerId,
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      password: customerPassword,
      createdAt: customerCreatedAt
    };
  }
};

// src/infra/repositoriesInDB/customer/Customer_RepositoryDB.ts
var prisma = new import_client.PrismaClient();
var Customer_RepositoryDB = class {
  async update(props) {
    const adaptedData = await Customer_Adapter.adapt(props);
    await prisma.customer.update({
      where: { customer_id: props.customerId },
      data: adaptedData
    });
  }
  async getAll() {
    const customerList = await prisma.customer.findMany({
      orderBy: { createdAt: "desc" }
    });
    return customerList.map((customer) => ({
      customerId: customer.customer_id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerCreatedAt: customer.createdAt
    }));
  }
  async delete(props) {
    await prisma.customer.delete({ where: { customer_id: props.loggedInId } });
  }
  async add(props) {
    const adaptedData = await Customer_Adapter.adapt(props);
    await prisma.customer.create({ data: adaptedData });
  }
  async findById(customerId) {
    const customerFound = await prisma.customer.findUnique({
      where: { customer_id: customerId }
    });
    if (customerFound) {
      return {
        customerId: customerFound.customer_id,
        customerName: customerFound.name,
        customerEmail: customerFound.email,
        customerCreatedAt: customerFound.createdAt
      };
    }
  }
  async findByEmail(customerEmail) {
    const customerFound = await prisma.customer.findFirst({
      where: { email: customerEmail }
    });
    if (customerFound) {
      return {
        customerId: customerFound.customer_id,
        customerName: customerFound.name,
        customerEmail: customerFound.email,
        customerPhone: customerFound.phone,
        customerPassword: customerFound.password,
        customerCreatedAt: customerFound.createdAt
      };
    }
  }
};
