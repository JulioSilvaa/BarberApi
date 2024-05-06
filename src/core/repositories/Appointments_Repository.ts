import { IAppointments } from "../entities/Appointments_Entity";

export default interface Appointments_Repository {
  save(props: IAppointments): Promise<void>;
  find(appointmentId: string): Promise<IAppointments>;
  delete(appointmentId: string, loginId: string): Promise<void>;
  get():Promise<any>
}
