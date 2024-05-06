import Appointments_Repository from "src/core/repositories/Appointments_Repository";
import HTTPError from "src/errors/ErrorsHTTP";

export default class Delete_Appointment {
  _appointmentsRepository: Appointments_Repository;

  constructor(appointmentsRepository: Appointments_Repository) {
    this._appointmentsRepository = appointmentsRepository;
  }

  async execute(appointmentId: string, loginId: string) {
    if (!loginId) {
      throw new HTTPError(401, "Usuário precisa estar autenticado");
    }

    const appointment = await this._appointmentsRepository.find(appointmentId);

    if (!appointment) {
      throw new HTTPError(400, "Agendamento não encontrado.");
    }

    if (loginId !== appointment.customerId) {
      throw new HTTPError(401, "Não autorizado.");
    }

    await this._appointmentsRepository.delete(appointmentId, loginId);
  }
}
