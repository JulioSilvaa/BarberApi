import Appointments_Repository from "src/core/repositories/Appointments_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class Create_Appointments {
  _appointmentsRepository: Appointments_Repository;

  constructor(appointmentsRepository: Appointments_Repository) {
    this._appointmentsRepository = appointmentsRepository;
  }

  async execute(props: any, loginId: string): Promise<void> {
    if (!loginId) {
      throw new HTTPError(401, "Usuário precisa estar autenticado");
    }
    await this._appointmentsRepository.save({ ...props, customerId: loginId });
  }
}
