import Customer_Repository from "src/core/repositories/Customer_Repository";
import bcrypt from "bcrypt";
import { generateAccessToken } from "src/utils/generateToken";
import HTTPError from "src/errors/ErrorsHTTP";

export default class AuthCustomer {
  _customerRepository: Customer_Repository;

  constructor(customerRepository: Customer_Repository) {
    this._customerRepository = customerRepository;
  }

  async execute(email: string, password: string) {

    try {
      const userFound = await this._customerRepository.findByEmail(email);

      if (!userFound) {
        throw new HTTPError(401, "Usuário ou senha incorreto");
      }

      const passwordIsValid = await bcrypt.compare(password, userFound.customerPassword);
      if (!passwordIsValid) {
        throw new HTTPError(401, "Usuário ou senha incorreto");
      }


      const AuthenticatedCustomer = {
        id: userFound.customerId,
        name: userFound.customerName,
        phone: userFound.customerPhone,
        email: userFound.customerEmail,
      };

      const token = generateAccessToken(AuthenticatedCustomer.id as string);

      return {
        ...AuthenticatedCustomer,
        token,
      };
    } catch (error: any) {
      throw new HTTPError(401, "Usuário ou senha incorreto");
    }
  }
}