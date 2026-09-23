// Compass quick links: capture buttons (QuickAdd commands) + jump to today's multi-scale planning notes.
// Usage: await dv.view("Meta/views/quicklinks")
const cfg = dv.page("Meta/Compass Config") || {};
const DAILY = cfg.daily_folder || "01 Journal/Daily";
const WEEKLY = cfg.weekly_folder || "01 Journal/Weekly";
const QUARTERLY = cfg.quarterly_folder || "01 Journal/Quarterly";
const RETREATS = cfg.retreat_folder || "02 Retreats";
const root = dv.container.createEl("div", { cls: "lifeos-widget" });

const now = moment();
const links = [
  ["今天", `${DAILY}/${now.format("YYYY-MM-DD")}`, now.format("YYYY-MM-DD")],
  ["本周", `${WEEKLY}/${now.format("gggg-[W]ww")}`, now.format("gggg-[W]ww")],
  ["本季度", `${QUARTERLY}/${now.format("YYYY-[Q]Q")}`, now.format("YYYY-[Q]Q")],
  ["静修复盘", `${RETREATS}/${now.format("YYYY-[Q]Q")} Personal Retreat`, `${now.format("YYYY-[Q]Q")} Personal Retreat`],
];
const p = root.createEl("p");
p.appendText("快速前往：");
links.forEach(([lab, path, name], i) => {
  if (i) p.appendText("  ·  ");
  const a = p.createEl("a", { text: `${lab} (${name})`, cls: "internal-link", attr: { href: name, "data-href": name } });
  a.addEventListener("click", e => { e.preventDefault(); app.workspace.openLinkText(name, path, false); });
});

// Stable ids keep localized display names independent from command routing.
const buttons = [
  ["📝 记录日记", "lifeos-journal"],
  ["🏆 记录成就", "lifeos-win"],
  ["🙏 记录感恩", "lifeos-gratitude"],
  ["✅ 添加任务", "lifeos-task"],
];
const wrap = root.createEl("div", { cls: "lifeos-buttons" });
for (const [lab, choiceId] of buttons) {
  const b = wrap.createEl("button", { text: lab });
  b.addEventListener("click", () => {
    const ok = app.commands.executeCommandById(`quickadd:choice:${choiceId}`);
    if (!ok) new Notice(`QuickAdd 命令 ${choiceId} 不存在或尚未启用，请检查 QuickAdd 设置。`);
  });
}
