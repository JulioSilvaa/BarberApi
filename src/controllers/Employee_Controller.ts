import { NextFunction, Request, Response } from "express";
import Employee_RepositoryDB from "./../infra/repositoriesInDB/employee/Employee_RepositoryDB";
import Create_Employee from "src/core/useCase/employee/Cerate";
import Find_EmployeeById from "src/core/useCase/employee/Find";
import Update_Employee from "src/core/useCase/employee/Update";
import GetAll_Employee from "src/core/useCase/employee/Get";
import AuthEmployee from "src/core/useCase/employee/Auth";
import Find_EmployeeByEmail from "src/core/useCase/employee/FindByEmail";
import Delete_Employee from "src/core/useCase/employee/Delete";
import HTTPError from "src/errors/ErrorsHTTP";

export default class Employee_Controller {
  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeDB = new Employee_RepositoryDB()
      const employeeByEmail = new Find_EmployeeByEmail(employeeDB);
      const checkEmailExists = await employeeByEmail.execute(
        req.body.employeeEmail
      );

      if (checkEmailExists) {
        throw new HTTPError(409, "Email já cadastrado!");
      }

      const sendEmployeeData = new Create_Employee(employeeDB);
      await sendEmployeeData.execute(req.body);

      res.status(201).json({ message: "Funcionário adicionado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async auth(req: Request, res: Response, next: NextFunction) {
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

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = req.params.id;
      const employeeDB = new Employee_RepositoryDB();
      const findEmployee = new Find_EmployeeById(employeeDB);
      const employee = await findEmployee.execute(employeeId);

      if (!employee) {
        throw new HTTPError(400, "Funcionário não encontrado!");
      }

      const { employeeName, employeeRole, employeePassword, employeeEmail } = req.body;
      const employUpdate = new Update_Employee(employeeDB);
      await employUpdate.execute({
        employeeId,
        employeeName,
        employeeEmail,
        employeeRole,
        employeePassword,
      });
      res.status(200).json({ message: "Dados atualizados com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async find(req: Request, res: Response, next: NextFunction) {
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

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeDB = new Employee_RepositoryDB();
      const sendEmployeeList = new GetAll_Employee(employeeDB);
      const employeeList = await sendEmployeeList.execute();
      res.status(200).json({ employeeList: employeeList });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const idInParams = req.params.id;
      const idLogin = req.employee_id
      const employeeDB = new Employee_RepositoryDB();
      const findEmployee = new Find_EmployeeById(employeeDB);
      const employee = await findEmployee.execute(idInParams);

      if (!employee) {
        throw new HTTPError(400, "Funcionário não encontrado!");
      }

      const deleteEmployee = new Delete_Employee(employeeDB);
      await deleteEmployee.execute({ idInParams, idLogin })

      res.status(200).json({ message: "Funcionário excluído com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

}
