import { PrismaClient } from "@prisma/client";
import Employee_Adapter from "src/adapters/Employee_Adapter";
import { IEmployee_Entity } from "src/core/entities/Employee_Entity";
import Employee_Repository from "src/core/repositories/Employee_Repository";

const prisma = new PrismaClient();

export default class Employee_RepositoryDB implements Employee_Repository {
  async delete(props: any): Promise<void> {
    await prisma.employee.delete({ where: { employee_id: props.idLogin } });
  }

  async findByEmail(email: string): Promise<any> {
    const employeeFound = await prisma.employee.findFirst({ where: { email } });

    if (employeeFound) {
      return {
        employeeId: employeeFound.employee_id,
        employeeName: employeeFound.name,
        employeeEmail: employeeFound.email,
        employeePassword: employeeFound.password,
        employeeRole: employeeFound.role,
      }
    }
  }

  async get(): Promise<any[]> {
    const employeeList = await prisma.employee.findMany();

    return employeeList.map((employee) => ({
      employeeId: employee.employee_id,
      employeeName: employee.name,
      employeeEmail: employee.email,
      employeeRole: employee.role,
    }));
  }

  async find(employeeId: string): Promise<any> {
    const employeeFound = await prisma.employee.findUnique({
      where: { employee_id: employeeId },
    });
    if (employeeFound) {
      return {
        employeeId: employeeFound.employee_id,
        employeeName: employeeFound.name,
        employeeFoundEmail: employeeFound.email,
        employeeRole: employeeFound.role,
      };
    }
  }

  async update(props: IEmployee_Entity): Promise<void> {
    const adaptedData = await Employee_Adapter.adapt(props);

    await prisma.employee.update({
      where: { employee_id: props.employeeId },
      data: adaptedData,
    });
  }

  async add(props: IEmployee_Entity): Promise<void> {
    const adaptedData = await Employee_Adapter.adapt(props);
    await prisma.employee.create({ data: adaptedData });
  }
}
