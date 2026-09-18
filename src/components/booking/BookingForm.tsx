"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bookAppointment } from "@/app/actions";
import { services } from "@/content/services";
import { stores } from "@/content/stores";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "Submitting..." : "Request Appointment"}
    </Button>
  );
}

export function BookingForm() {
  const [result, setResult] = useState<{ success?: boolean; message?: string; errors?: any } | null>(null);

  async function action(formData: FormData) {
    const response = await bookAppointment(null, formData);
    setResult(response);
  }

  if (result?.success) {
    return (
      <div className="bg-atelier p-8 border border-gold/20 text-center">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-serif text-ivory mb-4">Request Received</h3>
        <p className="text-ivory/70 mb-8">{result.message}</p>
        <Button onClick={() => setResult(null)} variant="outline">
          Book Another
        </Button>
      </div>
    );
  }

  return (
    <form action={action} className="bg-atelier p-8 md:p-10 border border-gold/10 text-left relative">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs uppercase tracking-widest text-ivory/60 mb-2">Full Name</label>
          <Input name="name" placeholder="Enter your name" required />
          {result?.errors?.name && <p className="text-brand-red text-xs mt-1">{result.errors.name[0]}</p>}
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-ivory/60 mb-2">Phone Number</label>
          <Input name="phone" type="tel" placeholder="+91" required />
          {result?.errors?.phone && <p className="text-brand-red text-xs mt-1">{result.errors.phone[0]}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs uppercase tracking-widest text-ivory/60 mb-2">Email Address</label>
        <Input name="email" type="email" placeholder="Enter your email" required />
        {result?.errors?.email && <p className="text-brand-red text-xs mt-1">{result.errors.email[0]}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs uppercase tracking-widest text-ivory/60 mb-2">Service</label>
          <select name="service" className="flex h-12 w-full border-b border-gold/30 bg-atelier px-3 py-2 text-sm text-ivory focus-visible:outline-none focus-visible:border-gold" required>
            <option value="">Select a service</option>
            {services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
          </select>
          {result?.errors?.service && <p className="text-brand-red text-xs mt-1">{result.errors.service[0]}</p>}
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-ivory/60 mb-2">Atelier Location</label>
          <select name="location" className="flex h-12 w-full border-b border-gold/30 bg-atelier px-3 py-2 text-sm text-ivory focus-visible:outline-none focus-visible:border-gold" required>
            <option value="">Select location</option>
            {stores.map(s => <option key={s.name} value={s.name}>{s.name} - {s.city}</option>)}
          </select>
          {result?.errors?.location && <p className="text-brand-red text-xs mt-1">{result.errors.location[0]}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-xs uppercase tracking-widest text-ivory/60 mb-2">Preferred Date</label>
          <Input name="date" type="date" required className="text-ivory [color-scheme:dark]" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-ivory/60 mb-2">Preferred Time</label>
          <select name="time" className="flex h-12 w-full border-b border-gold/30 bg-atelier px-3 py-2 text-sm text-ivory focus-visible:outline-none focus-visible:border-gold" required>
            <option value="">Select time</option>
            <option value="Morning (10:30 AM - 1:00 PM)">Morning (10:30 AM - 1:00 PM)</option>
            <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
            <option value="Evening (5:00 PM - 9:00 PM)">Evening (5:00 PM - 9:00 PM)</option>
          </select>
        </div>
      </div>
      
      {result?.message && !result?.success && (
        <div className="mb-6 p-4 border border-brand-red/50 bg-brand-red/10 text-brand-red text-sm">
          {result.message}
        </div>
      )}

      <SubmitButton />
      
      <p className="text-center text-xs text-ivory/40 mt-6">
        By booking, you agree to our terms of service. We will contact you shortly to confirm your slot.
      </p>
    </form>
  );
}
