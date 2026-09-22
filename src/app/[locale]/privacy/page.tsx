
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hi' }, { locale: 'mr' }, { locale: 'ur' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Privacy Policy | Fashion Look Tailors",
    description: "Privacy policy and data handling practices for Fashion Look Tailors in Seawoods, Navi Mumbai.",
    alternates: {
      canonical: `https://www.fashion-look.in/${locale}/privacy`,
    }
  };
}

export default async function PrivacyPolicyPage() {

  return (
    <div className="pt-32 pb-24 container mx-auto px-4 md:px-8 max-w-4xl min-h-screen text-ivory/80">
      <h1 className="text-4xl md:text-5xl font-serif text-ivory mb-8 uppercase tracking-widest">Privacy Policy</h1>
      
      <div className="space-y-8 font-light leading-relaxed">
        <section>
          <p className="text-sm">Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
          <p className="mt-4">
            Fashion Look (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you visit our website (fashion-look.in) or interact with us via WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-gold mb-4 uppercase tracking-wider">1. Information We Collect</h2>
          <p className="mb-2">We collect minimal information necessary to provide our tailoring services:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Contact Information:</strong> When you book a home visit or request a quote via WhatsApp, we collect your name and phone number.</li>
            <li><strong>Service Data:</strong> Measurements, fabric choices, and stylistic preferences provided during your consultation.</li>
            <li><strong>Analytics:</strong> We use Google Analytics to understand how visitors use our website. This collects anonymous usage data such as pages visited and time spent on the site.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-serif text-gold mb-4 uppercase tracking-wider">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To schedule and fulfill bespoke tailoring appointments (including home visits).</li>
            <li>To communicate with you regarding your orders, fittings, and quotations.</li>
            <li>To maintain your measurement profile for future orders.</li>
            <li>To improve our website experience via aggregated analytics.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-serif text-gold mb-4 uppercase tracking-wider">3. Information Sharing</h2>
          <p>
            We do not sell, rent, or share your personal information with third parties for marketing purposes. Your measurements and order history are kept strictly confidential within our atelier.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-gold mb-4 uppercase tracking-wider">4. Contact Us</h2>
          <p>
            For any privacy-related questions or to request the deletion of your measurement profile, please contact us via WhatsApp at <strong>+91 81080 14945</strong> or visit our atelier in Seawoods, Navi Mumbai.
          </p>
        </section>
      </div>
    </div>
  );
}
