// Records short, read-only screen clips of PagePilot with the saved session.
// Nothing is saved or submitted: the script only navigates, hovers, scrolls,
// types into search boxes and opens forms/menus without submitting them.
// Usage: node tools/recorder/pagepilot-clips.mjs [clipName ...]
import { chromium } from 'playwright';
import { mkdirSync, renameSync, rmSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const BASE = 'https://pilot.packlybd.com';
const W = 1600;
const H = 1000;
const OUT = 'public/pagepilot-promo/recordings';
const TMP = '.auth/rec-tmp';
mkdirSync(OUT, { recursive: true });

// Ensure .auth/state.json has a fresh accessToken before recording
async function ensureFreshAuth() {
  try {
    const raw = JSON.parse(readFileSync('.auth/state.json', 'utf8'));
    const origin = raw.origins?.find((o) => o.origin === BASE);
    const refreshItem = origin?.localStorage?.find((x) => x.name === 'pp.refresh');
    const accessItem = origin?.localStorage?.find((x) => x.name === 'pp.access');
    if (!refreshItem || !accessItem) return;
    const res = await fetch(`${BASE}/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: refreshItem.value }),
    });
    if (res.ok) {
      const data = await res.json();
      accessItem.value = data.accessToken;
      refreshItem.value = data.refreshToken;
      writeFileSync('.auth/state.json', JSON.stringify(raw, null, 2));
      console.log('Refreshed .auth/state.json accessToken.');
    }
  } catch (e) {
    console.warn('Auth refresh skipped:', e.message);
  }
}

// A visible cursor + click ripple, since headless recordings show no pointer.
const CURSOR = `
(() => {
  if (window.__ppCursor) return; window.__ppCursor = true;
  const add = () => {
    const c = document.createElement('div');
    c.id = '__cursor';
    c.style.cssText = 'position:fixed;left:0;top:0;width:24px;height:24px;margin:-4px 0 0 -4px;z-index:2147483647;pointer-events:none;transition:transform .05s';
    c.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M4 2l16 9-7 2-3 7z" fill="#0F1729" stroke="#2FD4A8" stroke-width="1.8" stroke-linejoin="round"/></svg>';
    document.body.appendChild(c);
    document.addEventListener('mousemove', e => { c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px'; }, true);
    document.addEventListener('mousedown', e => {
      const r = document.createElement('div');
      r.style.cssText = 'position:fixed;z-index:2147483646;pointer-events:none;border-radius:50%;width:44px;height:44px;margin:-22px 0 0 -22px;background:rgba(47,212,168,.38);border:2px solid rgba(47,212,168,.8);left:'+e.clientX+'px;top:'+e.clientY+'px;transition:all .45s ease-out';
      document.body.appendChild(r);
      requestAnimationFrame(() => { r.style.transform = 'scale(1.9)'; r.style.opacity = '0'; });
      setTimeout(() => r.remove(), 600);
    }, true);
  };
  if (document.body) add(); else document.addEventListener('DOMContentLoaded', add);
})();`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function smoothScroll(page, total, { step = 6, delay = 16, x = W / 2, y = H / 2 } = {}) {
  await page.mouse.move(x, y, { steps: 20 });
  const n = Math.abs(Math.round(total / step));
  for (let i = 0; i < n; i++) {
    await page.mouse.wheel(0, Math.sign(total) * step);
    await sleep(delay);
  }
}

async function moveTo(page, locator, steps = 35) {
  const box = await locator.boundingBox().catch(() => null);
  if (!box) return;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps });
  await sleep(250);
}

async function clickSlow(page, locator) {
  await moveTo(page, locator);
  await locator.click().catch(() => {});
}

const clips = {
  async dashboard(page) {
    await page.goto(BASE + '/dashboard', { waitUntil: 'networkidle' });
    await sleep(1400);
    await moveTo(page, page.getByText("Today's Revenue").first());
    await sleep(700);
    await moveTo(page, page.getByText('AI Sales Impact').first());
    await sleep(700);
    await moveTo(page, page.getByText('Action Center').first());
    await sleep(700);
    await moveTo(page, page.getByText('AI Credits Balance').first());
    await sleep(700);
    await smoothScroll(page, 550);
    await sleep(1000);
    await smoothScroll(page, -550);
    await sleep(1000);
  },

  async inbox(page) {
    await page.goto(BASE + '/inbox', { waitUntil: 'networkidle' });
    await sleep(1400);
    const conv = page.getByText('Customer #4740').first();
    await clickSlow(page, conv);
    await page.waitForLoadState('networkidle').catch(() => {});
    await sleep(2200);
    await smoothScroll(page, -900, { x: W * 0.6, y: H * 0.45 });
    await sleep(800);
    await smoothScroll(page, 1100, { x: W * 0.6, y: H * 0.45, delay: 20 });
    await sleep(2200);
  },

  async catalog(page) {
    await page.goto(BASE + '/catalog', { waitUntil: 'networkidle' });
    await sleep(1400);
    await smoothScroll(page, 550, { delay: 18 });
    await sleep(800);
    await smoothScroll(page, -550);
    const search = page.getByPlaceholder(/Search by name/);
    await clickSlow(page, search);
    await page.keyboard.type('saree', { delay: 150 });
    await sleep(2200);
    await search.fill('');
    await page.keyboard.type('dress', { delay: 150 });
    await sleep(2200);
  },

  async orders(page) {
    await page.goto(BASE + '/orders', { waitUntil: 'networkidle' });
    await sleep(1400);
    const btn = page.getByRole('button', { name: /New order/i }).or(page.getByRole('link', { name: /New order/i })).first();
    await clickSlow(page, btn);
    await sleep(2200);
    await smoothScroll(page, 450, { delay: 20 });
    await sleep(1400);
  },

  async agent(page) {
    await page.goto(BASE + '/agent', { waitUntil: 'networkidle' });
    await sleep(1500);
    await moveTo(page, page.getByText(/AI Level: Smart/i).first());
    await sleep(700);
    await smoothScroll(page, 700, { delay: 18 });
    await sleep(1000);
    await smoothScroll(page, 650, { delay: 18 });
    await sleep(1200);
  },

  async integrations(page) {
    await page.goto(BASE + '/integrations', { waitUntil: 'networkidle' });
    await sleep(1400);
    await moveTo(page, page.getByText('Steadfast Courier').first());
    await sleep(800);
    await moveTo(page, page.getByText('WooCommerce Catalog').first());
    await sleep(800);
    await smoothScroll(page, 700, { delay: 18 });
    await sleep(1200);
  },

  async widget(page) {
    await page.goto(BASE + '/widget', { waitUntil: 'networkidle' });
    await sleep(1400);
    await smoothScroll(page, 800, { delay: 18 });
    await sleep(1400);
  },

  async billing(page) {
    await page.goto(BASE + '/billing', { waitUntil: 'networkidle' });
    await sleep(1400);
    await moveTo(page, page.getByText(/Prepaid Wallet/i).first());
    await sleep(800);
    await moveTo(page, page.getByText(/Monthly Plan/i).first());
    await sleep(800);
    await smoothScroll(page, 600, { delay: 18 });
    await sleep(1400);
  },

  async settings(page) {
    await page.goto(BASE + '/settings', { waitUntil: 'networkidle' });
    await sleep(1400);
    for (const tab of ['Delivery Charges', 'Saved Replies', 'Channels', 'Appearance']) {
      const el = page.getByText(tab, { exact: true }).first();
      if (await el.isVisible().catch(() => false)) {
        await clickSlow(page, el);
        await sleep(1800);
      }
    }
  },

  async login(page) {
    // Signed-out view of the login and signup pages
    await page.goto(BASE + '/login', { waitUntil: 'networkidle' });
    await sleep(1200);
    const gbtn = page.locator('iframe[src*="accounts.google.com"], iframe[title*="Google"], iframe').first();
    await moveTo(page, gbtn, 35);
    await sleep(1200);
    const createLink = page.getByRole('link', { name: /Create an account/i }).first();
    if (await createLink.isVisible().catch(() => false)) {
      await clickSlow(page, createLink);
      await sleep(1500);
      const shopInput = page.getByPlaceholder(/Rahim Fashion House/i).first();
      if (await shopInput.isVisible().catch(() => false)) {
        await clickSlow(page, shopInput);
        await page.keyboard.type('Arong Style BD', { delay: 110 });
        await sleep(1500);
      }
    }
  },
};

await ensureFreshAuth();
const wanted = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(clips);
const browser = await chromium.launch();
for (const name of wanted) {
  rmSync(TMP, { recursive: true, force: true });
  const ctx = await browser.newContext({
    storageState: name === 'login' ? undefined : '.auth/state.json',
    viewport: { width: W, height: H },
    deviceScaleFactor: 1,
    recordVideo: { dir: TMP, size: { width: W, height: H } },
  });
  await ctx.addInitScript(CURSOR);
  const page = await ctx.newPage();
  const t0 = Date.now();
  try {
    await clips[name](page);
  } catch (e) {
    console.error(`[${name}] ${e.message.split('\n')[0]}`);
  }
  await ctx.close();
  const webm = readdirSync(TMP).find((f) => f.endsWith('.webm'));
  const raw = `${TMP}/${name}.webm`;
  renameSync(`${TMP}/${webm}`, raw);
  // Re-encode to H.264 and trim first 0.35s of blank white initial navigation frame
  execFileSync('npx', [
    'remotion',
    'ffmpeg',
    '-y',
    '-loglevel',
    'error',
    '-ss',
    '0.35',
    '-i',
    raw,
    '-c:v',
    'libx264',
    '-pix_fmt',
    'yuv420p',
    '-r',
    '30',
    '-crf',
    '18',
    '-an',
    `${OUT}/${name}.mp4`,
  ]);
  console.log(`${name}: ${((Date.now() - t0) / 1000).toFixed(1)}s -> ${OUT}/${name}.mp4`);
}
await browser.close();
rmSync(TMP, { recursive: true, force: true });
