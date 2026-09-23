---
type: person
role: 
company: 
email: 
meets: 
tags:
  - person
---
标签：`#p/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>`

将“记得和对方讨论 X”记录为带有 `#discuss #p/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>` 的任务。会议前打开本笔记查看背景。

```agent
type: button
text: "准备这场会议"
prompt: "Read Prompts/07 Meeting Prep.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
```

## 待沟通
```tasks
not done
tags include #discuss
tags include #p/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>
sort by created
```

## 与对方有关的未完成任务
```tasks
not done
tags include #p/<% tp.file.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") %>
tags do not include #discuss
sort by due
```

## 共同项目
```dataview
LIST
FROM "04 Projects"
WHERE contains(people, this.file.link) AND status != "done"
```

## 笔记


## 会议记录
- <% tp.date.now("YYYY-MM-DD") %> 
