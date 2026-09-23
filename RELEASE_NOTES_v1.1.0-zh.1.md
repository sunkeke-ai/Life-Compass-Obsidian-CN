# Life OS 简体中文版 v1.1.0-zh.1

这是基于 [sunkeke-ai/life-OS](https://github.com/sunkeke-ai/life-OS) 1.1.0 候选版本制作的非官方简体中文预发布版。

> [!IMPORTANT]
> 此版本已通过自动化构建和归档校验，但尚未完成所有平台的 Obsidian 原生验收。建议先在新的独立文件夹中试用，不要覆盖现有仓库。

## 下载

请同时下载：

- `LifeOS-zh-CN-template-v1.1.0-zh.1.zip`
- `LifeOS-zh-CN-template-v1.1.0-zh.1.zip.sha256`

SHA-256 以同时发布的 `.zip.sha256` 文件为准。

## 本次中文化

- 中文化 Life OS 首页、导航和 10 个主要模块。
- 中文化动态统计、状态、筛选器、日期、任务和示例数据提示。
- 中文化快速记录弹窗、七日信号和系统状态。
- 中文化人生罗盘配置说明、AI 助手安全说明和示例项目。
- 将可见文件名 `Assistant.md` 改为 `AI 助手.md`。
- 将可见文件名 `Example Project - Compass Vault.md` 改为 `示例项目 - Compass 仓库.md`。
- 同步更新内部链接、插件路由和验证合同。
- 保留 Tasks、Dataview、Templater、Agent Client 语法及系统属性键，避免破坏工作流。

## 安装

1. 下载并解压 ZIP。
2. 在 Obsidian 中选择“将文件夹作为仓库打开”。
3. 确认信任仓库后关闭受限模式。
4. 执行“重新加载应用但不保存”。
5. 打开 `00 Dashboards/Setup.md` 完成设置。
6. 在 `Meta/Compass Config.md` 中配置问题、习惯和人生领域。

## 升级提示

当前没有原位升级器。

1. 备份原仓库，并验证备份可以恢复。
2. 将新版本解压到独立文件夹。
3. 逐项迁移个人笔记、自定义模板和配置。
4. 不要用新版本的 `.obsidian` 文件夹直接覆盖正在使用的旧仓库。
5. 确认工作流正常后，再决定是否停用旧版本。

## 验证结果

- Life OS App：59 项通过
- AI 助手合同：16 个非自动发送工作流通过
- 发布安全：11 项通过
- 候选模板：163 项通过
- 归档恢复：211 个文件与内置清单一致

## 已知限制

- Agent Client 和本地 API 桥接主要支持桌面端。
- 模型服务商登录、密钥和真实连接需要用户自行验证。
- 第三方插件设置页可能仍显示其自身语言。
- 部分 Guide 和 Prompt 技术内容保留英文。
- 尚未完成所有桌面和移动平台的原生验收。
- 第三方插件二进制来源与再分发条件仍需发布者独立核验。

## 许可证与署名

本项目保留上游署名和许可证：

- 代码、模板、仪表盘、脚本、配置和提示词：MIT
- `Guide/` 说明文字：CC BY 4.0
- 第三方插件：各自许可证，详见 `THIRD_PARTY_NOTICES.md`

完整说明见 `LICENSE`、`LICENSE-GUIDE.md`、`CREDITS.md` 和 `THIRD_PARTY_NOTICES.md`。
