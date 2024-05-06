import Service_Repository from "src/core/repositories/Service_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class Update_Service {
  _serviceRepository: Service_Repository;
  constructor(serviceRepository: Service_Repository) {
    this._serviceRepository = serviceRepository;
  }

  async execute(props: any, credential: string): Promise<any> {
    const serviceFound = await this._serviceRepository.find(props.serviceId);
    if (!serviceFound) {
      throw new HTTPError(400, "Serviço não encontrado!");
    }

    if (credential !== "admin" && credential !== "gerente") {
      throw new HTTPError(403, "Apenas administradores podem adicionar serviços.");
    }

    await this._serviceRepository.update(props);
  }
}
