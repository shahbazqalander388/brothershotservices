import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO helper component to dynamically update page titles, meta descriptions,
 * canonical links, and Open Graph tags for single-page client routing.
 */
export default function SEO({ title, description, canonical }) {
  const location = useLocation();

  useEffect(() => {
    // 1. Update document title
    if (title) {
      document.title = title;
    }

    // 2. Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // 3. Update Canonical link
    const targetUrl = canonical || `https://brothershotshot.ca${location.pathname === '/' ? '' : location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', targetUrl);

    // 4. Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) {
      ogTitle.setAttribute('content', title);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) {
      ogDesc.setAttribute('content', description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', targetUrl);
    }
  }, [title, description, canonical, location.pathname]);

  return null;
}
