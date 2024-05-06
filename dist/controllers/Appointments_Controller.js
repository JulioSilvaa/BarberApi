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

// src/controllers/Appointments_Controller.ts
var Appointments_Controller_exports = {};
__export(Appointments_Controller_exports, {
  default: () => Appointments_Controller
});
module.exports = __toCommonJS(Appointments_Controller_exports);

// src/errors/ErrorsHTTP.ts
var HTTPError = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
};

// src/core/useCase/Appointments/Create.ts
var Create_Appointments = class {
  _appointmentsRepository;
  constructor(appointmentsRepository) {
    this._appointmentsRepository = appointmentsRepository;
  }
  async execute(props, loginId) {
    if (!loginId) {
      throw new HTTPError(401, "Usu\xE1rio precisa estar autenticado");
    }
    await this._appointmentsRepository.save({ ...props, customerId: loginId });
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

// src/core/useCase/Appointments/Get.ts
var GetAll_Appointments = class {
  _appointmentsRepository;
  constructor(appointmentsRepository) {
    this._appointmentsRepository = appointmentsRepository;
  }
  async execute() {
    const appointmentsList = await this._appointmentsRepository.get();
    if (appointmentsList.length === 0) {
      throw new HTTPError(204, "Lista de agendamentos est\xE1 vazia!");
    }
    return appointmentsList;
  }
};

// src/infra/repositoriesInDB/appointments/Appointments_RepositoryDB.ts
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

// src/controllers/Appointments_Controller.ts
var Appointments_Controller = class {
  static async save(req, res, next) {
    try {
      const loginId = req.customer_id;
      const appointmentsDB = new Appointments_RepositoryDB();
      const createAppointmentData = new Create_Appointments(appointmentsDB);
      await createAppointmentData.execute(req.body, loginId);
      res.status(201).json({ message: "Agendamento realizado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const appointmentsDB = new Appointments_RepositoryDB();
      const sendDeleteAppointmentsData = new Delete_Appointment(appointmentsDB);
      await sendDeleteAppointmentsData.execute(req.params.id, req.customer_id);
      res.status(200).json({ message: "Agendamento exclu\xEDdo com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async get(req, res, next) {
    try {
      const appointmentsDB = new Appointments_RepositoryDB();
      const getAllAppointmentsData = new GetAll_Appointments(appointmentsDB);
      const appointmentsList = await getAllAppointmentsData.execute();
      res.status(200).json({ appointments: appointmentsList });
    } catch (error) {
      next(error);
    }
  }
  static async find(req, res, next) {
    try {
      const appointmentsDB = new Appointments_RepositoryDB();
      const findAppointmentsData = new Find_AppointmentsById(appointmentsDB);
      const findAppointmentResult = await findAppointmentsData.execute(
        req.customer_id,
        req.params.id
      );
      res.status(200).json({ appointmentsOfCustomer: findAppointmentResult });
    } catch (error) {
      next(error);
    }
  }
};
