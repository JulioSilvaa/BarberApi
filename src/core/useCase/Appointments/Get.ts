import Appointments_Repository from "src/core/repositories/Appointments_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class GetAll_Appointments {
  _appointmentsRepository: Appointments_Repository;

  constructor(appointmentsRepository: Appointments_Repository) {
    this._appointmentsRepository = appointmentsRepository;
  }

  async execute() {
    const appointmentsList = await this._appointmentsRepository.get()

    if (appointmentsList.length === 0) {
      throw new HTTPError(204, "Lista de agendamentos está vazia!");
    }
    return appointmentsList;
  }
}