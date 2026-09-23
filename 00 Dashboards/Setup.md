---
status: open
setup_claude_login: false
setup_mcp_registered: false
setup_vault_lens: false
setup_backup: false
tags:
  - setup
---
这是一个每晚邀请你诚实回答一组问题的仓库。其他功能，包括规划、习惯、任务、写作和 AI 助手，都在此基础上逐层添加。Compass 参考了 Mike Schmitz 的《How I Run My Whole Life Out of Obsidian》，与 Practical PKM 无关。

## 第一步：启用插件（请先完成）
打开此文件夹时，Obsidian 会显示有关**受限模式**的提示，请点击**关闭受限模式**。如果已关闭提示，请前往“设置 → 第三方插件”。仓库已包含十个社区插件和 Life OS 自带插件。然后按 Ctrl/Cmd+P，运行**重新加载应用且不保存**。重新加载后 Life OS 会自动打开。

**如果下方显示的是代码而非检查清单，说明第一步尚未完成。**

## 设置状态
```dataviewjs
await dv.view("Meta/views/setup");
```
有四项内容无法由脚本自动检测：Claude 登录、MCP 注册、浏览器扩展和备份。完成后，请在本笔记的属性中手动勾选。

## 今天（20 分钟）
1. Step A above.
2. [[Compass Config]]: set `birthdate`.
3. [[Life Theme]]: one draft sentence under `## Theme` (it shows in every daily note; refine it at the first retreat).
4. Open [[Compass Dashboard]]; it renders from the example data.
5. Tonight: Ctrl/Cmd+Shift+D creates or opens today's note (with its questions and habits filled in); Ctrl/Cmd+Shift+Q asks the questions. Answer 1 to 10, write one line under `## Journal`. Stop there.

## 本周
- Every morning Ctrl/Cmd+Shift+D, every night Ctrl/Cmd+Shift+Q.
- Day 3: open [[Compass Config]] and reword one question you did not mean. Keep 3 to 5 habits.
- Day 7: look at [[Daily Questions]]. Change nothing. Fill in [[Ideal Week]] roughly and delete its `example` property. Decide the reading module: fill [[Reading Plan]] or delete `09 Reading`.

## 本月
- Day 8: delete the notes tagged `example` (the [[16 Onboarding Assistant]] can do it one file at a time, or use search `tag:#example`).
- Day 14: open this week's weekly note (Ctrl/Cmd+Alt+W) and fill only "What went well".
- Day 21: optional, AI in the vault: [[14 Agent Client and Claude Code]], then press **Help me set up this vault** below.
- Day 30: if 25 of 30 days are scored (the checklist counts), read [[04 Workflow - Personal Retreat]] and book a retreat for day 60 to 90. Tasks, writing boards, the browser extension come after that ([[11 Build Order]]).

## 使用 AI 助手
```agent
type: button
text: "帮我设置这个仓库"
prompt: "Read Prompts/16 Onboarding Assistant.md with vault_read and follow its Prompt section from step 0."
viewType: right-pane
```

## 中文化说明
在 [[Compass Config|罗盘配置]] 中可修改问题文本。内部属性键建议继续使用 `dq_`、`habit_` 和 `wheel_` 前缀，以保持仪表盘自动识别。

## 完成后
将本笔记的 `status` 属性设为 `done`，检查清单即会隐藏。如需重新打开，将它改回 `open` 即可。
