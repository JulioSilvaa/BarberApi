import Customer_Repository from "src/core/repositories/Customer_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class Delete_Customer {
  _customerRepository: Customer_Repository;
  constructor(customerRepository: Customer_Repository) {
    this._customerRepository = customerRepository;
  }

  async execute(props: any): Promise<void> {
    if (typeof props.customerId !== "string") {
      throw new HTTPError(400, "Tipo de ID não é string");;
    }
    await this._customerRepository.delete(props);
  }
}
