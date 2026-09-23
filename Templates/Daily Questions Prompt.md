<%*
/*
  Compass: end-of-day Daily Questions prompt (Marshall Goldsmith, "Triggers").
  Run this template ON the daily note (Templater: Open insert template modal, or the hotkey you assign).
  It asks each question, expects 1..10, then asks yes/no for every habit_* property,
  and writes the answers into the note's properties. Nothing is inserted into the body.
  Questions come from the `questions` list in Meta/Compass Config.md (FALLBACK below is used only if that list is missing). Keep the "Did I do my best to" framing:
  grade effort, not results.
*/
const FALLBACK = [
  ["dq_goals",         "今天我是否尽力设定了清晰的目标？"],
  ["dq_progress",      "今天我是否尽力推进了自己的目标？"],
  ["dq_meaning",       "今天我是否尽力去发现意义？"],
  ["dq_happy",         "今天我是否尽力让自己快乐？"],
  ["dq_relationships", "今天我是否尽力建立积极的人际关系？"],
  ["dq_engaged",       "今天我是否尽力全情投入？"],
];
const file = tp.config.target_file;
const cache = app.metadataCache.getFileCache(file) || {};
const fm = cache.frontmatter || {};
const cfg = app.metadataCache.getFileCache(app.vault.getAbstractFileByPath("Meta/Compass Config.md"))?.frontmatter || {};
const HB = cfg.habit_prefix || "habit_";
const QUESTIONS = Array.isArray(cfg.questions) && cfg.questions.length ? cfg.questions.map(q => typeof q === "string" ? [q, "Did I do my best to " + q.replace(/^dq_/, "").replace(/[_-]+/g, " ") + "?"] : [q.key, q.text]).filter(x => x[0] && x[1]) : FALLBACK;
const answers = {};
let cancelled = false;
for (const [key, q] of QUESTIONS) {
  const a = await tp.system.prompt(`${q}  (1 = 完全没有做到，10 = 已经尽全力)`, fm[key] ? String(fm[key]) : "");
  if (a === null) { cancelled = true; break; }
  const n = parseInt(a);
  if (!isNaN(n)) answers[key] = Math.min(10, Math.max(1, n));
}
if (!cancelled) {
  const habits = Object.keys(fm).filter(k => k.startsWith(HB));
  for (const h of habits) {
    const nice = h.slice(HB.length).replace(/[_-]+/g, " ");
    const pick = await tp.system.suggester(["是", "否"], [true, false], false, `习惯：${nice}？`);
    if (pick === null) break;
    answers[h] = pick;
  }
}
if (Object.keys(answers).length) {
  await app.fileManager.processFrontMatter(file, f => { Object.assign(f, answers); });
  new Notice(`已将 ${Object.keys(answers).length} 项答案保存到 ${file.basename}`);
}
-%>
