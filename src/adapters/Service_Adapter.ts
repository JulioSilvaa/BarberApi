import { IService } from "src/core/entities/Service";

export default class Service_Adapter {
  static async adapt({
    serviceName,
    serviceDescription,
    servicePrice,
  }: IService): Promise<any> {
    return {
      name: serviceName,
      description: serviceDescription,
      price: parseFloat(servicePrice.replace(",", ".")),
    };
  }
}
