// Opens a visible Chrome window on PagePilot's login page.
// The user signs in with Google themselves; once the app leaves /login,
// the session is saved to .auth/state.json for the recording script.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const PROFILE = '.auth/chrome-profile';
mkdirSync('.auth', { recursive: true });

const ctx = await chromium.launchPersistentContext(PROFILE, {
  channel: 'chrome',
  headless: false,
  viewport: null,
  args: ['--disable-blink-features=AutomationControlled', '--start-maximized'],
  ignoreDefaultArgs: ['--enable-automation'],
});
const page = ctx.pages()[0] ?? (await ctx.newPage());
await page.goto('https://pilot.packlybd.com/login');
console.log('Waiting for you to sign in with Google in the Chrome window (10 min max)...');

await page.waitForURL(
  (u) => u.hostname === 'pilot.packlybd.com' && !/\/(login|signup)/.test(u.pathname),
  { timeout: 10 * 60 * 1000 },
);
await page.waitForLoadState('networkidle').catch(() => {});
await ctx.storageState({ path: '.auth/state.json' });
console.log('Signed in. Landed on:', page.url());
await ctx.close();
