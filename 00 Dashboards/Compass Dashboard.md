---
cssclasses:
  - lifeos-dashboard
---
下方内容会根据你已经写下的笔记自动生成。只需修改每日笔记模板、复盘笔记或配置，本页会自动更新，无需编辑代码。

```dataviewjs
await dv.view("Meta/views/quicklinks");
```

> [!theme] 人生主题
> ![[Life Theme#Theme]]

## 生命之轮（本季度复盘）
```dataviewjs
await dv.view("Meta/views/wheel");
```

## 每日自省
展示每日笔记中所有 `dq_*` 属性的趋势和平均值。可切换问题并选择时间范围。
```dataviewjs
await dv.view("Meta/views/dailyquestions", { days: 30 });
```

## 习惯
```dataviewjs
await dv.view("Meta/views/habits", { days: 21 });
```

## 看板
```dataviewjs
await dv.view("Meta/views/boards", { compact: true });
```

## 生命倒计时
```dataviewjs
await dv.view("Meta/views/memento");
```

## 询问
打开 [[AI 助手]] 使用完整提示词库，或者直接选择下方操作（需已配置 Agent Client 和智能体）：
```agent
type: button
text: "今天最重要的事"
prompt: "Read Prompts/14 What Matters Today.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
```
```agent
type: button
text: "复盘本周"
prompt: "Read Prompts/03 Weekly Review.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
```

## 相关仪表盘
- [[Habit Canvas]]
- [[Daily Questions]]
- [[Task Dashboard]]
- [[Projects Dashboard]]
- [[Boards]]
- [[AI 助手]]
- [[Setup]]
- [[Ideal Week]] · [[Core Values]] · [[Life Theme]]
