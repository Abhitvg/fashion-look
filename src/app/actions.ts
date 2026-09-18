"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  service: z.string().min(1, "Please select a service"),
  location: z.string().min(1, "Please select a location"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  notes: z.string().optional(),
});

export async function bookAppointment(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = bookingSchema.parse(rawData);

    // Save to SQLite via Prisma
    const appointment = await prisma.appointment.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        service: validatedData.service,
        location: validatedData.location,
        date: validatedData.date,
        time: validatedData.time,
        notes: validatedData.notes,
        status: "PENDING",
      },
    });

    return { success: true, message: "Appointment request received. Our team will contact you to confirm availability.", id: appointment.id };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: "An unexpected error occurred. Please try again or contact us on WhatsApp." };
  }
}
