"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/infra/http/express/Express.ts
var import_express5 = __toESM(require("express"));

// node_modules/express-async-errors/index.js
var Layer = require("express/lib/router/layer");
var Router = require("express/lib/router");
var last = (arr = []) => arr[arr.length - 1];
var noop = Function.prototype;
function copyFnProps(oldFn, newFn) {
  Object.keys(oldFn).forEach((key) => {
    newFn[key] = oldFn[key];
  });
  return newFn;
}
function wrap(fn) {
  const newFn = function newFn2(...args) {
    const ret = fn.apply(this, args);
    const next = (args.length === 5 ? args[2] : last(args)) || noop;
    if (ret && ret.catch)
      ret.catch((err) => next(err));
    return ret;
  };
  Object.defineProperty(newFn, "length", {
    value: fn.length,
    writable: false
  });
  return copyFnProps(fn, newFn);
}
function patchRouterParam() {
  const originalParam = Router.prototype.constructor.param;
  Router.prototype.constructor.param = function param(name, fn) {
    fn = wrap(fn);
    return originalParam.call(this, name, fn);
  };
}
Object.defineProperty(Layer.prototype, "handle", {
  enumerable: true,
  get() {
    return this.__handle;
  },
  set(fn) {
    fn = wrap(fn);
    this.__handle = fn;
  }
});
patchRouterParam();

// src/errors/ErrorsHTTP.ts
var HTTPError = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
};

// src/infra/router/Appointments_Router.ts
var import_express = require("express");

// src/adapters/ExpressAdapter.ts
var ExpressAdapter = class {
  static create(fn) {
    return async function(req, res, next) {
      const obj = await fn(req, res, next);
      try {
        return obj;
      } catch (error) {
        return error;
      }
    };
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

// src/middlewares/AuthCustomer.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var AuthCustomerMiddleware = class {
  auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token de acesso n\xE3o fornecido" });
    }
    const [, token] = authHeader.split(" ");
    if (!token) {
      return res.status(401).json({ message: "Token de acesso n\xE3o fornecido" });
    }
    try {
      if (!process.env.JWT_ACCESS_SECRET) {
        throw new Error("Chave secreta de acesso n\xE3o definida");
      }
      const { sub } = import_jsonwebtoken.default.verify(token, process.env.JWT_ACCESS_SECRET);
      req.customer_id = sub;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token de acesso inv\xE1lido ou expirado" });
    }
  }
};
var AuthCustomer_default = new AuthCustomerMiddleware();

// src/infra/router/Appointments_Router.ts
var router = (0, import_express.Router)();
router.post(
  "/register",
  AuthCustomer_default.auth,
  ExpressAdapter.create(Appointments_Controller.save)
);
router.delete(
  "/:id",
  AuthCustomer_default.auth,
  ExpressAdapter.create(Appointments_Controller.delete)
);
router.get(
  "/:id",
  AuthCustomer_default.auth,
  ExpressAdapter.create(Appointments_Controller.find)
);
router.get("/", ExpressAdapter.create(Appointments_Controller.get));
var Appointments_Router_default = router;

// src/infra/router/Customer_Router.ts
var import_express2 = require("express");

// src/core/useCase/customer/Auth.ts
var import_bcrypt = __toESM(require("bcrypt"));

// src/utils/generateToken.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
function generateAccessToken(id, role) {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("Access token failed");
  }
  if (typeof id !== "string") {
    throw new Error("O id deve ser uma string");
  }
  return import_jsonwebtoken2.default.sign({ paramsId: id, role }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "7d",
    subject: id
  });
}

// src/core/useCase/customer/Auth.ts
var AuthCustomer = class {
  _customerRepository;
  constructor(customerRepository) {
    this._customerRepository = customerRepository;
  }
  async execute(email, password) {
    try {
      const userFound = await this._customerRepository.findByEmail(email);
      if (!userFound) {
        throw new HTTPError(401, "Usu\xE1rio ou senha incorreto");
      }
      const passwordIsValid = await import_bcrypt.default.compare(password, userFound.customerPassword);
      if (!passwordIsValid) {
        throw new HTTPError(401, "Usu\xE1rio ou senha incorreto");
      }
      const AuthenticatedCustomer = {
        id: userFound.customerId,
        name: userFound.customerName,
        phone: userFound.customerPhone,
        email: userFound.customerEmail
      };
      const token = generateAccessToken(AuthenticatedCustomer.id);
      return {
        ...AuthenticatedCustomer,
        token
      };
    } catch (error) {
      throw new HTTPError(401, "Usu\xE1rio ou senha incorreto");
    }
  }
};

// src/core/useCase/customer/Create.ts
var import_bcrypt2 = __toESM(require("bcrypt"));
var Create_Customer = class {
  _customerRepository;
  constructor(customerRepository) {
    this._customerRepository = customerRepository;
  }
  async execute(props) {
    if (!props.customerName || !props.customerEmail || !props.customerPassword) {
      throw new HTTPError(400, "Favor preencher todos os campos!");
    }
    const numberOfSalt = 14;
    const passwordHash = await import_bcrypt2.default.hash(props.customerPassword, numberOfSalt);
    await this._customerRepository.add({ ...props, customerPassword: passwordHash });
  }
};

// src/core/useCase/customer/Delete.ts
var Delete_Customer = class {
  _customerRepository;
  constructor(customerRepository) {
    this._customerRepository = customerRepository;
  }
  async execute(props) {
    if (typeof props.customerId !== "string") {
      throw new HTTPError(400, "Tipo de ID n\xE3o \xE9 string");
      ;
    }
    await this._customerRepository.delete(props);
  }
};

// src/core/useCase/customer/FindByEmail.ts
var Find_CustomerByEmail = class {
  _customerRepository;
  constructor(customerRepository) {
    this._customerRepository = customerRepository;
  }
  async execute(customerEmail) {
    const customerFound = await this._customerRepository.findByEmail(
      customerEmail
    );
    if (customerFound) {
      throw new HTTPError(409, "Email j\xE1 cadastrado");
    }
    return null;
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

// src/core/useCase/customer/Get.ts
var GetAll_Customers = class {
  _customerRepository;
  constructor(customerRepository) {
    this._customerRepository = customerRepository;
  }
  async execute() {
    const customers = await this._customerRepository.getAll();
    if (customers.length === 0) {
      throw new HTTPError(204, "Lista de Clientes est\xE1 vazia");
    }
    return customers;
  }
};

// src/core/useCase/customer/Update.ts
var Update_Customer = class {
  _customerRepository;
  constructor(customerRepository) {
    this._customerRepository = customerRepository;
  }
  async execute(props) {
    if (props.customerId !== props.loggedInId) {
      throw new HTTPError(401, "N\xE3o Autorizado!");
    }
    await this._customerRepository.update(props);
  }
};

// src/infra/repositoriesInDB/customer/Customer_RepositoryDB.ts
var import_client2 = require("@prisma/client");

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
var prisma2 = new import_client2.PrismaClient();
var Customer_RepositoryDB = class {
  async update(props) {
    const adaptedData = await Customer_Adapter.adapt(props);
    await prisma2.customer.update({
      where: { customer_id: props.customerId },
      data: adaptedData
    });
  }
  async getAll() {
    const customerList = await prisma2.customer.findMany({
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
    await prisma2.customer.delete({ where: { customer_id: props.loggedInId } });
  }
  async add(props) {
    const adaptedData = await Customer_Adapter.adapt(props);
    await prisma2.customer.create({ data: adaptedData });
  }
  async findById(customerId) {
    const customerFound = await prisma2.customer.findUnique({
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
    const customerFound = await prisma2.customer.findFirst({
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

// src/controllers/Customer_Controller.ts
var Customer_Controller = class {
  static async add(req, res, next) {
    try {
      const clientDB = new Customer_RepositoryDB();
      const customerByEmail = new Find_CustomerByEmail(clientDB);
      await customerByEmail.execute(
        req.body.customerEmail
      );
      const createClient = new Create_Customer(clientDB);
      res.status(201).json({ message: "Cliente adicionado com sucesso!" });
      await createClient.execute(req.body);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const customerId = req.params.id;
      const loggedInId = req.customer_id;
      const clientDB = new Customer_RepositoryDB();
      const sendCustomerId = new Find_CustomerById(clientDB);
      const customer = await sendCustomerId.execute({ customerId, loggedInId });
      if (!customer) {
        throw new HTTPError(400, "Cliente n\xE3o encontrado!");
      }
      const customerDelete = new Delete_Customer(clientDB);
      await customerDelete.execute({ customerId, loggedInId });
      res.status(200).json({ message: "Cliente exclu\xEDdo com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req, res, next) {
    try {
      const clientDB = new Customer_RepositoryDB();
      const getCustomersList = new GetAll_Customers(clientDB);
      const customerList = await getCustomersList.execute();
      res.status(200).json({ customers: customerList });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const customerId = req.params.id;
      const loggedInId = req.customer_id;
      const { customerName, customerEmail, customerPassword, customerPhone } = req.body;
      const clientDB = new Customer_RepositoryDB();
      const sendCustomerId = new Find_CustomerById(clientDB);
      const customer = await sendCustomerId.execute({ customerId, loggedInId });
      if (!customer) {
        throw new HTTPError(400, "Cliente n\xE3o encontrado!");
      }
      const updateCustomer = new Update_Customer(clientDB);
      await updateCustomer.execute({
        customerId,
        customerName,
        customerEmail,
        customerPassword,
        customerPhone,
        loggedInId
      });
      res.status(200).json({ message: "Dados atualizados com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async search(req, res, next) {
    try {
      const { id } = req.query;
      const customerDB = new Customer_RepositoryDB();
      const sendCustomerId = new Find_CustomerById(customerDB);
      const customer = await sendCustomerId.execute(id);
      if (!customer) {
        throw new HTTPError(400, "Cliente n\xE3o encontrado!");
      }
      return res.status(200).json({ data: customer });
    } catch (error) {
      next(error);
    }
  }
  static async auth(req, res, next) {
    try {
      const { email, password } = req.body;
      const customerDB = new Customer_RepositoryDB();
      const userAuthenticated = new AuthCustomer(customerDB);
      const customerData = await userAuthenticated.execute(email, password);
      return res.status(200).json({ customerData });
    } catch (error) {
      next(error);
    }
  }
};

// src/infra/router/Customer_Router.ts
var router2 = (0, import_express2.Router)();
router2.get("/search", ExpressAdapter.create(Customer_Controller.search));
router2.post("/register", ExpressAdapter.create(Customer_Controller.add));
router2.delete("/:id", AuthCustomer_default.auth, ExpressAdapter.create(Customer_Controller.delete));
router2.patch("/:id", AuthCustomer_default.auth, ExpressAdapter.create(Customer_Controller.update));
router2.post("/auth", ExpressAdapter.create(Customer_Controller.auth));
router2.get("/", ExpressAdapter.create(Customer_Controller.getAll));
var Customer_Router_default = router2;

// src/infra/router/Employee_Router.ts
var import_express3 = require("express");

// src/infra/repositoriesInDB/employee/Employee_RepositoryDB.ts
var import_client3 = require("@prisma/client");

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
var prisma3 = new import_client3.PrismaClient();
var Employee_RepositoryDB = class {
  async delete(props) {
    await prisma3.employee.delete({ where: { employee_id: props.idLogin } });
  }
  async findByEmail(email) {
    const employeeFound = await prisma3.employee.findFirst({ where: { email } });
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
    const employeeList = await prisma3.employee.findMany();
    return employeeList.map((employee) => ({
      employeeId: employee.employee_id,
      employeeName: employee.name,
      employeeEmail: employee.email,
      employeeRole: employee.role
    }));
  }
  async find(employeeId) {
    const employeeFound = await prisma3.employee.findUnique({
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
    await prisma3.employee.update({
      where: { employee_id: props.employeeId },
      data: adaptedData
    });
  }
  async add(props) {
    const adaptedData = await Employee_Adapter.adapt(props);
    await prisma3.employee.create({ data: adaptedData });
  }
};

// src/core/useCase/employee/Cerate.ts
var import_bcrypt3 = __toESM(require("bcrypt"));
var Create_Employee = class {
  _employeeRepository;
  constructor(employeeRepository) {
    this._employeeRepository = employeeRepository;
  }
  async execute(props) {
    if (!props.employeeName || !props.employeePassword || !props.employeeRole || !props.employeeEmail) {
      throw new HTTPError(400, "Favor preencher todos os campos!");
    }
    const numberOfSalt = 14;
    const passwordHash = await import_bcrypt3.default.hash(props.employeePassword, numberOfSalt);
    await this._employeeRepository.add({ ...props, employeePassword: passwordHash });
  }
};

// src/core/useCase/employee/Find.ts
var Find_EmployeeById = class {
  _employeeRepository;
  constructor(employeeRepository) {
    this._employeeRepository = employeeRepository;
  }
  async execute(employeeId) {
    const employeeFound = await this._employeeRepository.find(employeeId);
    return employeeFound;
  }
};

// src/core/useCase/employee/Update.ts
var Update_Employee = class {
  _employeeRepository;
  constructor(employeeRepository) {
    this._employeeRepository = employeeRepository;
  }
  async execute(props) {
    await this._employeeRepository.update(props);
  }
};

// src/core/useCase/employee/Get.ts
var GetAll_Employee = class {
  _employeeRepository;
  constructor(employeeRepository) {
    this._employeeRepository = employeeRepository;
  }
  async execute() {
    const employeeList = await this._employeeRepository.get();
    if (employeeList.length === 0) {
      throw new HTTPError(204, "Lista de Funcion\xE1rios vazia!");
    }
    return employeeList;
  }
};

// src/core/useCase/employee/Auth.ts
var import_bcrypt4 = __toESM(require("bcrypt"));
var AuthEmployee = class {
  _employeeRepository;
  constructor(employeeRepository) {
    this._employeeRepository = employeeRepository;
  }
  async execute(email, password) {
    try {
      const employeeFound = await this._employeeRepository.findByEmail(email);
      if (!employeeFound) {
        throw new HTTPError(401, "Usu\xE1rio ou senha incorreto");
      }
      const passwordIsValid = await import_bcrypt4.default.compare(
        password,
        employeeFound.employeePassword
      );
      if (!passwordIsValid) {
        throw new HTTPError(401, "Usu\xE1rio ou senha incorreto");
      }
      const AuthenticatedEmployee = {
        id: employeeFound.employeeId,
        name: employeeFound.employeeName,
        email: employeeFound.employeeEmail,
        role: employeeFound.employeeRole
      };
      const token = generateAccessToken(
        AuthenticatedEmployee.id,
        AuthenticatedEmployee.role
      );
      return {
        ...AuthenticatedEmployee,
        token
      };
    } catch (error) {
      throw new HTTPError(401, "Usu\xE1rio ou senha incorreto");
    }
  }
};

// src/core/useCase/employee/FindByEmail.ts
var Find_EmployeeByEmail = class {
  _employeeRepository;
  constructor(employeeRepository) {
    this._employeeRepository = employeeRepository;
  }
  async execute(email) {
    const employeeFound = await this._employeeRepository.findByEmail(email);
    if (employeeFound) {
      throw new HTTPError(209, "Email j\xE1 cadastrado");
    }
    return employeeFound;
  }
};

// src/core/useCase/employee/Delete.ts
var Delete_Employee = class {
  _employeeRepository;
  constructor(employeeRepository) {
    this._employeeRepository = employeeRepository;
  }
  async execute(props) {
    if (props.idInParams !== props.idLogin) {
      throw new HTTPError(403, "N\xE3o autorizado!");
    }
    await this._employeeRepository.delete(props);
  }
};

// src/controllers/Employee_Controller.ts
var Employee_Controller = class {
  static async add(req, res, next) {
    try {
      const employeeDB = new Employee_RepositoryDB();
      const employeeByEmail = new Find_EmployeeByEmail(employeeDB);
      const checkEmailExists = await employeeByEmail.execute(
        req.body.employeeEmail
      );
      if (checkEmailExists) {
        throw new HTTPError(409, "Email j\xE1 cadastrado!");
      }
      const sendEmployeeData = new Create_Employee(employeeDB);
      await sendEmployeeData.execute(req.body);
      res.status(201).json({ message: "Funcion\xE1rio adicionado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async auth(req, res, next) {
    try {
      const { email, password } = req.body;
      const employeeDB = new Employee_RepositoryDB();
      const employeeAuthenticated = new AuthEmployee(employeeDB);
      const employeeData = await employeeAuthenticated.execute(email, password);
      return res.status(200).json({ employeeData });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const employeeId = req.params.id;
      const employeeDB = new Employee_RepositoryDB();
      const findEmployee = new Find_EmployeeById(employeeDB);
      const employee = await findEmployee.execute(employeeId);
      if (!employee) {
        throw new HTTPError(400, "Funcion\xE1rio n\xE3o encontrado!");
      }
      const { employeeName, employeeRole, employeePassword, employeeEmail } = req.body;
      const employUpdate = new Update_Employee(employeeDB);
      await employUpdate.execute({
        employeeId,
        employeeName,
        employeeEmail,
        employeeRole,
        employeePassword
      });
      res.status(200).json({ message: "Dados atualizados com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async find(req, res, next) {
    try {
      const employeeId = req.params.id;
      const employeeDB = new Employee_RepositoryDB();
      const sendEmployeeId = new Find_EmployeeById(employeeDB);
      await sendEmployeeId.execute(employeeId);
      res.status(200).json({ employee: sendEmployeeId });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req, res, next) {
    try {
      const employeeDB = new Employee_RepositoryDB();
      const sendEmployeeList = new GetAll_Employee(employeeDB);
      const employeeList = await sendEmployeeList.execute();
      res.status(200).json({ employeeList });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const idInParams = req.params.id;
      const idLogin = req.employee_id;
      const employeeDB = new Employee_RepositoryDB();
      const findEmployee = new Find_EmployeeById(employeeDB);
      const employee = await findEmployee.execute(idInParams);
      if (!employee) {
        throw new HTTPError(400, "Funcion\xE1rio n\xE3o encontrado!");
      }
      const deleteEmployee = new Delete_Employee(employeeDB);
      await deleteEmployee.execute({ idInParams, idLogin });
      res.status(200).json({ message: "Funcion\xE1rio exclu\xEDdo com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
};

// src/middlewares/AuthEmployee.ts
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"));
var AuthEmployeeMiddleware = class {
  auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token de acesso n\xE3o fornecido" });
    }
    const [, token] = authHeader.split(" ");
    if (!token) {
      return res.status(401).json({ message: "Token de acesso n\xE3o fornecido" });
    }
    try {
      if (!process.env.JWT_ACCESS_SECRET) {
        throw new Error("Chave secreta de acesso n\xE3o definida");
      }
      const { sub, role } = import_jsonwebtoken3.default.verify(
        token,
        process.env.JWT_ACCESS_SECRET
      );
      req.employee_id = sub;
      req.employee_role = role;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token de acesso inv\xE1lido ou expirado" });
    }
  }
};
var AuthEmployee_default = new AuthEmployeeMiddleware();

// src/infra/router/Employee_Router.ts
var router3 = (0, import_express3.Router)();
router3.post("/register", ExpressAdapter.create(Employee_Controller.add));
router3.get("/:id", ExpressAdapter.create(Employee_Controller.find));
router3.post("/auth", ExpressAdapter.create(Employee_Controller.auth));
router3.get("/", ExpressAdapter.create(Employee_Controller.getAll));
router3.patch("/:id", AuthEmployee_default.auth, ExpressAdapter.create(Employee_Controller.update));
router3.delete("/:id", AuthEmployee_default.auth, ExpressAdapter.create(Employee_Controller.delete));
var Employee_Router_default = router3;

// src/infra/router/Service_Router.ts
var import_express4 = require("express");

// src/infra/repositoriesInDB/service/Service_RepositoryInDB.ts
var import_client4 = require("@prisma/client");

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
var prisma4 = new import_client4.PrismaClient();
var Service_RepositoryInDB = class {
  async getAll() {
    const servicesList = await prisma4.service.findMany();
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
    await prisma4.service.update({
      where: { service_id: props.serviceId },
      data: adapterData
    });
  }
  async find(id) {
    const serviceFound = await prisma4.service.findUnique({
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
    await prisma4.service.delete({ where: { service_id: id } });
  }
  async save(props) {
    const adapterData = await Service_Adapter.adapt(props);
    await prisma4.service.create({ data: adapterData });
  }
};

// src/core/useCase/services/Create.ts
var Create_Service = class {
  _serviceRepository;
  constructor(serviceRepository) {
    this._serviceRepository = serviceRepository;
  }
  async execute(props, credential) {
    if (credential !== "admin" && credential !== "gerente") {
      throw new HTTPError(403, "Apenas administradores podem adicionar servi\xE7os.");
    }
    await this._serviceRepository.save(props);
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

// src/core/useCase/services/Update.ts
var Update_Service = class {
  _serviceRepository;
  constructor(serviceRepository) {
    this._serviceRepository = serviceRepository;
  }
  async execute(props, credential) {
    const serviceFound = await this._serviceRepository.find(props.serviceId);
    if (!serviceFound) {
      throw new HTTPError(400, "Servi\xE7o n\xE3o encontrado!");
    }
    if (credential !== "admin" && credential !== "gerente") {
      throw new HTTPError(403, "Apenas administradores podem adicionar servi\xE7os.");
    }
    await this._serviceRepository.update(props);
  }
};

// src/core/useCase/services/Get.ts
var GetAll_Services = class {
  _serviceRepository;
  constructor(serviceRepository) {
    this._serviceRepository = serviceRepository;
  }
  async execute() {
    const servicesList = await this._serviceRepository.getAll();
    if (servicesList.length === 0) {
      throw new HTTPError(204, "Lista de servi\xE7os est\xE1 vazia!");
    }
    return servicesList;
  }
};

// src/controllers/Service_Controller.ts
var Employee_Controller2 = class {
  static async save(req, res, next) {
    try {
      const serviceDB = new Service_RepositoryInDB();
      const createServiceData = new Create_Service(serviceDB);
      await createServiceData.execute(req.body, req.employee_role);
      res.status(201).json({ message: "Servi\xE7o adicionado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const serviceDB = new Service_RepositoryInDB();
      const removeServiceData = new Delete_Service(serviceDB);
      await removeServiceData.execute(req.params.id, req.employee_role);
      res.status(200).json({ message: "Servi\xE7o exclu\xEDdo com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const serviceDB = new Service_RepositoryInDB();
      const updateServiceData = new Update_Service(serviceDB);
      await updateServiceData.execute(
        {
          ...req.body,
          serviceId: req.params.id
        },
        req.employee_role
      );
      res.status(200).json({ message: "Servi\xE7o atualizado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req, res, next) {
    try {
      const serviceDB = new Service_RepositoryInDB();
      const getServicesData = new GetAll_Services(serviceDB);
      const servicesList = await getServicesData.execute();
      res.status(200).json({ services: servicesList });
    } catch (error) {
    }
  }
};

// src/infra/router/Service_Router.ts
var router4 = (0, import_express4.Router)();
router4.post(
  "/register",
  AuthEmployee_default.auth,
  ExpressAdapter.create(Employee_Controller2.save)
);
router4.delete(
  "/:id",
  AuthEmployee_default.auth,
  ExpressAdapter.create(Employee_Controller2.delete)
);
router4.patch(
  "/update/:id",
  AuthEmployee_default.auth,
  ExpressAdapter.create(Employee_Controller2.update)
);
router4.get("/", ExpressAdapter.create(Employee_Controller2.getAll));
var Service_Router_default = router4;

// src/infra/http/express/Express.ts
var import_dotenv = require("dotenv");
var app = (0, import_express5.default)();
var port = process.env.PORT || 3e3;
(0, import_dotenv.config)();
app.use(import_express5.default.json());
app.use(import_express5.default.urlencoded({ extended: true }));
app.use("/api/customer", Customer_Router_default);
app.use("/api/employee", Employee_Router_default);
app.use("/api/service", Service_Router_default);
app.use("/api/appointments", Appointments_Router_default);
app.use((err, req, res, next) => {
  if (err instanceof HTTPError) {
    console.error(err.statusCode, err.message);
    return res.status(err.statusCode).json({ message: err.message });
  } else {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
