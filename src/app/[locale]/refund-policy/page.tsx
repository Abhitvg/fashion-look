
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hi' }, { locale: 'mr' }, { locale: 'ur' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Refund Policy | Fashion Look Tailors",
    description: "Refund and cancellation policy for bespoke garments and luxury gift boxes at Fashion Look.",
    alternates: {
      canonical: `https://www.fashion-look.in/${locale}/refund-policy`,
    }
  };
}

export default async function RefundPolicyPage() {

  return (
    <div className="pt-32 pb-24 container mx-auto px-4 md:px-8 max-w-4xl min-h-screen text-ivory/80">
      <h1 className="text-4xl md:text-5xl font-serif text-ivory mb-8 uppercase tracking-widest">Refund & Cancellation Policy</h1>
      
      <div className="space-y-8 font-light leading-relaxed">
        <section>
          <p className="text-sm">Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
          <p className="mt-4">
            At Fashion Look, every garment is crafted specifically for you. Because of the bespoke nature of our work, our refund and cancellation policies are structured to protect both the craftsmanship process and your investment.
          </p>
          <p className="mt-4 font-medium text-gold/80">
            Note: We do not accept online payments through our website. All consultations and order confirmations are handled directly via WhatsApp or in-person at our Seawoods atelier.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-gold mb-4 uppercase tracking-wider">1. Bespoke Garments</h2>
          <ul className="list-disc pl-5 space-y-4">
            <li><strong>Advance Deposit:</strong> We require a 50% advance deposit to begin cutting and stitching your fabric.</li>
            <li><strong>Cancellation Before Cutting:</strong> You may cancel your order for a full refund of your deposit within 48 hours of consultation, provided the fabric has not yet been cut.</li>
            <li><strong>Cancellation After Cutting:</strong> Once the fabric has been cut for your specific measurements, the 50% advance deposit becomes non-refundable.</li>
            <li><strong>Final Fitting:</strong> If the final garment requires alterations, we will perform them free of charge within the first 30 days. We do not offer refunds on completed bespoke garments.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-serif text-gold mb-4 uppercase tracking-wider">2. Luxury Gift Boxes</h2>
          <ul className="list-disc pl-5 space-y-4">
            <li><strong>Uncut Fabric:</strong> Unstitched fabric gift boxes may be returned or exchanged within 7 days of delivery, provided the fabric lengths are uncut and in original condition.</li>
            <li><strong>Personalized Boxes:</strong> If the gift box includes custom monogramming or personalization, it is strictly non-returnable and non-refundable.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-serif text-gold mb-4 uppercase tracking-wider">3. Alterations on Outside Garments</h2>
          <p>
            For alteration services on garments not crafted by Fashion Look, payment is due upon completion. If you are unsatisfied with the alteration, we will re-adjust it at no extra cost, but we do not offer monetary refunds for alteration services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-gold mb-4 uppercase tracking-wider">4. Contact Us</h2>
          <p>
            If you have an issue with your order, please contact our master tailor directly via WhatsApp at <strong>+91 81080 14945</strong>. We pride ourselves on our 25+ year heritage and will work with you to ensure you are completely satisfied with the final fit.
          </p>
        </section>
      </div>
    </div>
  );
}
