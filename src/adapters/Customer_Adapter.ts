import { ICustomer_Entity } from "src/core/entities/Customer_Entity";

export default class Customer_Adapter {
  static async adapt({
    customerId,
    customerName,
    customerEmail,
    customerPhone,
    customerPassword,
    customerCreatedAt,
  }: ICustomer_Entity): Promise<any> {
    return {
      customer_id: customerId,
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      password: customerPassword,
      createdAt: customerCreatedAt,
    };
  }
}
