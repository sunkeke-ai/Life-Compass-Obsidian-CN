实时读取仓库中的所有看板。卡片从左向右移动，最后一列（完成或已发布）视为完成。看板本质上仍是 Markdown，QuickAdd 的“想法”命令会直接将内容追加到待办列。

```agent
type: button
text: "整理我的看板"
prompt: "Read Prompts/09 Board Grooming.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
```

## 总览
```dataviewjs
await dv.view("Meta/views/boards", { compact: true });
```

## 项目
```dataviewjs
await dv.view("Meta/views/boards", { folder: "04 Projects" });
```

## 写作
```dataviewjs
await dv.view("Meta/views/boards", { folder: "06 Writing" });
```

## 添加看板
1. Create a note anywhere, open the command palette, run **Kanban: Create new board** (or add `kanban-plugin: board` to the properties).
2. Name the lanes. Put finished-state lanes last and call them `Done` or `Published` so the widget counts them as done (edit `board_done_lanes` in [[Compass Config]] to change that list).
3. Optional: in the board's settings set "New note folder" and "Note template" so cards turned into notes use the right template.
