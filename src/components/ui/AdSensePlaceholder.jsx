import { useEffect } from 'react';

/**
 * ADSENSE INTEGRATION
 * 
 * TO ACTIVATE:
 * 1. Apply at google.com/adsense
 * 2. Once approved, replace YOUR-ADSENSE-CLIENT-ID with your ca-pub-XXXXXXXXXXXXXXXX
 * 3. Replace YOUR-AD-SLOT-ID with your actual ad slot IDs from AdSense dashboard
 * 4. Uncomment the script tag in index.html (instructions below)
 * 5. Push to GitHub — Netlify auto-deploys
 * 
 * IN index.html, add this inside <head> after approval:
 * <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR-PUBLISHER-ID" crossorigin="anonymous"></script>
 */

const ADSENSE_CLIENT = 'YOUR-ADSENSE-CLIENT-ID'; // Replace: ca-pub-XXXXXXXXXXXXXXXX
const AD_SLOTS = {
  banner: 'YOUR-AD-SLOT-ID',      // Replace with slot ID from AdSense
  rectangle: 'YOUR-AD-SLOT-ID-2', // Replace with slot ID from AdSense
  sidebar: 'YOUR-AD-SLOT-ID-3',   // Replace with slot ID from AdSense
};

export default function AdSensePlaceholder({ slot = 'banner', style = {} }) {
  const isConfigured = ADSENSE_CLIENT !== 'YOUR-ADSENSE-CLIENT-ID';

  useEffect(() => {
    if (isConfigured && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.log('AdSense:', e);
      }
    }
  }, [isConfigured]);

  // Show placeholder until AdSense is configured
  if (!isConfigured) {
    return (
      <div style={{
        background: 'var(--bg-secondary)',
        border: '2px dashed var(--border-medium)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.78rem',
        margin: '1rem 0',
        ...style,
      }}>
        📢 Ad Space — Connect Google AdSense (see README for instructions)
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={AD_SLOTS[slot] || AD_SLOTS.banner}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
