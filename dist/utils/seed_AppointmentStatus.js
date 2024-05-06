"use strict";

// src/utils/seed_AppointmentStatus.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
async function seedAppointmentStatus() {
  try {
    await prisma.appointmentStatus.createMany({
      data: [
        { appointment_status_id: "1", status_name: "Agendado" },
        { appointment_status_id: "2", status_name: "Confirmado" },
        { appointment_status_id: "3", status_name: "Cancelado" },
        { appointment_status_id: "4", status_name: "Conclu\xEDdo" }
      ]
    });
    console.log("Appointment status seeded successfully.");
  } catch (error) {
    console.error("Error seeding appointment status:", error);
  } finally {
    await prisma.$disconnect();
  }
}
seedAppointmentStatus();
