// Compass Memento Mori widget. Usage: await dv.view("Meta/views/memento")
// Reads birthdate and life_expectancy from Meta/Compass Config.
const cfg = dv.page("Meta/Compass Config") || {};
const root = dv.container.createEl("div", { cls: "lifeos-widget" });
if (!cfg.birthdate) {
  root.createEl("p", { text: "请在 Meta/Compass Config 中设置 `birthdate` (YYYY-MM-DD) 和 `life_expectancy`，以启用生命倒计时。" });
} else {
  const birth = moment(String(cfg.birthdate).slice(0, 10));
  const years = Number(cfg.life_expectancy) || 80;
  const today = moment().startOf("day");
  const weeksLived = today.diff(birth, "weeks");
  const totalWeeks = Math.round(years * 52.1775);
  const weeksLeft = Math.max(0, totalWeeks - weeksLived);
  const pct = Math.min(100, Math.round(1000 * weeksLived / totalWeeks) / 10);
  const age = today.diff(birth, "years");
  root.createEl("p", { text: `你今年 ${age} 岁，大约已生活 ${weeksLived.toLocaleString()} 周。如果活到 ${years} 岁，大约还剩 ${weeksLeft.toLocaleString()} 周（已使用 ${pct}%）。` });
  const bar = root.createEl("div", { cls: "lifeos-bar" });
  bar.createEl("div").style.width = pct + "%";
  const grid = root.createEl("div", { cls: "lifeos-years" });
  grid.style.marginTop = "0.5em";
  for (let y = 0; y < years; y++) {
    const s = grid.createEl("span");
    if (y < age) s.addClass("lived");
    if (y === age) s.addClass("now");
    s.title = `${y} 岁`;
  }
  root.createEl("p", { text: "每个方块代表一年。有意识地度过下一年。" }).style.opacity = "0.6";
}
