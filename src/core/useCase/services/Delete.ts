import Service_Repository from "src/core/repositories/Service_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class Delete_Service {
  _serviceRepository: Service_Repository;
  constructor(serviceRepository: Service_Repository) {
    this._serviceRepository = serviceRepository;
  }

  async execute(id: string, credential: string): Promise<void> {
    const serviceFound = await this._serviceRepository.find(id);

    if (!serviceFound) {
      throw new HTTPError(400, "Serviço não encontrado!");
    }

    if (credential !== "admin" && credential !== "gerente") {
      throw new HTTPError(403, "Apenas administradores podem remover serviços.");
    }

    await this._serviceRepository.delete(id);
  }
}
