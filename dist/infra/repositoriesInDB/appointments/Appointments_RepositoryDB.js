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

// src/infra/repositoriesInDB/appointments/Appointments_RepositoryDB.ts
var Appointments_RepositoryDB_exports = {};
__export(Appointments_RepositoryDB_exports, {
  default: () => Appointments_RepositoryDB
});
module.exports = __toCommonJS(Appointments_RepositoryDB_exports);
var import_client = require("@prisma/client");

// src/adapters/Appointments_Adapter.ts
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

// src/infra/repositoriesInDB/appointments/Appointments_RepositoryDB.ts
var prisma = new import_client.PrismaClient();
var Appointments_RepositoryDB = class {
  async find(loginId) {
    const listAppointmentOfCustomer = await prisma.appointment.findMany({
      where: { customer_id: loginId },
      select: {
        date_and_time: true,
        employee: {
          select: { name: true }
        },
        customer: { select: { name: true, email: true, phone: true } },
        service: { select: { name: true, description: true, price: true } },
        appointment_status: { select: { status_name: true } }
      }
    });
    return listAppointmentOfCustomer.map((appointment) => ({
      customer: {
        name: appointment.customer.name,
        email: appointment.customer.email,
        phone: appointment.customer.phone
      },
      service: {
        name: appointment.service.name,
        description: appointment.service.description,
        price: appointment.service.price
      },
      appointment: {
        employee: appointment.employee.name,
        dataTime: appointment.date_and_time,
        status: appointment.appointment_status.status_name
      }
    }));
  }
  async get() {
    const appointmentsList = await prisma.appointment.findMany({
      select: {
        date_and_time: true,
        employee: {
          select: { name: true }
        },
        customer: { select: { name: true, email: true, phone: true } },
        service: { select: { name: true, description: true, price: true } },
        appointment_status: { select: { status_name: true } }
      }
    });
    return appointmentsList.map((appointment) => ({
      customer: {
        name: appointment.customer.name,
        email: appointment.customer.email,
        phone: appointment.customer.phone
      },
      service: {
        name: appointment.service.name,
        description: appointment.service.description,
        price: appointment.service.price
      },
      appointment: {
        employee: appointment.employee.name,
        dataTime: appointment.date_and_time,
        status: appointment.appointment_status.status_name
      }
    }));
  }
  async delete(appointmentId, loginId) {
    await prisma.appointment.delete({
      where: { appointment_id: appointmentId, customer_id: loginId }
    });
  }
  async save(props) {
    const adapterData = await AppointmentsAdapter.adapt(props);
    await prisma.appointment.create({ data: adapterData });
  }
};
