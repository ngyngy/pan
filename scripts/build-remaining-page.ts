import fs from "fs";
import { WEEKLY_QUARK_610_RESOURCES } from "../src/data/weeklyQuark610Resources";
import { TANGLANG_EVOLUTION_RESOURCES } from "../src/data/tanglangEvolutionResources";
import { OCTOBER_HISTORICAL_SHORT_DRAMAS } from "../src/data/octoberHistoricalShortDramas";
import { OCTOBER_BATCH_7_MIXED_RESOURCES } from "../src/data/octoberBatch7MixedResources";

const all630 = [
  ...TANGLANG_EVOLUTION_RESOURCES,
  ...OCTOBER_HISTORICAL_SHORT_DRAMAS,
  ...OCTOBER_BATCH_7_MIXED_RESOURCES,
  ...WEEKLY_QUARK_610_RESOURCES
];

const avIds = new Set([
  "res-drama-chongsheng-tanglang-complete-bundle-189", "res-drama-chongsheng-tanglang-season-1-93", "res-drama-chongsheng-tanglang-season-2-96",
  "res-bundle-october-chuanyue-manju-top10-9in1", "res-drama-chixie-ru-song-season-8-100", "res-drama-daming-diyigong-season-6-224",
  "res-drama-daming-diyigong-li-jinglong-season-6-224", "res-drama-weijia-nizi-cheng-shoufu-78",
  "res-drama-jin-jiuzhou-season-22-174", "res-drama-weijia-nizi-shoufu-78", "res-drama-hongwu-gou-changsheng-season-1-256",
  "res-drama-zhenguo-fumaye-334", "res-drama-yipin-buyi-4-geju-70", "res-drama-guoshi-ding-daming-season-5-233",
  "res-drama-bianjun-wuzu-shengzhiji-70", "res-movie-fall-1-2-complete-4k-collection", "res-bundle-october-6-mixed-resources",
  "res-weekly-610-516", "res-weekly-610-374", "res-weekly-610-583", "res-weekly-610-579", "res-doc-netflix-top-100-documentaries-collection",
  "res-weekly-610-401", "res-weekly-610-491", "res-weekly-610-005", "res-weekly-610-302", "res-weekly-610-386", "res-weekly-610-520",
  "res-weekly-610-375", "res-weekly-610-214", "res-weekly-610-356", "res-weekly-610-033", "res-weekly-610-458", "res-weekly-610-446",
  "res-weekly-610-408", "res-weekly-610-229", "res-weekly-610-290", "res-weekly-610-004", "res-edu-national-geographic-reach-higher-1-6",
  "res-edu-ielts-100-sentences-7000-words-complete", "res-weekly-610-195", "res-weekly-610-147", "res-weekly-610-489", "res-weekly-610-442",
  "res-weekly-610-209", "res-weekly-610-166", "res-weekly-610-270", "res-weekly-610-354", "res-weekly-610-378", "res-weekly-610-073",
  "res-weekly-610-340", "res-weekly-610-024", "res-weekly-610-591", "res-weekly-610-578", "res-weekly-610-558", "res-weekly-610-363",
  "res-weekly-610-108", "res-weekly-610-607", "res-weekly-610-321", "res-weekly-610-180", "res-weekly-610-541", "res-weekly-610-032",
  "res-weekly-610-568", "res-weekly-610-519", "res-weekly-610-006", "res-weekly-610-008", "res-weekly-610-318", "res-weekly-610-225",
  "res-weekly-610-601", "res-weekly-610-309", "res-weekly-610-074", "res-weekly-610-028", "res-weekly-610-056", "res-weekly-610-094",
  "res-weekly-610-289", "res-weekly-610-590", "res-weekly-610-544", "res-weekly-610-598", "res-weekly-610-261", "res-weekly-610-013",
  "res-weekly-610-019", "res-weekly-610-002", "res-weekly-610-071", "res-weekly-610-241", "res-weekly-610-169", "res-weekly-610-573",
  "res-weekly-610-153", "res-weekly-610-205", "res-weekly-610-025", "res-weekly-610-067", "res-weekly-610-046", "res-weekly-610-118",
  "res-weekly-610-362", "res-weekly-610-055", "res-weekly-610-462", "res-weekly-610-232", "res-weekly-610-390", "res-weekly-610-107",
  "res-weekly-610-288", "res-weekly-610-098", "res-weekly-610-114", "res-weekly-610-136", "res-weekly-610-163", "res-weekly-610-203",
  "res-weekly-610-248", "res-weekly-610-324", "res-weekly-610-517", "res-weekly-610-062", "res-weekly-610-037", "res-weekly-610-246",
  "res-weekly-610-428", "res-weekly-610-592", "res-weekly-610-448", "res-weekly-610-152", "res-weekly-610-215", "res-weekly-610-588",
  "res-weekly-610-334", "res-weekly-610-217", "res-weekly-610-547", "res-weekly-610-179", "res-weekly-610-580"
]);

function isAcademicStudy(t: string) {
  return /小学|初中|高中|中考|高考|考研|考公|公务员|真题|教辅|黄冈|期末|试卷|奥数|培优|提分|四六级|雅思|托福|专四|专八|大学物理|高等数学|高数|线代|概率论|公开课|麻省理工|哈佛|清华|北大|英语|口语|语法|词汇|单词|音标|日语|韩语|法语|俄语|德语|西班牙语|多语种|新概念|剑桥|牛津|背单词|朗文|Python|Java|C\+\+|前端|后端|代码|编程|算法|LeetCode|MySQL|Linux|数据结构|机器学习|人工智能|深度学习|大模型|全栈|学而思|wordly wise|自学英文/.test(t);
}

const unclassified = all630.filter(r => !avIds.has(r.id) && !isAcademicStudy(r.title));

const groups: Record<string, { title: string, items: any[] }> = {
  g1_software: { title: "实用软件、破解工具与黑科技系统（79套）", items: [] },
  g2_sidehustle: { title: "副业搞钱、网络创业与电商实操（32套）", items: [] },
  g3_business_mindset: { title: "商业通识、财富逻辑与社会认知（199套）", items: [] },
  g4_dating_relationship: { title: "情商社交、恋爱婚恋与两性沟通（22套）", items: [] },
  g5_books_novels: { title: "经典电子书、网络小说与世界名著珍藏（98套）", items: [] },
  g6_lifestyle_health: { title: "生活实用、传统文化、健康调理与家政手艺（20套）", items: [] },
  g7_games: { title: "精品单机游戏、掌机模拟器与休闲娱乐（5套）", items: [] }
};

for (const r of unclassified) {
  const t = r.title;
  const m = r.mainCategoryId;
  if (m === "software" || /软件|工具|破解|安装包|激活|插件|系统|脚本|源码|助手|VIP|预设|字体|模板|提取宝|下载神器|剪辑软件|记账|potplayer|WPS|Office|数据恢复|Waifu2x|易剪媒|朋友圈查看/.test(t)) {
    groups.g1_software.items.push(r);
  } else if (m === "games" || /游戏|Steam|免安装|汉化|修改器|掌机|模拟器|单机/.test(t)) {
    groups.g7_games.items.push(r);
  } else if (/副业|搞钱|生财有术|闲鱼|电商|带货|小红书|变现|无货源|引流|私域|月入|地摊|开店|淘客|拼多多|淘宝|抖店|自媒体运营|掘金|油管小白|美团拍照|虚拟资料|双平台托管|赚钱|团购达人/.test(t)) {
    groups.g2_sidehustle.items.push(r);
  } else if (/坏男孩|型男|撩妹|撩道|泡妞|把妹|女心理|恋爱情感|脱单|聊天72招|话术惯例库|反PUA|幽默式聊天|道德lang女|亲密关系|失恋|挽回|两性|婚恋/.test(t)) {
    groups.g4_dating_relationship.items.push(r);
  } else if (/秘术|风水|八字|命理|面相|中医|养生|健身|菜谱|美食|烘焙|旅游攻略|水电|家政|收纳|开锁|维修|装修|民间秘术/.test(t)) {
    groups.g6_lifestyle_health.items.push(r);
  } else if (m === "books" || /小说|门阀|世界名著|Z-Library|读者|合集|文学|传记|白夜行|东野圭吾|莫言|刘慈欣|三体|科幻|玄幻|绘本|书单|文字版|套装书/.test(t)) {
    groups.g5_books_novels.items.push(r);
  } else {
    groups.g3_business_mindset.items.push(r);
  }
}

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>455套精选资源防封清单 (纯防封链接版) - 网盘吧</title>
  <style>
    :root {
      --primary: #2563eb;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text: #0f172a;
      --muted: #64748b;
      --border: #e2e8f0;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background: var(--bg); color: var(--text); padding: 24px 16px; line-height: 1.6; }
    .container { max-width: 1000px; margin: 0 auto; }
    header { background: var(--card-bg); padding: 24px; border-radius: 12px; border: 1px solid var(--border); margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    h1 { font-size: 24px; margin-bottom: 8px; color: #1e293b; }
    p.desc { color: var(--muted); font-size: 14px; margin-bottom: 16px; }
    .toolbar { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; }
    .search-box { flex: 1; min-width: 240px; padding: 10px 14px; border: 1px solid var(--border); border-radius: 8px; font-size: 14px; outline: none; }
    .search-box:focus { border-color: var(--primary); }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; text-decoration: none; cursor: pointer; border: none; transition: all 0.2s; }
    .btn-primary { background: var(--primary); color: #fff; }
    .btn-primary:hover { background: #1d4ed8; }
    .btn-outline { background: #fff; border: 1px solid var(--border); color: #334155; }
    .btn-outline:hover { background: #f1f5f9; }
    .category-card { background: var(--card-bg); border-radius: 12px; border: 1px solid var(--border); margin-bottom: 24px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .category-header { background: #f1f5f9; padding: 14px 20px; font-size: 16px; font-weight: 700; color: #1e293b; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
    .items-list { list-style: none; }
    .item-row { padding: 14px 20px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
    .item-row:last-child { border-bottom: none; }
    .item-row:hover { background: #f8fafc; }
    .item-title { font-size: 14px; font-weight: 500; color: #1e293b; flex: 1; word-break: break-all; }
    .item-actions { display: flex; gap: 8px; flex-shrink: 0; }
    .item-btn { font-size: 12px; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-weight: 500; }
    .toast { position: fixed; bottom: 24px; right: 24px; background: #0f172a; color: #fff; padding: 12px 20px; border-radius: 8px; font-size: 14px; opacity: 0; pointer-events: none; transition: opacity 0.3s; z-index: 999; }
    .toast.show { opacity: 1; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>455套精选资源防封清单 (纯防封链接版)</h1>
      <p class="desc">已剔除学习类与音视频类，按实用软件、网络创业、商业通识、情商两性、经典名著、传统生活及游戏等7大类呈现。所有链接均为防红独立落地页。</p>
      <div class="toolbar">
        <input type="text" id="searchInput" class="search-box" placeholder="搜索资源名称、关键词..." oninput="handleSearch()">
        <a href="/remaining_resources_antiban.txt" download="455套资源纯防封清单.txt" class="btn btn-primary">📥 下载 TXT 纯文本</a>
        <button onclick="copyAllAntiban()" class="btn btn-outline">📋 一键复制全部防封链接</button>
      </div>
    </header>

    <div id="contentArea">
` + Object.entries(groups).map(([k, g]) => `
      <div class="category-card" data-category="${k}">
        <div class="category-header">
          <span>${g.title}</span>
          <span style="font-size: 12px; font-weight: normal; color: var(--muted);">${g.items.length} 个资源</span>
        </div>
        <ul class="items-list">
` + g.items.map((r, i) => `
          <li class="item-row" data-title="${r.title.toLowerCase().replace(/"/g, '')}">
            <div class="item-title">${i + 1}. ${r.title}</div>
            <div class="item-actions">
              <button class="btn btn-outline item-btn" onclick="copyText('https://www.wangpan8.com/resource/${r.id}.html')">复制防封链接</button>
              <a href="/resource/${r.id}.html" target="_blank" class="btn btn-primary item-btn">打开落地页</a>
            </div>
          </li>
`).join("") + `
        </ul>
      </div>
`).join("") + `
    </div>
  </div>

  <div id="toast" class="toast">复制成功！</div>

  <script>
    function showToast(msg) {
      const t = document.getElementById('toast');
      t.innerText = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 2000);
    }

    function copyText(text) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('已复制：' + text);
      }).catch(() => {
        const inp = document.createElement('input');
        inp.value = text;
        document.body.appendChild(inp);
        inp.select();
        document.execCommand('copy');
        document.body.removeChild(inp);
        showToast('已复制防封链接');
      });
    }

    function copyAllAntiban() {
      fetch('/remaining_resources_antiban.txt')
        .then(res => res.text())
        .then(text => {
          navigator.clipboard.writeText(text).then(() => {
            showToast('已成功复制全部 455 套资源的防封链接！');
          });
        });
    }

    function handleSearch() {
      const q = document.getElementById('searchInput').value.trim().toLowerCase();
      const rows = document.querySelectorAll('.item-row');
      rows.forEach(r => {
        const title = r.getAttribute('data-title') || '';
        if (!q || title.includes(q)) {
          r.style.display = 'flex';
        } else {
          r.style.display = 'none';
        }
      });
      document.querySelectorAll('.category-card').forEach(card => {
        const visibleRows = card.querySelectorAll('.item-row[style="display: flex;"], .item-row:not([style*="display: none"])');
        if (q && visibleRows.length === 0) {
          card.style.display = 'none';
        } else {
          card.style.display = 'block';
        }
      });
    }
  </script>
</body>
</html>`;

fs.writeFileSync("public/remaining-resources.html", html, "utf-8");
console.log("Successfully generated public/remaining-resources.html");
