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

// src/infra/repositoriesInDB/employee/Employee_RepositoryDB.ts
var Employee_RepositoryDB_exports = {};
__export(Employee_RepositoryDB_exports, {
  default: () => Employee_RepositoryDB
});
module.exports = __toCommonJS(Employee_RepositoryDB_exports);
var import_client = require("@prisma/client");

// src/adapters/Employee_Adapter.ts
var Employee_Adapter = class {
  static async adapt({
    employeeId,
    employeeName,
    employeeRole,
    employeePassword,
    employeeEmail
  }) {
    return {
      employee_id: employeeId,
      name: employeeName,
      password: employeePassword,
      role: employeeRole,
      email: employeeEmail
    };
  }
};

// src/infra/repositoriesInDB/employee/Employee_RepositoryDB.ts
var prisma = new import_client.PrismaClient();
var Employee_RepositoryDB = class {
  async delete(props) {
    await prisma.employee.delete({ where: { employee_id: props.idLogin } });
  }
  async findByEmail(email) {
    const employeeFound = await prisma.employee.findFirst({ where: { email } });
    if (employeeFound) {
      return {
        employeeId: employeeFound.employee_id,
        employeeName: employeeFound.name,
        employeeEmail: employeeFound.email,
        employeePassword: employeeFound.password,
        employeeRole: employeeFound.role
      };
    }
  }
  async get() {
    const employeeList = await prisma.employee.findMany();
    return employeeList.map((employee) => ({
      employeeId: employee.employee_id,
      employeeName: employee.name,
      employeeEmail: employee.email,
      employeeRole: employee.role
    }));
  }
  async find(employeeId) {
    const employeeFound = await prisma.employee.findUnique({
      where: { employee_id: employeeId }
    });
    if (employeeFound) {
      return {
        employeeId: employeeFound.employee_id,
        employeeName: employeeFound.name,
        employeeFoundEmail: employeeFound.email,
        employeeRole: employeeFound.role
      };
    }
  }
  async update(props) {
    const adaptedData = await Employee_Adapter.adapt(props);
    await prisma.employee.update({
      where: { employee_id: props.employeeId },
      data: adaptedData
    });
  }
  async add(props) {
    const adaptedData = await Employee_Adapter.adapt(props);
    await prisma.employee.create({ data: adaptedData });
  }
};
