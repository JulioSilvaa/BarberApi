import { IEmployee_Entity } from "src/core/entities/Employee_Entity";
import Employee_Repository from "src/core/repositories/Employee_Repository";

export default class Update_Employee {
  _employeeRepository: Employee_Repository;
  constructor(employeeRepository: Employee_Repository) {
    this._employeeRepository = employeeRepository;
  }

  async execute(props: IEmployee_Entity) {
    await this._employeeRepository.update(props);
  }
}
