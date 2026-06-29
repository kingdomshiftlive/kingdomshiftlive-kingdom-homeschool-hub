import SEOHead from '../components/ui/SEOHead';

export default function AdminConfig() {
  return (
    <main className="page">
      <SEOHead title="Buyer Control Center | KingdomShift Homeschool Hub" description="Buyer configuration page for KingdomShift Homeschool Hub." canonicalPath="/admin-config" />
      <section className="section">
        <div className="container">
          <h1>Buyer Control Center</h1>
          <p>Configure brand, domain, AI, analytics, email, affiliate, and monetization settings after purchase.</p>
          <ul>
            <li>Business Name: KingdomShift Homeschool Hub</li>
            <li>Domain: Buyer connects custom domain</li>
            <li>AI: Buyer connects own API key</li>
            <li>Email: Buyer connects Mailchimp or preferred provider</li>
            <li>Analytics: Buyer connects GA4, Plausible, or Clarity</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
