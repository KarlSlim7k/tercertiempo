// Validate presentacion.html visually and capture issues
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const html = 'file://' + process.cwd().replace(/\\/g, '/') + '/presentacion.html';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const page = await ctx.newPage();

const consoleMsgs = [];
const pageErrors = [];
page.on('console', m => consoleMsgs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', e => pageErrors.push(`[pageerror] ${e.message}`));
page.on('requestfailed', r => pageErrors.push(`[requestfailed] ${r.url()} :: ${r.failure()?.errorText}`));

await page.goto(html, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

const issues = await page.evaluate(() => {
  const out = [];
  // Check logo images loaded
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete || img.naturalWidth === 0) {
      out.push(`IMG NOT LOADED: ${img.id || img.alt || img.src.slice(0,60)}`);
    }
  });
  // Check each slide for overflow
  document.querySelectorAll('.slide').forEach((s, idx) => {
    const stage = document.getElementById('stage');
    const r = s.getBoundingClientRect();
    const sr = stage.getBoundingClientRect();
    if (r.height > sr.height + 4) {
      out.push(`SLIDE ${idx} OVERFLOWS vertically: ${r.height} > ${sr.height}`);
    }
    // Check inner elements overflowing slide
    s.querySelectorAll('.team, .panel, .match, .cover, .table-wrap').forEach(el => {
      const er = el.getBoundingClientRect();
      if (er.height > sr.height) {
        out.push(`SLIDE ${idx} element ${el.className.split(' ')[0]} too tall: ${Math.round(er.height)}px`);
      }
    });
  });
  // Check counter
  const counter = document.getElementById('counter');
  out.push(`Counter text: ${counter?.textContent}`);
  // Active slide
  const active = document.querySelector('.slide.active');
  out.push(`Active slide index: ${active?.dataset.slide}`);
  // Logo dimensions
  const lc = document.getElementById('logoCrea');
  const lt = document.getElementById('logoTT');
  if (lc) out.push(`logoCrea: ${lc.naturalWidth}x${lc.naturalHeight} (rendered ${Math.round(lc.getBoundingClientRect().width)}x${Math.round(lc.getBoundingClientRect().height)})`);
  if (lt) out.push(`logoTT: ${lt.naturalWidth}x${lt.naturalHeight} (rendered ${Math.round(lt.getBoundingClientRect().width)}x${Math.round(lt.getBoundingClientRect().height)})`);
  return out;
});

console.log('=== ISSUES ===');
issues.forEach(i => console.log(' - ' + i));
console.log('\n=== CONSOLE ===');
consoleMsgs.forEach(m => console.log(' ' + m));
console.log('\n=== PAGE ERRORS ===');
pageErrors.forEach(e => console.log(' ' + e));

// Capture each slide
for (let i = 0; i < 6; i++) {
  await page.evaluate(idx => {
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    document.querySelector(`.slide[data-slide="${idx}"]`).classList.add('active');
  }, i);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `presentacion-slide-${i+1}.png`, fullPage: false });
  console.log(`Captured slide ${i+1}`);
}

await browser.close();
