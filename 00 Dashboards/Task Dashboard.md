本页是一个**任务建议引擎**，不是真正执行今日计划的地方。查看建议后，选择你真正要做的事，再放入纸质笔记本或日历的时间块中。“电脑是大脑，笔记本是清单。”

```agent
type: button
text: "整理我的收件箱"
prompt: "Read Prompts/06 Task Triage.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
```
```agent
type: button
text: "今天最重要的事"
prompt: "Read Prompts/14 What Matters Today.md with vault_read and follow its Prompt section for the note I have open (or the current period if none applies)."
viewType: right-pane
```

使用 QuickAdd 命令**添加任务**，把所有事项记录到 [[Tasks|任务总表]]。通过 `#project/<slug>` 或 `#p/<person>` 标签将任务路由到对应情境。下方查询会在合适的时间呈现合适的任务。

## 已逾期
```tasks
not done
path does not include wiki/
due before today
sort by due
group by filename
```

## 今天
```tasks
not done
path does not include wiki/
(due on today) OR (scheduled on today)
path does not include 09 Reading/Reading Plan
sort by priority
group by filename
```

## 未来 7 天
```tasks
not done
path does not include wiki/
due after today
due before in 8 days
sort by due
group by due
```

## 待沟通（按联系人）
```tasks
not done
path does not include wiki/
tags include #discuss
group by tags
sort by created
```

## 无日期的高优先级任务
```tasks
not done
path does not include wiki/
no due date
(priority is high) OR (priority is highest)
group by filename
```

## 收件箱（无标签、无日期、待归类）
```tasks
not done
path does not include wiki/
path includes 08 Tasks/Tasks
no due date
tags do not include #project
tags do not include #p/
limit 25
```

## 本周已完成
```tasks
done after 7 days ago
path does not include wiki/
group by done
```
