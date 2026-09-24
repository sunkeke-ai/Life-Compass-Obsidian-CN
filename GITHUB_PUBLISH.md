# GitHub 发布操作清单

## 建议仓库信息

仓库名称：

```text
life-OS-zh-CN
```

仓库简介：

```text
Life OS 的非官方简体中文 Obsidian 模板，包含日记、自省、规划、习惯、任务、项目、写作、知识库与可选 AI 工作流。
```

建议 Topics：

```text
obsidian, life-os, productivity, personal-knowledge-management, journaling, task-management, chinese, zh-cn, dataview, templater
```

建议设置：

- 可见性：Public
- 默认分支：`main`
- Issues：开启
- Discussions：可选开启
- Wiki：关闭，仓库已有 `wiki/` 目录，避免名称混淆
- Releases：用于发布清理后的 ZIP，不上传个人使用中的仓库副本
- 首个 Release：勾选 “Set as a pre-release”

## 发布前检查

- [x] 工作树无未提交的本地化修改
- [x] 没有 `.mcp.json`
- [x] 没有 `.claude/settings.local.json`
- [x] 没有 Agent Client 会话或导出聊天
- [x] 没有 API 密钥、证书或个人日志
- [x] ZIP 由 `scripts/build_template.py` 生成
- [x] ZIP 通过 `scripts/verify_archive_restore.py`
- [x] README 包含上游来源、许可证和预发布说明
- [ ] 独立核验第三方插件二进制来源和再分发条件
- [ ] 在目标系统中完成至少一次 Obsidian 原生启动测试
- [ ] 确认 GitHub 用户名和新仓库 URL

## 创建 GitHub 仓库

在 GitHub 创建一个空仓库，不要自动添加 README、许可证或 `.gitignore`。

建议 URL：

```text
https://github.com/<你的用户名>/life-OS-zh-CN
```

## 配置远程仓库

当前本地 `origin` 指向上游项目。为了避免误推送，建议将它改名为 `upstream`，再把你的仓库设为新的 `origin`。

确认仓库 URL 后执行：

```bash
git remote rename origin upstream
git remote add origin https://github.com/<你的用户名>/life-OS-zh-CN.git
git branch -M main
git push -u origin main
```

检查结果：

```bash
git remote -v
git status
```

期望状态：

- `origin` 指向你的仓库。
- `upstream` 指向 `https://github.com/AgriciDaniel/compass.git`。
- 当前分支为 `main`。
- 工作树干净。

## 创建版本标签

完成原生启动测试和第三方插件发布检查后，再创建标签：

```bash
git tag -a v1.1.0-zh.1 -m "Life OS 简体中文版 v1.1.0-zh.1"
git push origin v1.1.0-zh.1
```

如果尚未完成这些检查，可以先只推送代码，不创建标签。

## 创建 GitHub Release

Release 标题：

```text
Life OS 简体中文版 v1.1.0-zh.1
```

Tag：

```text
v1.1.0-zh.1
```

选项：

- 勾选 “Set as a pre-release”
- 不勾选 “Set as the latest release”，直到完成原生验收
- Release 正文复制 `RELEASE_NOTES_v1.1.0-zh.1.md`

上传附件：

- `LifeOS-zh-CN-template-v1.1.0-zh.1.zip`
- `LifeOS-zh-CN-template-v1.1.0-zh.1.zip.sha256`

不要上传：

- 桌面上正在使用的解压仓库
- 个人笔记、日志和联系人
- `.obsidian/workspace*.json`
- Agent Client 会话
- `.mcp.json`
- 任何 API 密钥或证书

## 后续同步上游

```bash
git fetch upstream
git switch main
git merge upstream/main
```

合并前先建立分支，检查上游是否改动了已经中文化的文件。出现冲突时，优先保留系统键和工作流语法，再重新应用中文显示文字。
