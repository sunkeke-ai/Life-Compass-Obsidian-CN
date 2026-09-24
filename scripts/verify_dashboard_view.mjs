// Real browser DOM, synthetic vault only. No personal notes or providers.
import fs from "node:fs";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setContent('<html><body style="margin:0;font:14px Arial;background:#17191c;color:#ddd"><div id="root" style="height:100vh;overflow:auto"></div><div role="note" style="position:fixed;bottom:0;z-index:9999;background:#10242d;padding:4px 8px;font-size:10px;pointer-events:none">SYNTHETIC FIXTURE · No live vault or provider data</div></body></html>');
  await page.addStyleTag({ content: ':root{--background-primary:#17191c;--background-secondary:#202328;--text-normal:#ddd;--text-muted:#a5abb3;--text-faint:#777;--background-modifier-border:#393d44;--interactive-accent:#ff906b;--font-interface:Arial;--font-text:Arial}button,input,select{font:inherit;color:inherit;background:#252a31;border:1px solid #454c55}button{cursor:pointer}' + fs.readFileSync('.obsidian/plugins/life-os-app/styles.css','utf8') });
  await page.evaluate(async (source) => {
    HTMLElement.prototype.empty=function(){this.replaceChildren();};
    HTMLElement.prototype.addClass=function(...names){this.classList.add(...names);};
    HTMLElement.prototype.setText=function(text){this.textContent=text;};
    HTMLElement.prototype.createEl=function(tag,options={}){const el=document.createElement(tag);if(options.cls)el.className=options.cls;if(options.text)el.textContent=options.text;for(const[k,v]of Object.entries(options.attr||{}))el.setAttribute(k,v);this.appendChild(el);return el;};
    HTMLElement.prototype.createDiv=function(options){return this.createEl('div',options);};
    HTMLElement.prototype.createSpan=function(options){return this.createEl('span',options);};
    const now='2026-09-09';
    function moment(value=now){const date=new Date(`${value}T12:00:00Z`);return {clone:()=>moment(date.toISOString().slice(0,10)),subtract(n){date.setUTCDate(date.getUTCDate()-n);return this;},format(f){const iso=date.toISOString().slice(0,10);return ({'YYYY-MM-DD':iso,'YYYY-MM':iso.slice(0,7),'gggg-[W]ww':'2026-W37','YYYY-[Q]Q':'2026-Q3','[Week] ww':'Week 37','D MMM':`${date.getUTCDate()} Sep`,'ddd':['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][date.getUTCDay()]})[f]||iso;}};}
    moment.localeData=()=>({firstDayOfWeek:()=>1});
    class TFile{constructor(path){this.path=path;this.basename=path.split('/').pop().replace(/\.md$/,'');this.extension='md';}}
    class Component{constructor(){this.disposers=[];}registerDomEvent(el,event,fn,options){el.addEventListener(event,fn,options);this.disposers.push(()=>el.removeEventListener(event,fn,options));}registerEvent(){}addChild(child){child.onload?.();}removeChild(child){child.onunload?.();child.disposers.forEach(fn=>fn());}}
    class ItemView extends Component{constructor(leaf){super();this.app=leaf.app;this.contentEl=document.querySelector('#root');}}
    const files=new Map(), metadata=new Map(), contents=new Map();
    const add=(path,data={},body='')=>{files.set(path,new TFile(path));metadata.set(path,{frontmatter:data,listItems:body.split('\n').flatMap((line,i)=>{const m=line.match(/^- \[(.)\]/);return m?[{task:m[1],position:{start:{line:i}}}]:[];})});contents.set(path,body);};
    add('Meta/Compass Config.md',{questions:[{key:'dq_focus',text:'Did I focus on what matters?'}],habits:['habit_walk','habit_read']});
    add('00 Dashboards/Setup.md',{status:'open'});
    for(const name of ['Assistant','Task Dashboard','Projects Dashboard','Compass Dashboard','Boards'])add(`00 Dashboards/${name}.md`);
    for(let i=0;i<20;i++){const d=new Date('2026-09-09T12:00:00Z');d.setUTCDate(d.getUTCDate()-i);add(`01 Journal/Daily/${d.toISOString().slice(0,10)}.md`,{dq_focus:4+i%7,habit_walk:i%3!==0,habit_read:i%2===0});}
    add('02 Retreats/2026-Q3 Personal Retreat.md',{wheel_health:7,wheel_work:6,wheel_relationships:8});
    add('04 Projects/Synthetic project.md',{type:'project',status:'active'},'- [ ] Review synthetic plan #project/synthetic-project 📅 2026-09-09\n- [ ] Draft outline #project/synthetic-project ⏳ 2026-09-10');
    add('08 Tasks/Tasks.md',{},'- [ ] Resolve fixture overdue task 📅 2026-09-08\n- [ ] Pick a focus ⏫');
    add('05 People/Synthetic person.md',{type:'person'},'- [ ] Discuss fixture #p/synthetic-person #discuss');
    add('07 Library/Book Notes/Synthetic book.md',{type:'book'});
    add('07 Library/Book Notes/Finished book.md',{type:'book',status:'completed'});
    add('07 Library/Book Notes/Sample book.md',{type:'book',status:'reading',tags:['example']});
    add('07 Library/Source.md',{type:'source',cover:'https://example.invalid/cover.png'});
    const boardPath='06 Writing/Articles/Article Board.md';
    add(boardPath,{'kanban-plugin':'board'},'## Ideas\n- [ ] Fixture idea\n## Drafting\n- [ ] Fixture draft\n- [x] Fixture checked item');
    metadata.get(boardPath).headings=[{level:2,heading:'Ideas',position:{start:{line:0}}},{level:2,heading:'Drafting',position:{start:{line:2}}}];
    window.opened=[];window.commands=[];
    const plugins={'agent-client':{settings:{autoAllowPermissions:false}},'obsidian-local-rest-api':{settings:{}}};
    const app={vault:{getMarkdownFiles:()=>[...files.values()],getAbstractFileByPath:p=>files.get(p),cachedRead:async f=>contents.get(f.path)||'',on(){}},metadataCache:{getFileCache:f=>metadata.get(f.path),on(){}},plugins:{getPlugin:id=>plugins[id]},workspace:{getLeaf:()=>({openFile:async(f,o)=>window.opened.push({path:f.path,options:o})}),revealLeaf:async()=>{}},commands:{commands:{}}};
    const module={exports:{}};
    const View=new Function('require','module',`${source};return LifeOSHomeView;`)(()=>({Component,ItemView,TFile,Plugin:class{},Modal:class{},Notice:class{},moment,setIcon(){}}),module);
    const plugin={runCommand:(id)=>{window.commands.push(id);return true;},openCapture(){window.commands.push('capture');},activateView(){}};
    window.view=new View({app},plugin);await window.view.onOpen();
  }, fs.readFileSync('.obsidian/plugins/life-os-app/main.js','utf8'));
  assert.equal(await page.getByRole('note').count(),1);
  assert.equal(await page.locator('.life-os-analytics').count(),0);
  assert.equal(await page.locator('.life-os-brain-preview canvas').count(),1);
  assert.equal(await page.locator('.life-os-brain-preview canvas').getAttribute('tabindex'),'-1');
  assert.equal(await page.locator('.life-os-brain-preview .life-os-brain-note').count(),0);
  assert.ok(await page.locator('.life-os-task-row').count() <= 3);
  await page.locator('.life-os-task-row').first().click();
  assert.ok(await page.evaluate(()=>window.opened.at(-1)?.options?.eState?.line >= 0));
  for(const screen of ['home','today','plan','review','focus','projects','people','create','library','ai']){
    await page.evaluate((s)=>{window.view.activeScreen=s;window.view.render();},screen);
    assert.ok(await page.locator('.life-os-shell').innerText());
    await page.screenshot({path:`/tmp/life-os-${screen}-candidate.png`,fullPage:true});
    if(screen==='home'){
      assert.equal(await page.locator('.life-os-shell > .life-os-summary, .life-os-shell > .life-os-ai-panel').count(),0);
      assert.ok(await page.evaluate(()=>{
        const children=[...document.querySelector('.life-os-shell').children];
        return children.slice(1).every((child,i)=>child.getBoundingClientRect().top-children[i].getBoundingClientRect().bottom>=19);
      }));
      await page.evaluate(()=>{const root=document.querySelector('#root');root.scrollTop=root.scrollHeight;});
      await page.screenshot({path:'/tmp/life-os-home-lower-candidate.png'});
      await page.evaluate(()=>document.querySelector('#root').scrollTop=0);
    }
    if(screen==='today')assert.equal(await page.locator('.life-os-checkin-meter').getAttribute('max'),'3');
    if(screen==='projects')assert.ok((await page.locator('.life-os-record-metrics').textContent()).includes('2 tagged open'),await page.locator('.life-os-record-metrics').textContent());
    if(screen==='people'){
      await page.locator('.life-os-discussion-queue button').click();
      assert.equal(await page.evaluate(()=>window.opened.at(-1).path),'05 People/Synthetic person.md');
    }
    if(screen==='focus'){
      assert.ok(await page.locator('.life-os-workload-segment').count()>0);
      await page.getByRole('button',{name:'Overdue · 1',exact:true}).click();
      assert.equal(await page.locator('.life-os-task-row').count(),1);
      assert.ok((await page.locator('.life-os-task-row').innerText()).includes('overdue'));
      await page.getByRole('button',{name:/^All ·/}).click();
    }
    if(screen==='create'){
      await page.locator('.life-os-pipeline-card').filter({hasText:'Articles'}).click();
      assert.equal(await page.locator('.life-os-workflow-lanes').count(),1);
      assert.equal(await page.locator('.life-os-lane-item').count(),2);
      assert.equal(await page.getByRole('button',{name:'Ideas · 1',exact:true}).count(),1);
      await page.getByRole('button',{name:'Drafting · 2',exact:true}).click();
      assert.equal(await page.evaluate(()=>window.opened.at(-1).options.eState.line),2);
      await page.screenshot({path:'/tmp/life-os-create-candidate.png',fullPage:true});
    }
    if(screen==='library'){
      assert.equal(await page.locator('.life-os-record-card').count(),3);
      assert.equal(await page.locator('.life-os-book-fallback').count(),3);
      assert.equal(await page.locator('img[src^="https:"]').count(),0);
      await page.getByLabel('Library type',{exact:true}).selectOption('source');
      assert.equal(await page.locator('.life-os-record-card').count(),1);
      await page.getByLabel('Library type',{exact:true}).selectOption('all');
      await page.getByLabel('Library status',{exact:true}).selectOption('completed');
      assert.equal(await page.locator('.life-os-record-card').count(),1);
      assert.ok((await page.locator('.life-os-record-card').innerText()).includes('Finished book'));
    }
    if(screen==='ai'){
      assert.ok((await page.locator('.life-os-connection-map').innerText()).includes('not tested here'));
    }
    if(screen==='plan'){
      await page.evaluate(()=>{window.view.zhCn=true;window.view.render();});
      assert.deepEqual(await page.evaluate(()=>[
        window.view.formatPropertyLabel('habit_journal'),
        window.view.formatPropertyLabel('habit_exercise'),
        window.view.formatPropertyLabel('habit_reading'),
      ]),['日记','锻炼','阅读']);
      assert.equal(await page.locator('.life-os-calendar-day').count(),42);
      await page.getByRole('button',{name:'2026-09-09: Open daily note',exact:true}).click();
      assert.equal(await page.evaluate(()=>window.opened.at(-1)?.path),'01 Journal/Daily/2026-09-09.md');
      assert.equal(await page.getByRole('button',{name:'上个月',exact:true}).count(),1);
      assert.equal(await page.getByRole('button',{name:'本月',exact:true}).count(),1);
      assert.equal(await page.getByRole('button',{name:'下个月',exact:true}).count(),1);
      const currentMonth=await page.locator('.life-os-calendar h2').innerText();
      await page.getByRole('button',{name:'下个月',exact:true}).click();
      assert.notEqual(await page.locator('.life-os-calendar h2').innerText(),currentMonth);
      await page.getByRole('button',{name:'本月',exact:true}).click();
      assert.equal(await page.locator('.life-os-calendar h2').innerText(),currentMonth);
      await page.evaluate(()=>{window.view.zhCn=false;});
    }
    if(screen==='review'){
      await page.getByRole('button',{name:'7 days',exact:true}).click();
      assert.equal(await page.locator('.life-os-effort-column').count(),7);
      await page.locator('.life-os-effort-column[role="button"]').first().press('Enter');
      assert.ok(await page.evaluate(()=>window.opened.at(-1)?.path.startsWith('01 Journal/Daily/')));
      await page.getByText('Read daily values',{exact:true}).click();
      assert.equal(await page.locator('.life-os-chart-table tbody tr').count(),7);
      await page.getByRole('button',{name:/Open scored retreat/}).click();
      assert.ok(await page.evaluate(()=>window.opened.at(-1)?.path.startsWith('02 Retreats/')));
    }
  }
  await page.evaluate(()=>{window.view.activeScreen='home';window.view.render();window.previousPreview=window.view.previewBrain;});
  await page.locator('.life-os-display-options summary').click();
  await page.getByRole('button',{name:'Hide optional visuals',exact:true}).click();
  assert.equal(await page.locator('.life-os-brain-preview').count(),0);
  assert.ok(await page.evaluate(()=>window.previousPreview.ctx===null));
  await page.locator('.life-os-display-options summary').click();
  await page.getByLabel('Items per list',{exact:true}).selectOption('3');
  assert.equal(await page.evaluate(()=>window.view.itemLimit),3);
  await page.locator('.life-os-display-options summary').click();
  await page.getByRole('button',{name:'Restore view defaults',exact:true}).click();
  assert.equal(await page.locator('.life-os-brain-preview canvas').count(),1);
  await page.getByRole('button',{name:/Explore Brain/}).click();
  assert.equal(await page.locator('.life-os-brain-embedded canvas').count(),1);
  await page.getByRole('button',{name:'Home',exact:true}).click();
  for(const width of [900,620,390]){
    await page.setViewportSize({width,height:900});
    for (const screen of ['home','today','plan','review','focus','projects','people','create','library','ai']) {
      await page.evaluate(s=>{window.view.activeScreen=s;window.view.render();},screen);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${screen} document overflow at ${width}`);
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.locator('.life-os-display-options summary').click();
  await page.getByRole('button',{name:'Use compact spacing',exact:true}).click();
  assert.equal(await page.locator('.life-os-app-frame.is-compact').count(),1);
  for(let pass=0;pass<3;pass++){
    await page.getByRole('button',{name:'Brain',exact:true}).click();
    assert.equal(await page.locator('.life-os-rail').count(),1);
    assert.equal(await page.locator('.life-os-brain-embedded canvas').count(),1);
    assert.equal(await page.locator('.life-os-nav-button[aria-current="page"]').innerText(),'Brain');
    await page.evaluate(()=>{window.previousBrain=window.view.embeddedBrain;window.view.render();});
    assert.ok(await page.evaluate(()=>window.previousBrain===window.view.embeddedBrain));
    const canvas=page.locator('.life-os-brain-embedded canvas');
    await canvas.press('ArrowRight');
    assert.ok(await page.evaluate(()=>window.view.embeddedBrain.yaw>0.28));
    if(pass===0)await page.screenshot({path:'/tmp/life-os-brain-sidebar.png',fullPage:true});
    await page.getByRole('button',{name:'Home',exact:true}).click();
    assert.equal(await page.locator('.life-os-brain-embedded').count(),0);
    assert.ok(await page.evaluate(()=>window.previousBrain.ctx===null && window.view.embeddedBrain===null));
  }
  assert.deepEqual(errors,[]);
  await page.evaluate(()=>{window.view.activeScreen='home';window.view.render();});
  await page.locator('.life-os-display-options summary').click();
  await page.getByRole('button',{name:"Hide this module's visual",exact:true}).click();
  assert.equal(await page.locator('.life-os-brain-preview').count(),0);
  await page.evaluate(()=>{window.view.activeScreen='ai';window.view.render();});
  assert.equal(await page.locator('.life-os-ai-diagram').count(),1);
  await page.evaluate(()=>{
    const theme={'--background-primary':'#faf9f6','--background-secondary':'#f0eeea','--text-normal':'#24272b','--text-muted':'#535962','--text-faint':'#686d74','--background-modifier-border':'#cbc7c0'};
    for(const [key,value] of Object.entries(theme))document.documentElement.style.setProperty(key,value);
    window.view.activeScreen='home';window.view.visualOptions={};window.view.render();
  });
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.screenshot({path:'/tmp/life-os-home-light-candidate.png'});
  await page.evaluate(()=>window.view.onClose());
  console.log('Dashboard browser checks passed: ten modules, Home spacing, preview/full Brain navigation, workload groups, project counts, discussion links, board previews, Library filters and remote-cover rejection, AI branches, per-module controls, narrow widths and light-theme smoke check. Synthetic fixture only.');
}finally{await browser.close();}
