// Compass Setup status widget. Usage: await dv.view("Meta/views/setup")
// Detects what is still at its template default. Renders booleans only; never shows key values; never writes.
const cfg = dv.page("Meta/Compass Config") || {};
const cur = dv.current() || {};
const rows = [];
const ZH = {
  "Life OS application command registered": "Life OS 应用命令已注册",
  "Dataview JavaScript queries on": "Dataview JavaScript 查询已启用",
  "CSS snippet lifeos on": "lifeos CSS 片段已启用",
  "Periodic Notes daily folder matches config": "Periodic Notes 每日笔记文件夹与配置一致",
  "Templater triggers on new files": "Templater 会在新建文件时触发",
  "QuickAdd captures available as commands": "QuickAdd 记录项已注册为命令",
  "Hotkeys for today's note and the questions prompt": "今日笔记和每日自省快捷键已设置",
  "Birthdate set": "已设置出生日期",
  "Life theme written": "已写下人生主题",
  "Core values written": "已写下核心价值观",
  "Ideal week is yours (example property removed)": "理想一周已个性化（已删除示例属性）",
  "Questions, habits, wheel areas reviewed": "已检查自省问题、习惯和生命之轮领域",
  "Example notes deleted": "已删除示例笔记",
  "Today's daily note exists": "今日笔记已存在",
  "First real daily questions answered": "已完成首次真实每日自省",
  "This week's weekly note exists": "本周笔记已存在",
  "A personal retreat note exists for this quarter": "本季度个人静修复盘笔记已存在",
  "Reading module decided (plan filled, or delete the folder)": "已决定是否使用阅读模块（填写计划或删除文件夹）",
  "Agent Client plugin enabled": "Agent Client 插件已启用",
  "At least one local agent path set in Agent Client": "Agent Client 中已设置至少一个本地智能体路径",
  "Agent login done (self-declared)": "智能体已登录（手动确认）",
  "Obsidian MCP server registered for your agent (self-declared)": "Obsidian MCP 服务器已注册（手动确认）",
  "Agent Client has had a conversation": "Agent Client 已有对话记录",
  "Local REST API enabled": "Local REST API 已启用",
  "REST API key generated (never shown here)": "REST API 密钥已生成（此处不显示）",
  "Vault Lens extension connected (self-declared)": "Vault Lens 扩展已连接（手动确认）",
  "Web viewer core plugin on": "Web viewer 核心插件已启用",
  "SEO scan directory set": "SEO 扫描目录已设置",
  "Backup of the vault folder exists (self-declared)": "仓库文件夹已备份（手动确认）",
  "optional": "可选",
  "keep going": "继续保持",
  "from week 2": "从第 2 周开始",
  "from day 60": "从第 60 天开始",
};
const zh = value => {
  const text = String(value || "");
  if (ZH[text]) return ZH[text];
  const plugin = text.match(/^(.+) plugin enabled$/);
  if (plugin) return `${plugin[1]} 插件已启用`;
  const days = text.match(/^Days answered in the last 30 \(goal 25\)$/);
  if (days) return "最近 30 天的回答天数（目标 25 天）";
  const examples = text.match(/^(\d+) example notes remain$/);
  if (examples) return `还有 ${examples[1]} 篇示例笔记`;
  return text;
};
const add = (tier, item, ok, where, note) => rows.push({ tier, item: zh(item), ok, where: zh(where), note: zh(note) });
const readJson = async p => { try { return JSON.parse(await app.vault.adapter.read(p)); } catch (e) { return null; } };
const readText = async p => { try { const f = app.vault.getAbstractFileByPath(p); return f ? await app.vault.cachedRead(f) : ""; } catch (e) { return ""; } };
const enabled = id => { try { return app.plugins.enabledPlugins.has(id); } catch (e) { return false; } };
const pset = id => { try { return app.plugins.plugins[id]?.settings || null; } catch (e) { return null; } };
const today = moment();

// Tier 0: the app
for (const [id, name] of [["life-os-app", "Life OS"], ["dataview", "Dataview"], ["templater-obsidian", "Templater"], ["periodic-notes", "Periodic Notes"], ["quickadd", "QuickAdd"], ["obsidian-tasks-plugin", "Tasks"], ["obsidian-kanban", "Kanban"]])
  add(0, `${name} plugin enabled`, enabled(id), "Settings → Community plugins");
add(0, "Life OS application command registered", !!app.commands.findCommand("life-os-app:open-home"), "Command palette → Life OS: Open Life OS home");
add(0, "Dataview JavaScript queries on", !!(pset("dataview")?.enableDataviewJs), "Settings → Dataview");
add(0, "CSS snippet lifeos on", (() => { try { return app.customCss.enabledSnippets.has("lifeos"); } catch (e) { return false; } })(), "Settings → Appearance → CSS snippets");
add(0, "Periodic Notes daily folder matches config", (() => { const pn = pset("periodic-notes"); return !!pn && pn.daily?.folder === (cfg.daily_folder || "01 Journal/Daily") && /Daily Note\.md$/.test(pn.daily?.template || ""); })(), "Settings → Periodic Notes");
add(0, "Templater triggers on new files", (() => { const t = pset("templater-obsidian"); return !!t && (t.trigger_on_file_creation === true || t.trigger_on_file_creation_mode === "folder"); })(), "Settings → Templater");
add(0, "QuickAdd captures available as commands", (() => { const ch = pset("quickadd")?.choices || []; return ["lifeos-journal", "lifeos-win", "lifeos-gratitude", "lifeos-task"].every(id => ch.find(c => c.id === id)?.command === true); })(), "Settings → QuickAdd (lightning icon per choice)");
add(0, "Hotkeys for today's note and the questions prompt", (() => { try { const hk = app.hotkeyManager.customKeys || {}; return ["quickadd:choice:lifeos-daily", "templater-obsidian:Templates/Daily Questions Prompt.md"].every(id => (hk[id] || []).length > 0); } catch (e) { return false; } })(), "Settings → Hotkeys");

// Tier 1: make it yours
add(1, "Birthdate set", !!cfg.birthdate && String(cfg.birthdate).slice(0, 10) !== "1990-01-01", "[[Compass Config]]");
const theme = await readText("03 Planning/Life Theme.md");
add(1, "Life theme written", theme.length > 0 && !theme.includes("Replace this line with your life theme"), "[[Life Theme]]");
const values = await readText("03 Planning/Core Values.md");
add(1, "Core values written", values.length > 0 && !/\*\*Value one\*\*/.test(values), "[[Core Values]]");
add(1, "Ideal week is yours (example property removed)", !((dv.page("03 Planning/Ideal Week") || {}).example === true), "[[Ideal Week]]", "fill the grid, then delete the example property");
add(1, "Questions, habits, wheel areas reviewed", Array.isArray(cfg.questions) && cfg.questions.length > 0 && Array.isArray(cfg.habits) && cfg.habits.length <= 5, "[[Compass Config]]", Array.isArray(cfg.habits) && cfg.habits.length > 5 ? "more than 5 habits; keep 3 to 5 per season" : "");
const examples = dv.pages("#example").length;
add(1, "Example notes deleted", examples === 0, "[[16 Onboarding Assistant]] step 6, or delete notes tagged example", examples ? `${examples} example notes remain` : "");

// Tier 2: the practice
const daily = cfg.daily_folder || "01 Journal/Daily";
const dqp = cfg.dq_prefix || "dq_";
add(2, "Today's daily note exists", !!dv.page(`${daily}/${today.format("YYYY-MM-DD")}`), "Ctrl/Cmd+Shift+D");
const real = dv.pages(`"${daily}"`).where(p => /^\d{4}-\d{2}-\d{2}$/.test(p.file.name) && !(p.tags || []).includes("example")).array();
const answered = real.filter(p => Object.entries(p.file.frontmatter || {}).some(([k, v]) => k.startsWith(dqp) && v !== null && v !== "" && v !== undefined));
const last30 = answered.filter(p => today.diff(moment(p.file.name), "days") < 30).length;
add(2, "First real daily questions answered", answered.length > 0, "Ctrl/Cmd+Shift+Q tonight, or [[02 End of Day Coaching]]");
add(2, `Days answered in the last 30 (goal 25)`, last30 >= 25, "keep going", `${last30}/30`);
add(2, "This week's weekly note exists", !!dv.page(`${cfg.weekly_folder || "01 Journal/Weekly"}/${today.format("gggg-[W]ww")}`), "Command palette: Periodic Notes: Open weekly note", "from week 2");
add(2, "A personal retreat note exists for this quarter", !!dv.page(`${cfg.retreat_folder || "02 Retreats"}/${today.format("YYYY-[Q]Q")} Personal Retreat`), "[[04 Workflow - Personal Retreat]]", "from day 60");
const plan = (await readText("09 Reading/Reading Plan.md")).replace(/```[\s\S]*?```/g, "");
if (app.vault.getAbstractFileByPath("09 Reading")) add(2, "Reading module decided (plan filled, or delete the folder)", /^- \[ \]/m.test(plan), "[[07 Workflow - Daily Reading]]", "optional");

// Tier 3: AI in the vault (optional)
add(3, "Agent Client plugin enabled", enabled("agent-client"), "Settings → Community plugins", "optional");
const ac = await readJson(".obsidian/plugins/agent-client/data.json");
const configuredCommands = Object.values(ac?.presetAgents || {}).map(p => p?.command || "").filter(Boolean);
const isLinux = navigator.userAgent.includes("Linux") && !navigator.userAgent.includes("Android");
add(3, "At least one local agent path set in Agent Client", configuredCommands.some(cmd => !isLinux || cmd.startsWith("/")), "Settings → Agent Client → choose an agent → Auto-detect", "optional; on Linux Flatpak use the full path to the wrapper, see Guide 14");
add(3, "Agent login done (self-declared)", cur.setup_claude_login === true, "tick setup_claude_login in this note's properties", "optional; the property name is retained for upgrade compatibility");
add(3, "Obsidian MCP server registered for your agent (self-declared)", cur.setup_mcp_registered === true, "[[19 Obsidian MCP Bridge]] then tick setup_mcp_registered", "optional");
add(3, "Agent Client has had a conversation", (ac?.savedSessions || []).length > 0, "[[AI 助手]]", "optional");

// Tier 4: browser and web (optional)
add(4, "Local REST API enabled", enabled("obsidian-local-rest-api"), "Settings → Community plugins", "optional");
const ra = await readJson(".obsidian/plugins/obsidian-local-rest-api/data.json");
add(4, "REST API key generated (never shown here)", typeof ra?.apiKey === "string" && ra.apiKey.length > 0 && ra?.enableInsecureServer === true, "Settings → Local REST API", "optional");
add(4, "Vault Lens extension connected (self-declared)", cur.setup_vault_lens === true, "[[17 Search Providers]] then tick setup_vault_lens", "optional");
add(4, "Web viewer core plugin on", (() => { try { return app.internalPlugins.plugins.webviewer?.enabled === true; } catch (e) { return false; } })(), "Settings → Core plugins", "optional");
add(4, "SEO scan directory set", ((await readJson(".obsidian/plugins/seo/data.json"))?.scanDirectories || "").includes("06 Writing"), "Settings → SEO", "optional");
add(4, "Backup of the vault folder exists (self-declared)", cur.setup_backup === true, "copy the folder somewhere else, then tick setup_backup");

// Render
const root = dv.container.createEl("div", { cls: "lifeos-widget" });
if (cur.status === "done") { root.createEl("p", { text: "设置已标记为完成。将本笔记的 status 属性改回 open，即可重新打开检查清单。" }); }
else {
  const tiers = { 0: "第 0 层：应用", 1: "第 1 层：个性化", 2: "第 2 层：持续实践", 3: "第 3 层：仓库内 AI（可选）", 4: "第 4 层：浏览器与网页（可选）" };
  const total = rows.filter(r => r.tier <= 2).length, done = rows.filter(r => r.tier <= 2 && r.ok).length;
  root.createEl("p", { text: `必需项已完成 ${done} / ${total}。下方层级均为可选，即使不启用，仓库也可正常工作。` });
  for (const t of [0, 1, 2, 3, 4]) {
    root.createEl("h4", { text: tiers[t] });
    const table = root.createEl("table", { cls: "lifeos-table" });
    const th = table.createEl("thead").createEl("tr"); for (const h of ["", "检查项", "修复位置", "备注"]) th.createEl("th", { text: h });
    const tb = table.createEl("tbody");
    for (const r of rows.filter(x => x.tier === t)) {
      const tr = tb.createEl("tr");
      tr.createEl("td", { text: r.ok ? "✅" : "⬜" });
      tr.createEl("td", { text: r.item });
      const td = tr.createEl("td");
      const m = r.where.match(/^\[\[([^\]]+)\]\]/);
      if (m) { const a = td.createEl("a", { text: m[1], cls: "internal-link", attr: { href: m[1], "data-href": m[1] } }); a.addEventListener("click", e => { e.preventDefault(); app.workspace.openLinkText(m[1], "", false); }); td.appendText(r.where.slice(m[0].length)); }
      else td.setText(r.where);
      tr.createEl("td", { text: r.note });
    }
  }
}
