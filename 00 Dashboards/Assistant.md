通过 Agent Client 在仓库中使用已配置的智能体。工作流会要求智能体遵守 `AGENTS.md`，但这是工作规则，不是每个客户端都会请求审批的技术保证。请确认你使用的客户端已关闭自动批准。设置说明：[[14 Agent Client and Claude Code|14 Agent Client 与 Claude Code]]。如果没有该插件，可打开 `Prompts/` 中的笔记，将 Prompt 部分复制到你选择的智能体中（[[20 Prompt Library|20 提示词库]]）。

## 发送之前

下方按钮会生成提示词，但不会自动发送。请先在输入框中审阅内容。嵌入式对话会使用当前的“AI 助手”笔记作为上下文，不保证自动包含你上一篇查看的其他笔记。

- 检查已选智能体、提及的笔记、附件和链接笔记展开设置。
- 由模型服务商支持的对话可能会将你的提示词、已包含的笔记，以及后续检索到的笔记发送给该服务商。日记和人际关系笔记可能包含敏感个人信息。
- 进行大范围复盘时，先要求给出计划读取的笔记路径和日期范围。确认你同意读取的上下文后再继续。
- 批准上下文选择，不等于批准编辑、安装、支出或发布操作。
- 已配置智能体或本地 API 密钥，不能证明身份验证成功、连接可用或工作流已通过测试。

Life OS 自带仪表盘不会直接调用模型服务商。这些控件会把任务交给 Agent Client，实际行为取决于其设置、外部客户端和所选智能体。

## 每日
```agent
type: button
text: "开始我的一天"
prompt: "Read Prompts/01 Morning Start.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "引导我完成今晚的自省"
prompt: "Read Prompts/02 End of Day Coaching.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "今天最重要的事"
prompt: "Read Prompts/14 What Matters Today.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```

## 每周与每季度
```agent
type: button
text: "复盘本周"
prompt: "Read Prompts/03 Weekly Review.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "准备个人静修复盘"
prompt: "Read Prompts/04 Retreat Prep.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "引导这次静修复盘"
prompt: "Read Prompts/05 Retreat Facilitation.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "分析我的自省和习惯趋势"
prompt: "Read Prompts/13 Trend Analysis.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```

## 工作
```agent
type: button
text: "整理我的收件箱"
prompt: "Read Prompts/06 Task Triage.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "准备这场会议"
prompt: "Read Prompts/07 Meeting Prep.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "启动这个项目"
prompt: "Read Prompts/08 Project Kickoff.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "整理我的看板"
prompt: "Read Prompts/09 Board Grooming.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```

## 写作与研究
```agent
type: button
text: "继续打磨这篇内容"
prompt: "Read Prompts/10 Writing Pipeline.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "发布前 SEO 检查"
prompt: "Read Prompts/11 SEO Pre-publish Audit.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "将此页收录到知识库"
prompt: "Read Prompts/12 Research Capture.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```

## 系统
```agent
type: button
text: "仓库健康检查"
prompt: "Read Prompts/15 Vault Health Check.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```
```agent
type: button
text: "帮我设置这个仓库"
prompt: "Read Prompts/16 Onboarding Assistant.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: embed
autoSend: false
```

## 对话
```agent-client
type: chat
agent: claude-code-acp
height: 600px
id: lifeos-assistant
persist: true
noteContext: hosting
```
