import { useEffect } from 'react';

const SITE_NAME = 'KingdomShift KingdomShift Homeschool Hub';
const SITE_URL = 'https://kingdomshifthomeschoolhub.com';
const DEFAULT_DESC = 'Faith-rooted homeschool planning tools, all 50 state legal guides, curriculum comparisons, and an AI Lesson Planner for Kingdom families.';

export default function SEOHead({ title, description, canonical, canonicalPath, ogImage }) {
  const fullTitle = title ? (title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`) : `${SITE_NAME} — Raise World-Changers at Home`;
  const metaDesc = description || DEFAULT_DESC;
  const path = canonicalPath || canonical || '/';
  const url = path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const image = ogImage || `${SITE_URL}/og-image.svg`;

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
    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', metaDesc);
    setMeta('twitter:image', image);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);
  }, [fullTitle, metaDesc, image, url]);

  return null;
}
