import { Request, Response, NextFunction } from "express";

import Create_Appointments from "src/core/useCase/Appointments/Create";
import Delete_Appointment from "src/core/useCase/Appointments/Delete";
import Find_AppointmentsById from "src/core/useCase/Appointments/Find";
import GetAll_Appointments from "src/core/useCase/Appointments/Get";
import Appointments_RepositoryDB from "src/infra/repositoriesInDB/appointments/Appointments_RepositoryDB";

export default class Appointments_Controller {
  static async save(req: Request, res: Response, next: NextFunction) {
    try {
      const loginId = req.customer_id;
      const appointmentsDB = new Appointments_RepositoryDB();
      const createAppointmentData = new Create_Appointments(appointmentsDB);
      await createAppointmentData.execute(req.body, loginId);
      res.status(201).json({ message: "Agendamento realizado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const appointmentsDB = new Appointments_RepositoryDB();
      const sendDeleteAppointmentsData = new Delete_Appointment(appointmentsDB);
      await sendDeleteAppointmentsData.execute(req.params.id, req.customer_id);
      res.status(200).json({ message: "Agendamento excluído com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const appointmentsDB = new Appointments_RepositoryDB();
      const getAllAppointmentsData = new GetAll_Appointments(appointmentsDB);
      const appointmentsList = await getAllAppointmentsData.execute();
      res.status(200).json({ appointments: appointmentsList });
    } catch (error) {
      next(error);
    }
  }

  static async find(req: Request, res: Response, next: NextFunction) {
    try {
      const appointmentsDB = new Appointments_RepositoryDB();
      const findAppointmentsData = new Find_AppointmentsById(appointmentsDB);
      const findAppointmentResult = await findAppointmentsData.execute(
        req.customer_id,
        req.params.id,
      );
      res.status(200).json({ appointmentsOfCustomer: findAppointmentResult });
    } catch (error) {
      next(error);
    }
  }
}
