---
type: project
status: active
area: 
quarter: <% tp.date.now("YYYY-[Q]Q") %>
started: <% tp.date.now("YYYY-MM-DD") %>
due: 
people: []
tags:
  - project
---
在仓库任何位置为任务添加 `#project/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>` 标签，它们就会汇总到此处。每个任务都可一键回到解释其存在原因的项目背景。

```agent
type: button
text: "启动这个项目"
prompt: "Read Prompts/08 Project Kickoff.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
```

## 预期成果
“完成”具体是什么样：
- 

## 下一步行动
```tasks
not done
tags include #project/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>
sort by due
```

## 当前项目任务
- [ ] 第一步 #project/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>

## 笔记


## 日志
- <% tp.date.now("YYYY-MM-DD") %> 已创建。

## 已完成
```tasks
done
tags include #project/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>
sort by done reverse
limit 20
```
