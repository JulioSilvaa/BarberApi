import { PrismaClient } from "@prisma/client";
import Service_Adapter from "src/adapters/Service_Adapter";
import { IService } from "src/core/entities/Service";
import Service_Repository from "src/core/repositories/Service_Repository";

const prisma = new PrismaClient();

export default class Service_RepositoryInDB implements Service_Repository {
  async getAll(): Promise<any> {
    const servicesList = await prisma.service.findMany();

    if (servicesList) {
      return servicesList.map((service) => ({
        serviceId: service.service_id,
        serviceName: service.name,
        serviceDescription: service.description,
        servicePrice: service.price,
      }));
    }
  }

  async update(props: IService): Promise<void> {
    const adapterData = await Service_Adapter.adapt(props);

    await prisma.service.update({
      where: { service_id: props.serviceId },
      data: adapterData,
    });
  }

  async find(id: string): Promise<any> {
    const serviceFound = await prisma.service.findUnique({
      where: { service_id: id },
    });
    if (serviceFound) {
      return {
        serviceId: serviceFound.service_id,
        serviceName: serviceFound.name,
        serviceDescription: serviceFound.description,
        servicePrice: serviceFound.price.toString(),
      };
    }
  }
  async delete(id: string): Promise<void> {
    await prisma.service.delete({ where: { service_id: id } });
  }
  async save(props: IService): Promise<void> {
    const adapterData = await Service_Adapter.adapt(props);
    await prisma.service.create({ data: adapterData });
  }
}
