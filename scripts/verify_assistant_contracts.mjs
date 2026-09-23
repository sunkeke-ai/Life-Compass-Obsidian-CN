#!/usr/bin/env node
// Read system workflow definitions only. Never connects to an agent or provider.
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = path.resolve(process.argv[2] || ".");
const source = fs.readFileSync(path.join(root, "00 Dashboards/Assistant.md"), "utf8");
const buttons = [...source.matchAll(/```agent\n([\s\S]*?)```/g)];
assert.equal(buttons.length, 16, "All 16 assistant workflows must remain available");
for (const [, block] of buttons) {
  assert.match(block, /^autoSend: false$/m, "Workflow must require a separate send action");
  assert.match(block, /^type: button$/m);
  const promptPath = block.match(/Read (Prompts\/[^"\n]+?\.md) with vault_read/);
  assert.ok(promptPath, "Workflow must name a local prompt");
  assert.ok(fs.existsSync(path.join(root, promptPath[1])), "Named prompt must exist");
}
assert.match(source, /## (?:Before you send|发送之前)/);
assert.match(source, /(?:policy, not a technical guarantee|工作规则，不是每个客户端都会请求审批的技术保证)/);
assert.match(source, /noteContext: hosting/);
assert.match(source, /(?:not proof of authentication|不能证明身份验证成功)/);
console.log("Assistant contracts passed: 16 explicit non-auto-send workflows, local prompt paths, context and authority disclosure. Native client behavior not tested.");
