// Deterministic checks for the company-subdomain deployment guide.
// Run with: node scripts/deploy-guide-check.mjs

import fs from 'node:fs';
import path from 'node:path';

const here = new URL('.', import.meta.url).pathname;
const source = fs.readFileSync(path.join(here, '..', 'content', 'company-deployment.html'), 'utf8');
const generated = fs.existsSync(path.join(here, '..', 'public', 'company-deployment.html'))
  ? fs.readFileSync(path.join(here, '..', 'public', 'company-deployment.html'), 'utf8')
  : '';

const hostname = 'trestle.company.com';
const health = '/system/health';

for (const needle of [hostname, 'Caddy', 'nginx', health, '127.0.0.1:8090', 'independently', 'TRESTLE_TRUSTED_PROXIES', 'TRESTLE_DATABASE_PROVIDER', '--env-file']) {
  if (!source.includes(needle)) throw new Error(`deployment guide is missing ${needle}`);
}
if (!source.includes('Type: A') || !source.includes('Type: CNAME')) {
  throw new Error('deployment guide must show both A/AAAA and CNAME DNS examples');
}
for (const sub of ['cortex.company.com', 'warden.company.com', 'trestle.company.com', 'watchpost.company.com']) {
  if (!source.includes(sub)) throw new Error(`ecosystem map must name ${sub}`);
}
for (const leftover of ['@pathto', '@input', '@include']) {
  if (generated && generated.includes(leftover)) throw new Error(`generated output contains unresolved ${leftover}`);
}
if (generated && !generated.includes(hostname)) throw new Error('generated deploy page is stale');

console.log(`trestle deploy-guide check: ok (${hostname}, ${health})`);