---
date: <% tp.date.now("YYYY-MM-DD", 0, tp.file.title, "YYYY-MM-DD") %>
tags:
  - daily
<%* const _cf = app.vault.getAbstractFileByPath("Meta/Compass Config.md"); const _cfg = _cf ? (app.metadataCache.getFileCache(_cf)?.frontmatter ?? {}) : {}; const _qs = Array.isArray(_cfg.questions) && _cfg.questions.length ? _cfg.questions.map(q => (q && q.key) ? q.key : q).filter(Boolean) : ["dq_goals","dq_progress","dq_meaning","dq_happy","dq_relationships","dq_engaged"]; const _hs = Array.isArray(_cfg.habits) && _cfg.habits.length ? _cfg.habits : ["habit_journal","habit_exercise","habit_reading"]; tR += _qs.map(k => k + ": ").join("\n") + "\n" + _hs.map(k => k + ": false").join("\n"); %>
---
« [[01 Journal/Daily/<% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>|昨天]] · [[01 Journal/Weekly/<% tp.date.now("gggg-[W]ww", 0, tp.file.title, "YYYY-MM-DD") %>|本周]] · [[01 Journal/Quarterly/<% tp.date.now("YYYY-[Q]Q", 0, tp.file.title, "YYYY-MM-DD") %>|本季度]] · [[Compass Dashboard|人生罗盘]] · [[01 Journal/Daily/<% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>|明天]] »

# <% tp.date.now("dddd, MMMM D, YYYY", 0, tp.file.title, "YYYY-MM-DD") %>

> [!theme]- 人生主题
> ![[Life Theme#Theme]]

> [!reading]- 每日阅读
> ```tasks
> not done
> path includes 09 Reading/Reading Plan
> (scheduled on <% tp.date.now("YYYY-MM-DD", 0, tp.file.title, "YYYY-MM-DD") %>) OR (scheduled before <% tp.date.now("YYYY-MM-DD", 0, tp.file.title, "YYYY-MM-DD") %>)
> sort by scheduled
> hide scheduled date
> hide backlink
> short mode
> ```

> [!intention]- 本周意图
> ![[01 Journal/Weekly/<% tp.date.now("gggg-[W]ww", 0, tp.file.title, "YYYY-MM-DD") %>#本周意图]]
> （本周笔记创建前会显示“无法找到”；按 Ctrl/Cmd+Alt+W 可创建。）

## 今日任务
```tasks
not done
(due on <% tp.date.now("YYYY-MM-DD", 0, tp.file.title, "YYYY-MM-DD") %>) OR (due before <% tp.date.now("YYYY-MM-DD", 0, tp.file.title, "YYYY-MM-DD") %>) OR (scheduled on <% tp.date.now("YYYY-MM-DD", 0, tp.file.title, "YYYY-MM-DD") %>)
path does not include 09 Reading/Reading Plan
sort by due
short mode
```

## 日记


## 今日成就


## 感恩


## 每日自省
今晚：按下每日自省快捷键（Ctrl/Cmd+Shift+Q），或运行命令 **Templater: Insert Templates/Daily Questions Prompt.md**。系统会读取 [[Compass Config|罗盘配置]] 中的问题，并写入上方 `dq_*` 和 `habit_*` 属性。请按 1 至 10 分评估努力程度，而不是结果。

## 往年今日
```dataviewjs
const me = dv.current().file.name;
const cfg = dv.page("Meta/Compass Config") || {};
const folder = cfg.daily_folder || "01 Journal/Daily";
if (/^\d{4}-\d{2}-\d{2}$/.test(me)) {
  const mmdd = me.slice(4);
  const yr = parseInt(me.slice(0, 4));
  const hits = dv.pages(`"${folder}"`).where(p => p.file.name !== me && p.file.name.endsWith(mmdd)).sort(p => p.file.name, "desc");
  if (hits.length === 0) dv.paragraph("*还没有往年记录。留下一条未来的你会感谢的标记吧。*");
  for (const p of hits) {
    const n = yr - parseInt(p.file.name.slice(0, 4));
    dv.header(4, `${n} 年前：${p.file.link}`);
    dv.paragraph(`![[${p.file.name}#日记]]`);
  }
}
```

> [!memento]- 生命倒计时
> ```dataviewjs
> await dv.view("Meta/views/memento");
> ```
