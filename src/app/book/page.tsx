import { BookingForm } from "@/components/booking/BookingForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Private Appointment | Fashion Look",
  description: "Schedule a private consultation at the Fashion Look atelier for bespoke suits, sherwanis, and custom tailoring.",
};

export default function BookPage() {
  return (
    <div className="min-h-screen bg-atelier pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16 text-center">
          <p className="font-sans text-gold text-sm tracking-[0.2em] uppercase mb-4">
            Private Consultation
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory uppercase tracking-wide">
            Book an Appointment
          </h1>
          <p className="font-sans text-muted mt-6 max-w-xl mx-auto">
            Experience the pinnacle of Indian bespoke tailoring. From fabric selection to final fitting, every detail is crafted around you.
          </p>
        </header>

        <div className="bg-atelier-soft p-8 md:p-12 border border-white/5 rounded-sm">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
