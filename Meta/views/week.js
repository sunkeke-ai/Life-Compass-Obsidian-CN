// Compass weekly review table: one row per day of the week with daily-question scores and habit hits.
// Usage: await dv.view("Meta/views/week", { week: dv.current().file.name })   // file named gggg-[W]ww
const cfg = dv.page("Meta/Compass Config") || {};
const FOLDER = cfg.daily_folder || "01 Journal/Daily";
const DQ = cfg.dq_prefix || "dq_";
const HB = cfg.habit_prefix || "habit_";
const weekName = (input && input.week) || moment().format("gggg-[W]ww");
const start = moment(weekName, "gggg-[W]ww").startOf("week");
const label = (k, pre) => k.slice(pre.length).replace(/[_-]+/g, " ").replace(/\b\w/g, c => c.toUpperCase());

const days = [];
for (let i = 0; i < 7; i++) days.push(start.clone().add(i, "day"));
const pagesByName = new Map(dv.pages(`"${FOLDER}"`).array().map(p => [p.file.name, p]));
const dqKeys = new Set(), hbKeys = new Set();
for (const d of days) {
  const p = pagesByName.get(d.format("YYYY-MM-DD"));
  if (!p) continue;
  for (const k of Object.keys(p.file.frontmatter || {})) { if (k.startsWith(DQ)) dqKeys.add(k); if (k.startsWith(HB)) hbKeys.add(k); }
}
const dqs = [...dqKeys].sort(), hbs = [...hbKeys].sort();
const header = ["日期", ...dqs.map(k => label(k, DQ)), "习惯"];
const rows = [];
const sums = {}, counts = {};
for (const d of days) {
  const name = d.format("YYYY-MM-DD");
  const p = pagesByName.get(name);
  const fm = p ? (p.file.frontmatter || {}) : null;
  const cells = [p ? dv.fileLink(p.file.path, false, d.format("ddd D")) : d.format("ddd D")];
  for (const k of dqs) {
    const v = fm && fm[k] !== null && fm[k] !== "" && !isNaN(Number(fm[k])) ? Number(fm[k]) : null;
    if (v !== null) { sums[k] = (sums[k] || 0) + v; counts[k] = (counts[k] || 0) + 1; }
    cells.push(v === null ? "" : String(v));
  }
  const hit = fm ? hbs.filter(k => fm[k] === true).length : 0;
  cells.push(fm ? `${hit}/${hbs.length}` : "");
  rows.push(cells);
}
rows.push(["**平均值**", ...dqs.map(k => counts[k] ? (sums[k] / counts[k]).toFixed(1) : ""), ""]);
if (dqs.length === 0 && hbs.length === 0) dv.paragraph(`${weekName} 尚未找到带有 ${DQ}* 或 ${HB}* 属性的每日笔记。`);
else dv.table(header, rows);
