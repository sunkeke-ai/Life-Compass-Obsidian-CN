---
type: book
author: 
year: 
rating: 
status: reading
started: <% tp.date.now("YYYY-MM-DD") %>
finished: 
tags:
  - book
---
## 三句话总结


## 核心观点
- 

## 摘录
为每条摘录添加块 ID，以便在写作时直接嵌入引用。

> "" ^quote-1

## 它将如何改变我的行动
- 

```agent
type: button
text: "将此页收录到知识库"
prompt: "Read Prompts/12 Research Capture.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
```

## 相关写作
```dataview
LIST
FROM "06 Writing"
WHERE contains(file.outlinks, this.file.link)
```
