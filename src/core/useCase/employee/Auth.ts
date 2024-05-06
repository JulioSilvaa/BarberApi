import Employee_Repository from "src/core/repositories/Employee_Repository";
import bcrypt from "bcrypt";
import { generateAccessToken } from "src/utils/generateToken";
import HTTPError from "src/errors/ErrorsHTTP";

export default class AuthEmployee {
  _employeeRepository: Employee_Repository;

  constructor(employeeRepository: Employee_Repository) {
    this._employeeRepository = employeeRepository;
  }

  async execute(email: string, password: string) {
    try {
      const employeeFound = await this._employeeRepository.findByEmail(email);

      if (!employeeFound) {
        throw new HTTPError(401, "Usuário ou senha incorreto");
      }
      const passwordIsValid = await bcrypt.compare(
        password,
        employeeFound.employeePassword
      );
      if (!passwordIsValid) {
        throw new HTTPError(401, "Usuário ou senha incorreto");
      }

      const AuthenticatedEmployee = {
        id: employeeFound.employeeId,
        name: employeeFound.employeeName,
        email: employeeFound.employeeEmail,
        role: employeeFound.employeeRole,
      };

      const token = generateAccessToken(
        AuthenticatedEmployee.id,
        AuthenticatedEmployee.role as string
      );

      return {
        ...AuthenticatedEmployee,
        token,
      };
    } catch (error: any) {
      throw new HTTPError(401, "Usuário ou senha incorreto");
    }
  }
}
