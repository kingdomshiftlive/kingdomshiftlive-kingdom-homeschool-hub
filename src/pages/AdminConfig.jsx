import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Download, RefreshCw, Save, Settings, ShieldCheck, Sparkles } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import './AdminConfig.css';

const STORAGE_KEY = 'kingdomShiftHomeschoolBuyerConfig';

const defaultConfig = {
  businessName: 'KingdomShift Homeschool Hub',
  tagline: 'Raise World-Changers at Home',
  domain: 'https://kingdomshifthomeschoolhub.com',
  contactEmail: 'hello@kingdomshifthomeschoolhub.com',
  primaryColor: '#4A7C4A',
  accentColor: '#D8A94A',
  aiProvider: 'Buyer connects preferred provider',
  aiApiKeyStatus: 'No seller API keys included',
  mailchimpAudience: 'Buyer connects own audience/form',
  adsensePublisherId: 'ca-pub-REPLACE_ME',
  analyticsId: 'G-REPLACE_ME',
  gumroadProductUrl: 'https://gumroad.com/l/replace-me',
  affiliateTag: 'replace-me',
  socialInstagram: 'https://instagram.com/replace-me',
  socialPinterest: 'https://pinterest.com/replace-me',
  leadMagnetTitle: 'The KingdomShift Homeschool Hub Starter Guide',
};

const fields = [
  ['businessName', 'Business Name', 'Brand shown across the site'],
  ['tagline', 'Tagline', 'Short promise shown in header/footer'],
  ['domain', 'Domain / Live URL', 'Buyer updates after domain transfer'],
  ['contactEmail', 'Contact Email', 'Used for contact and legal pages'],
  ['primaryColor', 'Primary Color', 'Main brand color'],
  ['accentColor', 'Accent / Gold Color', 'Luxury highlight color'],
  ['aiProvider', 'AI Provider', 'OpenAI, Anthropic, or future provider'],
  ['aiApiKeyStatus', 'AI API Key Status', 'Buyer connects own API credentials'],
  ['mailchimpAudience', 'Mailchimp Audience / Form', 'Newsletter connection notes'],
  ['adsensePublisherId', 'AdSense Publisher ID', 'Buyer replaces with their own ID'],
  ['analyticsId', 'Analytics ID', 'GA4, Plausible, or other analytics'],
  ['gumroadProductUrl', 'Digital Product URL', '$17-$37 guide/workbook/product link'],
  ['affiliateTag', 'Affiliate Tracking ID', 'Buyer affiliate tracking tag'],
  ['socialInstagram', 'Instagram URL', 'Social profile'],
  ['socialPinterest', 'Pinterest URL', 'Pinterest profile'],
  ['leadMagnetTitle', 'Lead Magnet Title', 'Free PDF / opt-in offer'],
];

function loadConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultConfig, ...JSON.parse(saved) } : defaultConfig;
  } catch {
    return defaultConfig;
  }
}

export default function AdminConfig() {
  const [config, setConfig] = useState(loadConfig);
  const completed = useMemo(() => {
    const values = Object.values(config).filter(Boolean).length;
    return Math.round((values / Object.keys(defaultConfig).length) * 100);
  }, [config]);

  const handleChange = (key, value) => setConfig(prev => ({ ...prev, [key]: value }));

  const saveConfig = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config, null, 2));
    toast.success('Buyer configuration saved in this browser.');
  };

  const resetConfig = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(defaultConfig);
    toast.success('Configuration reset to starter values.');
  };

  const exportConfig = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kingdomshift-homeschool-hub-buyer-config.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast.success('Configuration export downloaded.');
  };

  return (
    <div className="admin-config-page">
      <SEOHead title="Buyer Control Center" description="Buyer configuration dashboard for KingdomShift Homeschool Hub." canonicalPath="/admin-config" />

      <section className="admin-hero">
        <div className="container admin-hero__grid">
          <div>
            <div className="admin-eyebrow"><Settings size={16} /> Buyer Control Center</div>
            <h1>Configure the homeschool platform after purchase without hunting through code.</h1>
            <p>This dashboard organizes the buyer's branding, domain, AI, analytics, email, affiliate, ad, social, and digital product settings in one place.</p>
            <div className="admin-actions">
              <button className="btn btn--primary" onClick={saveConfig}><Save size={16} /> Save Configuration</button>
              <button className="btn btn--secondary" onClick={exportConfig}><Download size={16} /> Export JSON</button>
            </div>
          </div>
          <div className="admin-score-card">
            <Sparkles size={28} />
            <strong>{completed}%</strong>
            <span>Configuration completeness</span>
            <p>Use this after the Flippa sale closes to make buyer setup easier.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container admin-grid">
          <div className="admin-panel">
            <h2>Business & Brand Settings</h2>
            <div className="admin-form-grid">
              {fields.map(([key, label, help]) => (
                <label className="admin-field" key={key}>
                  <span>{label}</span>
                  <input type={key.toLowerCase().includes('color') ? 'color' : 'text'} value={config[key] || ''} onChange={(e) => handleChange(key, e.target.value)} />
                  <small>{help}</small>
                </label>
              ))}
            </div>
            <div className="admin-actions admin-actions--bottom">
              <button className="btn btn--primary" onClick={saveConfig}><Save size={16} /> Save</button>
              <button className="btn btn--secondary" onClick={exportConfig}><Download size={16} /> Export</button>
              <button className="btn btn--ghost" onClick={resetConfig}><RefreshCw size={16} /> Reset</button>
            </div>
          </div>

          <aside className="admin-preview">
            <h2>Buyer Handoff Preview</h2>
            <div className="preview-card" style={{ borderColor: config.primaryColor }}>
              <span className="preview-badge" style={{ background: config.primaryColor }}>Configured Asset</span>
              <h3>{config.businessName}</h3>
              <p>{config.tagline}</p>
              <ul>
                <li><strong>Domain:</strong> {config.domain}</li>
                <li><strong>Email:</strong> {config.contactEmail}</li>
                <li><strong>AI:</strong> {config.aiProvider}</li>
                <li><strong>Lead Magnet:</strong> {config.leadMagnetTitle}</li>
                <li><strong>Digital Product:</strong> {config.gumroadProductUrl}</li>
              </ul>
            </div>
            <div className="admin-safe-note">
              <ShieldCheck size={20} />
              <div>
                <strong>Seller protection note</strong>
                <p>Transfer the code and docs. The buyer connects their own domain, email provider, affiliate accounts, analytics, AdSense, Gumroad, and AI keys.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
