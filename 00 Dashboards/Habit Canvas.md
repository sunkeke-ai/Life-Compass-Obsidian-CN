习惯数据来自每日笔记中的复选框属性（`habit_*`）。不需要额外应用和通知，也不用为中断记录自责。本页只可视化已有数据，并让习惯记录与当天日记相互印证。

## 最近 8 周
```dataviewjs
await dv.view("Meta/views/habits", { days: 56 });
```

## 最近 2 周
```dataviewjs
await dv.view("Meta/views/habits", { days: 14 });
```

## 修改跟踪的习惯
1. Open [[Compass Config]].
2. Add or remove entries in the `habits` list (keep the `habit_` prefix).
3. Done. New daily notes carry the new checkbox, and this dashboard picks it up automatically.

每个阶段只跟踪少量习惯（3 至 5 个）。真实记录比完美记录更重要。

## 询问
```agent
type: button
text: "分析我的自省和习惯趋势"
prompt: "Read Prompts/13 Trend Analysis.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
```
