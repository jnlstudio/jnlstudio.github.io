import { Browser, sleep } from '/Users/lokuongyao/.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs';
const OUT = process.argv[2];
const b = await Browser.launch({});
const p = await b.newPage({ width: 600, height: 700 });
await p.send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
await p.goto('file://' + OUT + '/icons.html', { settleMs: 600 });
async function shot(id, size, name) {
  // scale the svg to the target size, then capture exactly that box
  await p.eval(([id, size]) => { document.querySelectorAll('svg').forEach((s) => s.style.display = s.id === id ? 'block' : 'none'); const s = document.getElementById(id); s.setAttribute('width', size); s.setAttribute('height', size); }, [id, size]);
  await sleep(80);
  await p.screenshot({ path: `${OUT}/${name}`, format: 'png', clip: { x: 0, y: 0, width: size, height: size, scale: 1 } });
}
await shot('tiny', 16, 'small-16.png'); for (const s of [32, 48]) await shot('small', s, `small-${s}.png`);
for (const s of [180, 192, 512]) await shot('badge', s, `badge-${s}.png`);
await shot('small', 256, 'preview-small-256.png');
await b.close();
