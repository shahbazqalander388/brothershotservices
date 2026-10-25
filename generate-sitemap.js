import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCATIONS_DATA } from './src/data/locationsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://brothershotshot.ca';
const TODAY = new Date().toISOString().split('T')[0];

const CORE_PAGES = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/service-areas', priority: '0.9', changefreq: 'weekly' },
  { path: '/quote', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/careers', priority: '0.7', changefreq: 'monthly' },
];

function generateSitemap() {
  console.log('Generating production sitemap for Brothers Hotshot Services...');

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  // 1. Add core static pages
  for (const page of CORE_PAGES) {
    const loc = `${BASE_URL}${page.path}`;
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en-CA" href="${loc}" />\n`;
    xml += `  </url>\n`;
  }

  // 2. Add programmatic district & local hub landing pages
  for (const locItem of LOCATIONS_DATA) {
    const loc = `${BASE_URL}/service-areas/${locItem.slug}`;
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en-CA" href="${loc}" />\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');

  console.log(`✅ Successfully generated sitemap with ${CORE_PAGES.length + LOCATIONS_DATA.length} URLs at ${outputPath}`);
}

generateSitemap();
