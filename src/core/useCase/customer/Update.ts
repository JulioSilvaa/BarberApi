import { ICustomer_Entity } from "src/core/entities/Customer_Entity";
import Customer_Repository from "src/core/repositories/Customer_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class Update_Customer {
  _customerRepository: Customer_Repository;
  constructor(customerRepository: Customer_Repository) {
    this._customerRepository = customerRepository;
  }

  async execute(props: any): Promise<void> {
    if (props.customerId !== props.loggedInId) {
      throw new HTTPError(401, "Não Autorizado!");
    }
    await this._customerRepository.update(props);
  }
}
