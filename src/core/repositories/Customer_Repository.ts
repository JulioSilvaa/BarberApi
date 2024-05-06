import { ICustomer_Entity } from "../entities/Customer_Entity";

export default interface Customer_Repository {
  add(props: ICustomer_Entity): Promise<void>;

  findById(props: any): Promise<ICustomer_Entity>;

  findByEmail(customerEmail: string): Promise<ICustomer_Entity>;

  delete(props: ICustomer_Entity): Promise<void>;

  getAll(): Promise<ICustomer_Entity[]>;

  update(props: any): Promise<void>;
}
