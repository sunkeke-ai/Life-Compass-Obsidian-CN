---
quarter: <% tp.file.title %>
retreat: "[[02 Retreats/<% tp.file.title %> Personal Retreat]]"
focus_area: 
tags:
  - quarterly
---
« [[01 Journal/Quarterly/<% moment(tp.file.title, "YYYY-[Q]Q").subtract(1, "quarter").format("YYYY-[Q]Q") %>|上季度]] · [[Compass Dashboard|人生罗盘]] · [[01 Journal/Quarterly/<% moment(tp.file.title, "YYYY-[Q]Q").add(1, "quarter").format("YYYY-[Q]Q") %>|下季度]] »

<% moment(tp.file.title, "YYYY-[Q]Q").startOf("quarter").format("MMM D") %> to <% moment(tp.file.title, "YYYY-[Q]Q").endOf("quarter").format("MMM D, YYYY") %> · Retreat: [[02 Retreats/<% tp.file.title %> Personal Retreat]]

> [!theme]- 人生主题与核心价值观
> ![[Life Theme#Theme]]
> ![[Core Values#Values]]

```agent
type: button
text: "准备个人静修复盘"
prompt: "Read Prompts/04 Retreat Prep.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
```

## 季度意图
在个人静修复盘时设定。将它们复制到此处（或嵌入复盘章节），以便每周笔记自动引用。
![[<% tp.file.title %> Personal Retreat#5. Intentions for next quarter]]

## 焦点领域（来自生命之轮）
- 

## 本季度项目
```dataview
TABLE WITHOUT ID file.link AS Project, status, area, due
FROM "04 Projects"
WHERE quarter = "<% tp.file.title %>" AND status != "done"
SORT due ASC
```

## 周次
```dataview
LIST
FROM "01 Journal/Weekly"
WHERE quarter = "<% tp.file.title %>"
SORT file.name ASC
```

## 本季度每日自省
```dataviewjs
await dv.view("Meta/views/dailyquestions", { from: "<% moment(tp.file.title, "YYYY-[Q]Q").startOf("quarter").format("YYYY-MM-DD") %>", to: "<% moment(tp.file.title, "YYYY-[Q]Q").endOf("quarter").format("YYYY-MM-DD") %>" });
```

## 季度末备忘
将这些内容带入下一次个人静修复盘。
- 
