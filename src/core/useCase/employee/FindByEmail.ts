import Employee_Repository from "src/core/repositories/Employee_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class Find_EmployeeByEmail {
  _employeeRepository: Employee_Repository;
  constructor(employeeRepository: Employee_Repository) {
    this._employeeRepository = employeeRepository;
  }

  async execute(email: string): Promise<any> {
    const employeeFound = await this._employeeRepository.findByEmail(email)

    if (employeeFound) {
      throw new HTTPError(209, "Email já cadastrado");
    }

    return employeeFound
  }
}