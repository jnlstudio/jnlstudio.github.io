// Renders every site's icon set: tab-16/32/48 (rounded, transparent corners) and full-180/192/512.
import { Browser, sleep } from '/Users/lokuongyao/.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
const [,, SRC, OUT] = process.argv;
const b = await Browser.launch({}); const p = await b.newPage({ width: 600, height: 600 });
await p.send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
await p.goto('file://' + SRC, { settleMs: 600 });
const sites = await p.eval(() => Object.keys(window.SITES));
for (const site of sites) {
  mkdirSync(`${OUT}/${site}`, { recursive: true });
  for (const [kind, sizes] of [['tab', [16, 32, 48]], ['full', [180, 192, 512]]]) for (const s of sizes) {
    await p.eval(([site, kind, s]) => window.paint(site, kind, s), [site, kind, s]); await sleep(40);
    await p.screenshot({ path: `${OUT}/${site}/${kind}-${s}.png`, format: 'png', clip: { x: 0, y: 0, width: s, height: s, scale: 1 } });
  }
  // favicon.ico = PNG images 16/32/48
  const imgs = [16, 32, 48].map((n) => [n, readFileSync(`${OUT}/${site}/tab-${n}.png`)]);
  const head = Buffer.alloc(6); head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(imgs.length, 4);
  let off = 6 + 16 * imgs.length; const dirs = [];
  for (const [n, png] of imgs) { const d = Buffer.alloc(16); d.writeUInt8(n, 0); d.writeUInt8(n, 1); d.writeUInt16LE(1, 4); d.writeUInt16LE(32, 6); d.writeUInt32LE(png.length, 8); d.writeUInt32LE(off, 12); off += png.length; dirs.push(d); }
  writeFileSync(`${OUT}/${site}/favicon.ico`, Buffer.concat([head, ...dirs, ...imgs.map((x) => x[1])]));
}
await b.close(); console.log('rendered', sites.join(', '));
