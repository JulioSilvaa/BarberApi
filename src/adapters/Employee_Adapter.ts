import { IEmployee_Entity } from "src/core/entities/Employee_Entity";

export default class Employee_Adapter {
  static async adapt({
    employeeId,
    employeeName,
    employeeRole,
    employeePassword,
    employeeEmail,
  }: IEmployee_Entity): Promise<any> {
    return {
      employee_id: employeeId,
      name: employeeName,
      password: employeePassword,
      role: employeeRole,
      email: employeeEmail,
    };
  }
}
