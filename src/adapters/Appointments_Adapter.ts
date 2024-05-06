import { IAppointments } from "src/core/entities/Appointments_Entity";

export default class AppointmentsAdapter {
  static async adapt({
    appointmentStatusId,
    customerId,
    dateTime,
    employeeId,
    serviceId,
  }: IAppointments): Promise<any> {
    return {
      customer_id: customerId,
      date_and_time: dateTime,
      employee_id: employeeId,
      service_id: serviceId,
      appointment_status_id: appointmentStatusId,
    };
  }
}
