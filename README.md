<p align="center"><img src="Meta/attachments/cover.png" alt="Life OS 简体中文版" width="100%"></p>

# Life OS 简体中文版

> 在 Obsidian 中管理日记、目标、习惯、任务、项目、写作、阅读和人生复盘。

这是 [sunkeke-ai/life-OS](https://github.com/sunkeke-ai/life-OS) 的非官方简体中文本地化版本。它保留了上游的 Markdown 数据结构、系统属性键和工作流兼容性，并对 Life OS 主界面、主要仪表盘、模板、配置说明和示例内容进行了中文化。

当前版本：`v1.1.0-zh.1`

发布状态：预发布候选版。自动化验证已经通过，但尚未完成所有平台的 Obsidian 原生验收，也没有验证所有第三方插件的上游二进制来源。

## 主要功能

- 每日笔记与每日自省问题
- 周度、季度与个人静修复盘
- 生命之轮和习惯追踪
- 任务收件箱、项目管理和联系人跟进
- Newsletter、视频、文章和课程创作看板
- 本地知识库、阅读计划和关联大脑
- Life OS 原生导航、快速记录和实时仪表盘
- 可选的 Agent Client、提示词库和 Obsidian MCP 工作流
- 数据以 Markdown、YAML 属性和双链形式保存在本地

## 中文化范围

本版本已处理：

- Life OS 导航、按钮、卡片、状态、统计和动态计数
- 首页、规划、专注、复盘、项目、人际、创作、知识库、大脑和 AI 模块
- 快速记录弹窗与系统状态
- 人生罗盘配置页
- AI 助手安全说明
- 示例项目、示例任务和可见文件名
- 主要仪表盘、模板与 QuickAdd 显示名称

为了保持兼容性，以下内容不会翻译：

- `dq_*`、`habit_*`、`wheel_*` 等属性键
- Tasks、Dataview、Templater 和 Agent Client 的代码语法
- 插件 ID、命令 ID、标签和部分内部路径
- 发送给智能体执行的英文 Prompt 指令
- 第三方插件自身未提供中文的设置页面

## 快速开始

1. 从 GitHub Releases 下载 `LifeOS-zh-CN-template-v1.1.0-zh.1.zip`。
2. 将压缩包解压到一个新的文件夹。
3. 在 Obsidian 中选择“将文件夹作为仓库打开”。
4. Obsidian 提示受限模式时，确认你信任此仓库后再关闭受限模式。
5. 执行命令“重新加载应用但不保存”，让内置插件和 Life OS App 完整加载。
6. 打开 `00 Dashboards/Setup.md`，按照检查清单完成设置。
7. 在 `Meta/Compass Config.md` 中设置每日问题、习惯、生命之轮和文件夹路径。

> [!warning] 先备份
> 不要直接覆盖已有 Obsidian 仓库。请将新版本解压到独立文件夹，再按需迁移个人内容和自定义配置。

## 常用快捷键

| 功能 | 快捷键 |
| --- | --- |
| 打开 Life OS | `Cmd/Ctrl + Shift + L` |
| 快速记录 | `Cmd/Ctrl + Shift + C` |
| 打开或创建今日笔记 | `Cmd/Ctrl + Shift + D` |
| 运行每日问题 | `Cmd/Ctrl + Shift + Q` |

## 目录结构

```text
00 Dashboards/   仪表盘、设置、AI 助手
01 Journal/      每日、每周和每季度笔记
02 Retreats/     个人静修复盘
03 Planning/     人生主题、核心价值观、理想一周
04 Projects/     项目笔记与项目看板
05 People/       联系人与待沟通事项
06 Writing/      Newsletter、视频、文章、课程
07 Library/      读书笔记与资料
08 Tasks/        任务总收件箱
09 Reading/      阅读计划、章节、经文和学习笔记
Prompts/         16 个智能体工作流
Templates/       Templater 模板
Meta/            统一配置、视图和版本信息
Guide/           系统原理和工作流指南
wiki/, inbox/    可选知识层
```

## 内置插件

仓库包含 10 个 Obsidian 社区插件和 Life OS App。关闭受限模式前，请自行确认你信任这些代码。

| 插件 | 版本 | 许可证 |
| --- | ---: | --- |
| Dataview | 0.5.68 | MIT |
| Templater | 2.25.0 | AGPL-3.0 |
| Periodic Notes | 0.0.17 | MIT |
| QuickAdd | 2.23.0 | MIT |
| Tasks | 8.4.0 | MIT |
| Kanban | 2.0.51 | GPL-3.0 |
| Omnisearch | 1.30.1 | GPL-3.0 |
| Local REST API | 5.1.0 | MIT |
| Agent Client | 0.12.1 | Apache-2.0 |
| SEO | 0.5.6 | MIT |
| Life OS App | 0.20.0 | MIT |

详细来源和许可证见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

## AI 与隐私

AI 功能不是使用 Life OS 的必要条件。

- 仓库不包含 API 密钥。
- Agent Client 和本地 API 桥接主要面向桌面端。
- 将笔记发送给模型服务商前，请检查所选智能体、附件和上下文。
- 日记、人际关系笔记和个人规划可能包含敏感信息。
- 同意读取某些上下文，不等于同意编辑、安装、付费或发布。
- 已填写 API 密钥不代表身份验证、连接或工作流测试已经成功。

智能体规则位于 `AGENTS.md`，重复工作流位于 `Prompts/`。

## 验证状态

当前预发布包已经通过：

- 59 项 Life OS App 专项检查
- 16 个 AI 助手非自动发送工作流合同检查
- 11 项发布安全测试
- 163 项候选模板检查
- 211 个归档文件的清单与 SHA-256 解压校验

尚未声明完成：

- 所有桌面与移动平台的原生验收
- 模型服务商身份验证和真实连接测试
- 个人仓库备份恢复演练
- 所有第三方插件二进制的独立来源核验

## 下载校验

预发布文件：

`LifeOS-zh-CN-template-v1.1.0-zh.1.zip`

校验文件应与 ZIP 一起下载，SHA-256 以该文件为准：

`LifeOS-zh-CN-template-v1.1.0-zh.1.zip.sha256`

## 构建与验证

```bash
node scripts/verify_life_os_app.mjs .
node scripts/verify_assistant_contracts.mjs .
python3 scripts/verify_release_safety.py
python3 scripts/build_template.py \
  --out ../life-os-releases \
  --name LifeOS-zh-CN \
  --version 1.1.0-zh.1 \
  --zip
```

请勿直接把个人使用中的仓库压缩发布。构建脚本会创建经过清理的候选模板，并排除会话、密钥和个人运行状态。

## 上游、署名与许可证

- 上游项目：[sunkeke-ai/life-OS](https://github.com/sunkeke-ai/life-OS)
- 工作流灵感：Mike Schmitz 的公开视频 “How I Run My Whole Life Out of Obsidian”
- 每日问题：Marshall Goldsmith 与 Mark Reiter 的《Triggers》
- 多尺度规划：Cal Newport
- 完整署名：[CREDITS.md](CREDITS.md)

代码、模板、仪表盘、脚本、配置和提示词采用 [MIT License](LICENSE)。

`Guide/` 中的说明文字采用 [CC BY 4.0](LICENSE-GUIDE.md)。

`.obsidian/plugins/` 中的第三方插件保留各自许可证。发布或再分发前，请阅读 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

本中文版本是社区本地化项目，与 Obsidian、Practical PKM、LifeHQ 或上游作者不存在官方隶属或背书关系。
