import { IService } from "src/core/entities/Service";
import Service_Repository from "src/core/repositories/Service_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class Create_Service {
  _serviceRepository: Service_Repository;
  constructor(serviceRepository: Service_Repository) {
    this._serviceRepository = serviceRepository;
  }

  async execute(props: IService, credential: string) {
    if (credential !== "admin" && credential !== "gerente") {
      throw new HTTPError(403, "Apenas administradores podem adicionar serviços.");
    }

    await this._serviceRepository.save(props);
  }
}
