import Employee_Repository from "src/core/repositories/Employee_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class Delete_Employee {
  _employeeRepository: Employee_Repository;
  constructor(employeeRepository: Employee_Repository) {
    this._employeeRepository = employeeRepository;
  }


  async execute(props: any): Promise<void> {
    if (props.idInParams !== props.idLogin) {
      throw new HTTPError(403, "Não autorizado!");
    }
    await this._employeeRepository.delete(props)
  }
}