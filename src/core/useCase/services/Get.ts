import Service_Repository from "src/core/repositories/Service_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class GetAll_Services {
  _serviceRepository: Service_Repository;
  constructor(serviceRepository: Service_Repository) {
    this._serviceRepository = serviceRepository;
  }

  async execute() {
    const servicesList = await this._serviceRepository.getAll()
    if (servicesList.length === 0) {
      throw new HTTPError(204, "Lista de serviços está vazia!");
    }

    return servicesList;
  }
}