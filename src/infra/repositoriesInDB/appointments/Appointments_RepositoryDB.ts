import { PrismaClient } from "@prisma/client";
import AppointmentsAdapter from "src/adapters/Appointments_Adapter";
import Appointments_Adapter from "src/adapters/Appointments_Adapter";
import { IAppointments } from "src/core/entities/Appointments_Entity";
import Appointments_Repository from "src/core/repositories/Appointments_Repository";

const prisma = new PrismaClient();

export default class Appointments_RepositoryDB
  implements Appointments_Repository
{
  async find(loginId: string): Promise<any> {
    const listAppointmentOfCustomer = await prisma.appointment.findMany({
      where: { customer_id: loginId },
      select: {
        date_and_time: true,
        employee: {
          select: { name: true },
        },
        customer: { select: { name: true, email: true, phone: true } },
        service: { select: { name: true, description: true, price: true } },
        appointment_status: { select: { status_name: true } },
      },
    });

    return listAppointmentOfCustomer.map((appointment) => ({
      customer: {
        name: appointment.customer.name,
        email: appointment.customer.email,
        phone: appointment.customer.phone,
      },
      service: {
        name: appointment.service.name,
        description: appointment.service.description,
        price: appointment.service.price,
      },
      appointment: {
        employee: appointment.employee.name,
        dataTime: appointment.date_and_time,
        status: appointment.appointment_status.status_name,
      },
    }));
  }

  async get(): Promise<any[]> {
    const appointmentsList = await prisma.appointment.findMany({
      select: {
        date_and_time: true,
        employee: {
          select: { name: true },
        },
        customer: { select: { name: true, email: true, phone: true } },
        service: { select: { name: true, description: true, price: true } },
        appointment_status: { select: { status_name: true } },
      },
    });

    return appointmentsList.map((appointment) => ({
      customer: {
        name: appointment.customer.name,
        email: appointment.customer.email,
        phone: appointment.customer.phone,
      },
      service: {
        name: appointment.service.name,
        description: appointment.service.description,
        price: appointment.service.price,
      },
      appointment: {
        employee: appointment.employee.name,
        dataTime: appointment.date_and_time,
        status: appointment.appointment_status.status_name,
      },
    }));
  }

  async delete(appointmentId: string, loginId: string): Promise<void> {
    await prisma.appointment.delete({
      where: { appointment_id: appointmentId, customer_id: loginId },
    });
  }

  async save(props: IAppointments): Promise<any> {
    const adapterData = await Appointments_Adapter.adapt(props);
    await prisma.appointment.create({ data: adapterData });
  }
}
