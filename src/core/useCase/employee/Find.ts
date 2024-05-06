import Employee_Repository from "src/core/repositories/Employee_Repository";

export default class Find_EmployeeById {
  _employeeRepository: Employee_Repository;
  constructor(employeeRepository: Employee_Repository) {
    this._employeeRepository = employeeRepository;
  }

  async execute(employeeId: string): Promise<any> {
    const employeeFound = await this._employeeRepository.find(employeeId);
    return employeeFound;
  }
}
