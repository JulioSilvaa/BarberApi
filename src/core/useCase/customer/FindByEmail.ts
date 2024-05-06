import { ICustomer_Entity } from "src/core/entities/Customer_Entity";
import Customer_Repository from "src/core/repositories/Customer_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class Find_CustomerByEmail {
  _customerRepository: Customer_Repository;
  constructor(customerRepository: Customer_Repository) {
    this._customerRepository = customerRepository;
  }

  async execute(customerEmail: string) {
    const customerFound = await this._customerRepository.findByEmail(
      customerEmail
    );

    if (customerFound) {
      throw new HTTPError(409, "Email já cadastrado");
    }
    return null
  }
}
