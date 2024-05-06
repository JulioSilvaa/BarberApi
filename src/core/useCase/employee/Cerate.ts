import bcrypt from "bcrypt"
import { IEmployee_Entity } from "src/core/entities/Employee_Entity";
import Employee_Repository from "src/core/repositories/Employee_Repository";
import HTTPError from "src/errors/ErrorsHTTP";


export default class Create_Employee {
  _employeeRepository: Employee_Repository;
  constructor(employeeRepository: Employee_Repository) {
    this._employeeRepository = employeeRepository;
  }

  async execute(props: IEmployee_Entity): Promise<void> {
    if (!props.employeeName || !props.employeePassword || !props.employeeRole || !props.employeeEmail) {
      throw new HTTPError(400, "Favor preencher todos os campos!");
    }

    const numberOfSalt = 14
    const passwordHash = await bcrypt.hash(props.employeePassword, numberOfSalt)
    await this._employeeRepository.add({ ...props, employeePassword: passwordHash });
  }
}
