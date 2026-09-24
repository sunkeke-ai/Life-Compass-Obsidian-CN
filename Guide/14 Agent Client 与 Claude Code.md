插件：Agent Client 0.12.1（`agent-client`，[GitHub 项目](https://github.com/RAIT-09/obsidian-agent-client)，Apache 2.0，仅支持桌面端）。它通过 Agent Client Protocol 运行本地 AI 智能体，例如 Claude Code、Codex、Gemini CLI 等，并可将对话显示在侧边栏、标签页、浮动窗口或笔记内部。

## 它为 Compass 增加了什么

- 与已配置的智能体对话，并明确提及你准备共享的笔记。嵌入式“AI 助手”对话会将所在笔记作为上下文；当前笔记和链接笔记的处理方式取决于客户端设置。
- 关闭自动批准。编辑前先征求同意是一项工作规则，但并不代表每个外部客户端或智能体都会从技术上强制执行。
- [[AI 助手]]和[[Compass Dashboard|人生罗盘仪表盘]]提供已经准备好的操作按钮，包括每周复盘、静修准备、“今天最重要的事”和写作帮助。
- 每次会话开始时，智能体都会读取仓库根目录的 `AGENTS.md`，`CLAUDE.md` 和 `GEMINI.md` 均指向该文件。它说明文件夹结构、属性约定和禁止修改的内容。系统结构发生变化时，应同步更新该文件。重复执行的工作位于 `Prompts/`，详见 [[20 Prompt Library|20 提示词库]]。
- 随仓库提供的 `.claude/settings.json` 包含只读 MCP 工具白名单。实际权限还取决于客户端及其其他设置。可选的 claude-obsidian 集成提供知识工作流，详见 [[15 claude-obsidian]]。
- 通过 Obsidian MCP 桥接，智能体可以在对话中打开笔记和看板、运行 Obsidian 命令、搜索以及局部修改笔记，详见 [[19 Obsidian MCP Bridge|19 Obsidian MCP 桥接]]。

## 设置方法（每台电脑一次）

此功能可选，不配置它也能完整使用本仓库。配置需要终端、[Node.js LTS](https://nodejs.org)，以及 Claude 账号或 API 密钥。如果不使用终端，可以跳过本页。

1. 安装 Claude Code 并登录：运行 `curl -fsSL https://claude.ai/install.sh | bash`，然后运行一次 `claude`。也可以使用保存在 Obsidian Keychain 中的 Anthropic API 密钥，具体方式见插件文档。
2. 安装适配器：`npm install -g @agentclientprotocol/claude-agent-acp`。
3. 在 Obsidian 中打开“设置 → Agent Client → Preset agents → Claude Code”。点击 **Auto-detect**，或者粘贴 `which claude-agent-acp` 返回的路径。
4. 点击功能区中的机器人图标并发送 `hello`。收到回复即表示连接正常。

### Linux Flatpak 版 Obsidian

Flatpak 沙箱无法访问 `/usr/local/bin`，其 `PATH` 通常只有 `/usr/bin:/app/bin`，因此适配器的 `#!/usr/bin/env node` 启动行会失败。主目录会挂载到沙箱中，可以在 `~/.local/bin` 创建以下包装脚本：

```sh
#!/bin/sh
exec "$HOME/.local/bin/node" "/path/to/lib/node_modules/@agentclientprotocol/claude-agent-acp/dist/index.js" "$@"
```

将 `/path/to/lib/node_modules/...` 替换为 `npm root -g` 的输出，再加上 `/@agentclientprotocol/claude-agent-acp/dist/index.js`。为脚本添加执行权限（`chmod +x`），然后把完整路径填入插件的 Claude Code 路径，例如展开后的 `~/.local/bin/claude-agent-acp`。

不需要执行 `flatpak override`。维护者文档还提供另一种方案：运行 `flatpak override --user --filesystem=host-os:ro md.obsidian.Obsidian`，再把插件指向 `/var/run/host/usr/...`。这种方法会扩大沙箱权限，不是必需方案。

验证方法：打开 Agent Client 对话并发送 `hello`。收到回复说明包装脚本可用。

## 在笔记中嵌入对话和按钮

使用语言标记为 `agent-client` 或 `agent` 的代码块，并在代码块内部使用 YAML。插件文档：[Embeddable blocks](https://rait-09.github.io/obsidian-agent-client/usage/embeddable-blocks.html)。

- 对话：使用 `type: chat`，可设置 `agent`、`model`、`height` 和 `id`。添加 `persist: true` 可以在重启后保留会话，添加 `noteContext: hosting` 可以固定使用当前笔记作为上下文。
- 按钮：使用 `type: button`，并设置 `text`、`prompt` 和 `viewType: right-pane | floating | editor-tab | embedded`。使用 `autoSend: false` 时只会生成待审阅的提示词，用户仍需单独执行发送操作。

## 推荐设置

- 导出：文件夹设为 `Meta/Agent Chats`，标签设为 `agent-client`，关闭自动导出。导出的对话可能包含被提及笔记的内容，并会像普通笔记一样出现在仓库搜索中。
- Prompt injection：保持开启，以支持 Obsidian 风格的双链、`$math$` 和表格。
- Permissions：关闭自动允许。

## 社区模板安全说明

- 仅支持桌面端。智能体拥有与你的终端用户相同的访问能力，插件只负责显示批准步骤。
- 电脑专属路径和 API 密钥保存在 Obsidian 设置与 Keychain 中，不应写入仓库。模板只提供最小化的 `agent-client/data.json`，其中关闭自动允许，设置默认智能体和导出文件夹，不包含会话、机器路径或密钥；`build_template.py` 会清除其他运行状态。
- 离开本机的数据取决于你实际发送的内容，包括消息、提及的笔记和附件。在对话中提及日记时，相关内容可能会发送给模型服务商。
