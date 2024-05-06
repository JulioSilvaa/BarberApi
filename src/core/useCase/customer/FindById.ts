import { ICustomer_Entity } from "src/core/entities/Customer_Entity";
import Customer_Repository from "src/core/repositories/Customer_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class Find_CustomerById {
  _customerRepository: Customer_Repository;
  constructor(customerRepository: Customer_Repository) {
    this._customerRepository = customerRepository;
  }

  async execute(props: any): Promise<ICustomer_Entity> {

    const customerFound = await this._customerRepository.findById(props);
    if (!customerFound) {
      throw new HTTPError(400, "Cliente não encontrado!");
    }

    return customerFound;
  }
}
