import bcrypt from "bcrypt";
import { ICustomer_Entity } from "src/core/entities/Customer_Entity";
import Customer_Repository from "src/core/repositories/Customer_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class Create_Customer {
  _customerRepository: Customer_Repository;
  constructor(customerRepository: Customer_Repository) {
    this._customerRepository = customerRepository;
  }

  async execute(props: ICustomer_Entity): Promise<void> {
    if (!props.customerName || !props.customerEmail || !props.customerPassword) {
      throw new HTTPError(400, "Favor preencher todos os campos!");
    }

    const numberOfSalt = 14;
    const passwordHash = await bcrypt.hash(props.customerPassword, numberOfSalt);
    await this._customerRepository.add({ ...props, customerPassword: passwordHash });
  }
}
