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

// src/infra/repositoriesInDB/service/Service_RepositoryInDB.ts
var Service_RepositoryInDB_exports = {};
__export(Service_RepositoryInDB_exports, {
  default: () => Service_RepositoryInDB
});
module.exports = __toCommonJS(Service_RepositoryInDB_exports);
var import_client = require("@prisma/client");

// src/adapters/Service_Adapter.ts
var Service_Adapter = class {
  static async adapt({
    serviceName,
    serviceDescription,
    servicePrice
  }) {
    return {
      name: serviceName,
      description: serviceDescription,
      price: parseFloat(servicePrice.replace(",", "."))
    };
  }
};

// src/infra/repositoriesInDB/service/Service_RepositoryInDB.ts
var prisma = new import_client.PrismaClient();
var Service_RepositoryInDB = class {
  async getAll() {
    const servicesList = await prisma.service.findMany();
    if (servicesList) {
      return servicesList.map((service) => ({
        serviceId: service.service_id,
        serviceName: service.name,
        serviceDescription: service.description,
        servicePrice: service.price
      }));
    }
  }
  async update(props) {
    const adapterData = await Service_Adapter.adapt(props);
    await prisma.service.update({
      where: { service_id: props.serviceId },
      data: adapterData
    });
  }
  async find(id) {
    const serviceFound = await prisma.service.findUnique({
      where: { service_id: id }
    });
    if (serviceFound) {
      return {
        serviceId: serviceFound.service_id,
        serviceName: serviceFound.name,
        serviceDescription: serviceFound.description,
        servicePrice: serviceFound.price.toString()
      };
    }
  }
  async delete(id) {
    await prisma.service.delete({ where: { service_id: id } });
  }
  async save(props) {
    const adapterData = await Service_Adapter.adapt(props);
    await prisma.service.create({ data: adapterData });
  }
};
