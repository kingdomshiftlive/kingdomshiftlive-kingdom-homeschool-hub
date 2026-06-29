import { useEffect } from 'react';

export default function SEOHead({ title, description, canonical, ogImage }) {
  const siteName = 'KingdomShift Homeschool Hub';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Biblical Finance for Kingdom Builders`;
  const defaultDesc = 'Faith-rooted homeschool tools, all 50 state legal guides, curriculum comparisons, and an AI Lesson Planner for Kingdom families.';
  const metaDesc = description || defaultDesc;
  const url = canonical || (typeof window !== 'undefined' ? window.location.href : 'https://faithwealthblueprint.com');
  const image = ogImage || 'https://faithwealthblueprint.com/og-image.png';

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', metaDesc);
    setMeta('robots', 'index, follow');
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', metaDesc, 'property');
    setMeta('og:image', image, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:site_name', siteName, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', metaDesc);
    setMeta('twitter:image', image);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', url);
  }, [fullTitle, metaDesc, image, url]);

  return null;
}
