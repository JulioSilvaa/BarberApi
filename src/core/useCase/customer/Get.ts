import Customer_Repository from "src/core/repositories/Customer_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class GetAll_Customers {
  _customerRepository: Customer_Repository;
  constructor(customerRepository: Customer_Repository) {
    this._customerRepository = customerRepository;
  }

  async execute() {
    const customers = await this._customerRepository.getAll();
    if (customers.length === 0) {
      throw new HTTPError(204, "Lista de Clientes está vazia");
    }
    return customers;
  }
}
