"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/Customer_Controller.ts
var Customer_Controller_exports = {};
__export(Customer_Controller_exports, {
  default: () => Customer_Controller
});
module.exports = __toCommonJS(Customer_Controller_exports);

// src/core/useCase/customer/Auth.ts
var import_bcrypt = __toESM(require("bcrypt"));

// src/utils/generateToken.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
function generateAccessToken(id, role) {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("Access token failed");
  }
  if (typeof id !== "string") {
    throw new Error("O id deve ser uma string");
  }
  return import_jsonwebtoken.default.sign({ paramsId: id, role }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "7d",
    subject: id
  });
}

// src/errors/ErrorsHTTP.ts
var HTTPError = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
};

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
