---
week: <% tp.file.title %>
quarter: <% moment(tp.file.title, "gggg-[W]ww").format("YYYY-[Q]Q") %>
tags:
  - weekly
---
« [[01 Journal/Weekly/<% moment(tp.file.title, "gggg-[W]ww").subtract(1, "week").format("gggg-[W]ww") %>|上周]] · [[01 Journal/Quarterly/<% moment(tp.file.title, "gggg-[W]ww").format("YYYY-[Q]Q") %>|季度]] · [[Compass Dashboard|人生罗盘]] · [[01 Journal/Weekly/<% moment(tp.file.title, "gggg-[W]ww").add(1, "week").format("gggg-[W]ww") %>|下周]] »

# 第 <% moment(tp.file.title, "gggg-[W]ww").format("w") %> 周，<% moment(tp.file.title, "gggg-[W]ww").format("gggg") %>
<% moment(tp.file.title, "gggg-[W]ww").startOf("week").format("MMM D") %> to <% moment(tp.file.title, "gggg-[W]ww").endOf("week").format("MMM D") %>

日期：<%* const s = moment(tp.file.title, "gggg-[W]ww").startOf("week"); const parts = []; for (let i = 0; i < 7; i++) parts.push(`[[01 Journal/Daily/${s.clone().add(i, "day").format("YYYY-MM-DD")}|${s.clone().add(i, "day").format("ddd")}]]`); tR += parts.join(" · "); %>

> [!intention]- 季度意图
> ![[01 Journal/Quarterly/<% moment(tp.file.title, "gggg-[W]ww").format("YYYY-[Q]Q") %>#季度意图]]

## 本周意图
如果本周能够完成，就会推动季度意图的 3 件事。
1. 
2. 
3. 

## 理想一周检查
查看 [[Ideal Week|理想一周]]。上述意图在本周的什么时段真正有位置？现在就调整日历，不要等到周四。

- 

## 本周到期任务
```tasks
not done
due after <% moment(tp.file.title, "gggg-[W]ww").startOf("week").subtract(1, "day").format("YYYY-MM-DD") %>
due before <% moment(tp.file.title, "gggg-[W]ww").endOf("week").add(1, "day").format("YYYY-MM-DD") %>
sort by due
group by filename
```

```agent
type: button
text: "复盘本周"
prompt: "Read Prompts/03 Weekly Review.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
```

## 每周复盘
在周末完成。下方数据来自每日笔记中的努力评分和习惯记录。
```dataviewjs
await dv.view("Meta/views/week", { week: dv.current().file.name });
```

### 哪些事进展顺利

### 哪些事没有进展顺利

### 本周成就
```dataview
LIST L.text
FROM "01 Journal/Daily"
FLATTEN file.lists AS L
WHERE L.section.subpath = "今日成就" AND file.day >= date(<% moment(tp.file.title, "gggg-[W]ww").startOf("week").format("YYYY-MM-DD") %>) AND file.day <= date(<% moment(tp.file.title, "gggg-[W]ww").endOf("week").format("YYYY-MM-DD") %>)
SORT file.name ASC
```
