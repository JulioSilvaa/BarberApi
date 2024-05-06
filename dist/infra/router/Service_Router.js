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

// src/infra/router/Service_Router.ts
var Service_Router_exports = {};
__export(Service_Router_exports, {
  default: () => Service_Router_default
});
module.exports = __toCommonJS(Service_Router_exports);
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

// src/infra/repositoriesInDB/service/Service_RepositoryInDB.ts
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

// src/errors/ErrorsHTTP.ts
var HTTPError = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
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
var Employee_Controller = class {
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

// src/middlewares/AuthEmployee.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
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
      const { sub, role } = import_jsonwebtoken.default.verify(
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

// src/infra/router/Service_Router.ts
var router = (0, import_express.Router)();
router.post(
  "/register",
  AuthEmployee_default.auth,
  ExpressAdapter.create(Employee_Controller.save)
);
router.delete(
  "/:id",
  AuthEmployee_default.auth,
  ExpressAdapter.create(Employee_Controller.delete)
);
router.patch(
  "/update/:id",
  AuthEmployee_default.auth,
  ExpressAdapter.create(Employee_Controller.update)
);
router.get("/", ExpressAdapter.create(Employee_Controller.getAll));
var Service_Router_default = router;
