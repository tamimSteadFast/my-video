// Visits the dashboard with the saved session, lists nav links and screenshots each page.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2];
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ storageState: '.auth/state.json', viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('https://pilot.packlybd.com/dashboard', { waitUntil: 'networkidle' });
console.log('URL', page.url());
const links = await page.$$eval('a[href]', (as) =>
  [...new Set(as.map((a) => a.getAttribute('href') + ' :: ' + a.innerText.trim().replace(/\s+/g, ' ')))],
);
console.log(links.join('\n'));
const paths = [...new Set(links.map((l) => l.split(' :: ')[0]).filter((h) => h.startsWith('/') && !/logout|privacy|terms|data-deletion/.test(h)))];
for (const p of ['/dashboard', ...paths]) {
  await page.goto('https://pilot.packlybd.com' + p, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(800);
  const name = p.replace(/\W+/g, '_') || 'root';
  await page.screenshot({ path: `${OUT}/${name}.png` });
  const text = (await page.innerText('body')).replace(/\s+/g, ' ').slice(0, 700);
  console.log('\n=== ' + p + '\n' + text);
}
await browser.close();
