export interface IAppointments {
  appointmentsId?: string;
  appointmentStatusId: string;
  customerId: string;
  employeeId: string;
  serviceId: string;
  dateTime: string;
}

export default class Appointments_Entity {
  _appointments?: string;
  _appointmentStatusId: string;
  _customerId: string;
  _employeeId: string;
  _serviceId: string;
  _dateTime: string;

  constructor(props: IAppointments) {
    this._appointmentStatusId = props.appointmentStatusId;
    this._customerId = props.customerId;
    this._employeeId = props.employeeId;
    this._serviceId = props.serviceId;
    this._dateTime = props.dateTime;
  }
}
