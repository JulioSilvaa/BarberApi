import { IEmployee_Entity } from "src/core/entities/Employee_Entity";
import Employee_Repository from "src/core/repositories/Employee_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class GetAll_Employee {
  _employeeRepository: Employee_Repository;
  constructor(employeeRepository: Employee_Repository) {
    this._employeeRepository = employeeRepository;
  }

  async execute(): Promise<IEmployee_Entity[]> {
    const employeeList = await this._employeeRepository.get();
    if (employeeList.length === 0) {
      throw new HTTPError(204, "Lista de Funcionários vazia!");
    }
    return employeeList;
  }
}
