import { PrismaClient } from "@prisma/client";
import Customer_Adapter from "src/adapters/Customer_Adapter";
import { ICustomer_Entity } from "src/core/entities/Customer_Entity";
import Customer_Repository from "src/core/repositories/Customer_Repository";

const prisma = new PrismaClient();

export default class Customer_RepositoryDB implements Customer_Repository {
  async update(props: ICustomer_Entity): Promise<void> {
    const adaptedData = await Customer_Adapter.adapt(props);

    await prisma.customer.update({
      where: { customer_id: props.customerId },
      data: adaptedData,
    });
  }

  async getAll(): Promise<any[]> {
    const customerList = await prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
    });

    return customerList.map((customer) => ({
      customerId: customer.customer_id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerCreatedAt: customer.createdAt,
    }));
  }

  async delete(props: any): Promise<void> {
    await prisma.customer.delete({ where: { customer_id: props.loggedInId } });
  }

  async add(props: ICustomer_Entity): Promise<void> {
    const adaptedData = await Customer_Adapter.adapt(props);
    await prisma.customer.create({ data: adaptedData });
  }

  async findById(customerId: string): Promise<any> {
    const customerFound = await prisma.customer.findUnique({
      where: { customer_id: customerId },
    });

    if (customerFound) {
      return {
        customerId: customerFound.customer_id,
        customerName: customerFound.name,
        customerEmail: customerFound.email,
        customerCreatedAt: customerFound.createdAt,
      };
    }
  }

  async findByEmail(customerEmail: any): Promise<any> {
    const customerFound = await prisma.customer.findFirst({
      where: { email: customerEmail },
    });

    if (customerFound) {
      return {
        customerId: customerFound.customer_id,
        customerName: customerFound.name,
        customerEmail: customerFound.email,
        customerPhone: customerFound.phone,
        customerPassword: customerFound.password,
        customerCreatedAt: customerFound.createdAt,
      };
    }
  }
}
