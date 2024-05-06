import Appointments_Repository from "src/core/repositories/Appointments_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class Find_AppointmentsById {
  _appointmentsRepository: Appointments_Repository;

  constructor(appointmentsRepository: Appointments_Repository) {
    this._appointmentsRepository = appointmentsRepository;
  }

  async execute(loginId: string, customerId: string) {
    if (loginId !== customerId) {
      throw new HTTPError(401, "Usuário não autenticado.");
    }
    const appointmentsOfCustomer = await this._appointmentsRepository.find(
      loginId
    );

    if (!appointmentsOfCustomer) {
      throw new HTTPError(201, "Usuário sem agendamentos realizados.");
    }

    return appointmentsOfCustomer;
  }
}
