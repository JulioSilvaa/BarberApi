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

// src/infra/router/Employee_Router.ts
var Employee_Router_exports = {};
__export(Employee_Router_exports, {
  default: () => Employee_Router_default
});
module.exports = __toCommonJS(Employee_Router_exports);
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

// src/infra/repositoriesInDB/employee/Employee_RepositoryDB.ts
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

// src/core/useCase/employee/Cerate.ts
var import_bcrypt = __toESM(require("bcrypt"));

// src/errors/ErrorsHTTP.ts
var HTTPError = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
};

// src/core/useCase/employee/Cerate.ts
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
    const passwordHash = await import_bcrypt.default.hash(props.employeePassword, numberOfSalt);
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
var import_bcrypt2 = __toESM(require("bcrypt"));

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

// src/core/useCase/employee/Auth.ts
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
      const passwordIsValid = await import_bcrypt2.default.compare(
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
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
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
      const { sub, role } = import_jsonwebtoken2.default.verify(
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
var router = (0, import_express.Router)();
router.post("/register", ExpressAdapter.create(Employee_Controller.add));
router.get("/:id", ExpressAdapter.create(Employee_Controller.find));
router.post("/auth", ExpressAdapter.create(Employee_Controller.auth));
router.get("/", ExpressAdapter.create(Employee_Controller.getAll));
router.patch("/:id", AuthEmployee_default.auth, ExpressAdapter.create(Employee_Controller.update));
router.delete("/:id", AuthEmployee_default.auth, ExpressAdapter.create(Employee_Controller.delete));
var Employee_Router_default = router;
