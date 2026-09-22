import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_RESOURCES } from '../src/data/resources';
import { MAIN_FOLDERS } from '../src/data/categories';
import { ResourceItem, MainFolderCategory } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');
const RESOURCE_DIR = path.resolve(PUBLIC_DIR, 'resource');
const CATEGORY_DIR = path.resolve(PUBLIC_DIR, 'category');

const DOMAIN = 'https://www.wangpan8.com';
const SITE_NAME = '网盘吧 (www.wangpan8.com)';
const DEFAULT_DATE = '2026-09-05';

// 确保输出目录存在
if (!fs.existsSync(RESOURCE_DIR)) {
  fs.mkdirSync(RESOURCE_DIR, { recursive: true });
}
if (!fs.existsSync(CATEGORY_DIR)) {
  fs.mkdirSync(CATEGORY_DIR, { recursive: true });
}

// 辅助函数：转义 HTML 特殊字符
function escapeHtml(str: string = ''): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 辅助函数：格式化名称（去除多余括号和避免《《》》嵌套）
function formatCleanName(str: string = ''): string {
  return str.replace(/^《+|》+$/g, '').trim();
}

// 辅助函数：提取资源自然搜索核心关键词与标题
function generateSeoTitle(res: ResourceItem): string {
  const cleanTitle = formatCleanName(res.title.replace(/【.*?】|\[.*?\]/g, '').trim());
  const drive = res.driveName || '夸克网盘';
  
  if (res.mainCategoryId === 'video') {
    return `《${cleanTitle}》高清完整版全集下载｜${res.quality || '高清'}｜${drive} - 网盘吧`;
  } else if (res.mainCategoryId === 'books') {
    return `《${cleanTitle}》电子书全集EPUB/MOBI/PDF打包下载｜${drive} - 网盘吧`;
  } else if (res.mainCategoryId === 'games') {
    return `《${cleanTitle}》PC中文免安装绿色版/全DLC下载｜${drive} - 网盘吧`;
  } else if (res.mainCategoryId === 'education') {
    return `《${cleanTitle}》高清视频网课与真题备考讲义下载｜${drive} - 网盘吧`;
  } else if (res.mainCategoryId === 'music') {
    return `《${cleanTitle}》无损音乐专辑打包下载(FLAC/APE/Hi-Res)｜${drive} - 网盘吧`;
  }
  return `《${cleanTitle}》资源分享免费转存下载｜${drive} - 网盘吧`;
}

// 辅助函数：生成精简的 Description（120~160字）
function generateSeoDescription(res: ResourceItem): string {
  const cleanTitle = formatCleanName(res.title.replace(/【.*?】|\[.*?\]/g, '').trim());
  const drive = res.driveName || '网盘';
  const sizeText = res.size ? `文件容量约${res.size}，` : '';
  const qualityText = res.quality ? `规格品质为${res.quality}，` : '';
  const descPreview = (res.description || res.title)
    .replace(/\s+/g, ' ')
    .replace(/https?:\/\/\S+/g, '')
    .slice(0, 100);

  return `《${cleanTitle}》由网盘吧权威整理收录。该资源存储于${drive}，${qualityText}${sizeText}支持免密直接转存或客户端高速下载。${descPreview}更多最新全网热搜影视、电子书、教育与游戏资源，请访问网盘吧官网(www.wangpan8.com)。`;
}

// 辅助函数：生成关键词 Keywords (自然搜索意图词)
function generateSeoKeywords(res: ResourceItem): string {
  const words = new Set<string>();
  const clean = formatCleanName(res.title.replace(/【.*?】|\[.*?\]/g, '').trim());
  
  words.add('网盘吧');
  words.add('www.wangpan8.com');
  words.add(res.driveName);
  words.add(`${res.driveName}资源`);
  words.add(`${res.driveName}下载`);

  if (res.tags && res.tags.length > 0) {
    res.tags.forEach(t => words.add(t));
  }

  // 提取中文名与英文名长尾词
  const matchParen = clean.match(/^([^\(（]+)[\(（]([^\)）]+)[\)）]/);
  if (matchParen) {
    const zhName = matchParen[1].trim();
    const enName = matchParen[2].trim();
    if (zhName) {
      words.add(zhName);
      words.add(`${zhName} 下载`);
      words.add(`${zhName} ${res.driveName}`);
      words.add(`${zhName} 全集`);
      words.add(`${zhName} 资源`);
    }
    if (enName && /^[a-zA-Z0-9\s:,'"-]+$/.test(enName)) {
      words.add(enName);
      words.add(`${enName} download`);
      words.add(`${zhName} ${enName}`);
    }
  } else {
    words.add(clean);
    words.add(`${clean} 下载`);
    words.add(`${clean} ${res.driveName}`);
  }

  if (res.categoryName) words.add(res.categoryName);
  if (res.subCategoryName) words.add(res.subCategoryName);

  return Array.from(words).slice(0, 16).join(', ');
}

// 辅助函数：根据分类映射 Schema.org Type
function getSchemaType(res: ResourceItem): string {
  switch (res.mainCategoryId) {
    case 'video':
      return res.subCategoryId === 'movie' ? 'Movie' : 'TVSeries';
    case 'books':
      return 'Book';
    case 'software':
      return 'SoftwareApplication';
    case 'games':
      return 'VideoGame';
    case 'music':
      return 'MusicAlbum';
    default:
      return 'DigitalDocument';
  }
}

// 生成单个资源的独立 HTML
function renderResourceHtml(res: ResourceItem, relatedResources: ResourceItem[], mainCategory?: MainFolderCategory): string {
  const pageTitle = generateSeoTitle(res);
  const metaDesc = generateSeoDescription(res);
  const keywords = generateSeoKeywords(res);
  const canonicalUrl = `${DOMAIN}/resource/${res.id}.html`;
  const homeUrl = DOMAIN;
  const spaDirectUrl = `${DOMAIN}/?id=${encodeURIComponent(res.id)}`;
  const schemaType = getSchemaType(res);

  const cleanName = formatCleanName(res.title.replace(/【.*?】|\[.*?\]/g, '').trim());

  // 构造 JSON-LD 实体定义
  const jsonLdEntity = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: res.title,
    description: metaDesc,
    url: canonicalUrl,
    inLanguage: 'zh-CN',
    fileFormat: res.quality || 'Digital Media',
    contentSize: res.size || 'Unspecified',
    datePublished: res.publishDate || DEFAULT_DATE,
    genre: res.categoryName || 'General',
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: DOMAIN
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
      availability: 'https://schema.org/InStock',
      url: res.driveUrl || canonicalUrl
    }
  };

  // 构造 FAQPage 结构化问答（GEO / AI 搜索核心）
  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `如何下载或转存《${cleanName}》？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `《${cleanName}》目前通过${res.driveName}进行免密分享。您可以直接访问网盘吧提供的专属链接（${res.driveUrl}）${res.extractCode ? `，并输入提取码【${res.extractCode}】` : ''}即可一键转存至您的个人网盘或客户端高速下载。`
        }
      },
      {
        '@type': 'Question',
        name: `《${cleanName}》的文件大小与清晰度规格是多少？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `本资源总容量大小约为【${res.size || '未知'}】，版本规格为【${res.quality || '高清官方版'}】，更新时间为【${res.publishDate || '最新'}】。资源经过网盘吧完整校验，内容完好有效。`
        }
      },
      {
        '@type': 'Question',
        name: `为什么推荐通过网盘吧 (www.wangpan8.com) 获取此资源？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `网盘吧专注为广大影迷、书友、学生与软件极客提供全网优质网盘资源聚合检索服务，收录夸克网盘、百度网盘、UC网盘、阿里云盘等真实不限速资源，每日实时更新并剔除失效死链，杜绝虚假与套路。`
        }
      }
    ]
  };

  // 构造面包屑 JSON-LD
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '网盘吧首页',
        item: DOMAIN
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: mainCategory?.name || '资源分类',
        item: `${DOMAIN}/category/${res.mainCategoryId}.html`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: res.subCategoryName || res.categoryName || '正文',
        item: canonicalUrl
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(metaDesc)}">
  <meta name="keywords" content="${escapeHtml(keywords)}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:site_name" content="${SITE_NAME}">
  
  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(pageTitle)}">
  <meta name="twitter:description" content="${escapeHtml(metaDesc)}">

  <!-- Schema.org 结构化数据 (JSON-LD) -->
  <script type="application/ld+json">
${JSON.stringify(jsonLdEntity, null, 2)}
  </script>
  <script type="application/ld+json">
${JSON.stringify(jsonLdFaq, null, 2)}
  </script>
  <script type="application/ld+json">
${JSON.stringify(jsonLdBreadcrumb, null, 2)}
  </script>

  <!-- 智能设备判定与重定向路由:
       1. 电脑端 (PC/Mac/桌面设备): 毫秒级直达夸克网盘真实页面，省去中间多余点击
       2. 推特 / 𝕏 手机端及移动设备: 停留在本防封与唤起判定页，防止外部网盘被拦截，支持一键唤起与免封复制
       3. 搜索引擎蜘蛛 (Google/Baidu/Bing等): 严格保留完整页面内容与结构化数据以保障 SEO 权威索引
  -->
  <script>
    (function() {
      try {
        var ua = navigator.userAgent || '';
        // 检测移动端设备 (手机、平板等)
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(ua) || 
                       (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        // 检测是否在 Twitter / 𝕏 内置浏览器中
        var isTwitter = /Twitter/i.test(ua);
        // 检测是否为搜索引擎蜘蛛爬虫 (Googlebot, Baiduspider 等，绝不跳转，确保 SEO 收录完美)
        var isBot = /bot|spider|crawl|slurp|googlebot|bingbot|baiduspider|bytespider|yandex|sogou|360spider/i.test(ua);
        // 支持 ?noredirect=1 或 ?preview=1 强制留在本页调试预览
        var isNoRedirect = window.location.search.indexOf('noredirect=1') !== -1 || window.location.search.indexOf('preview=1') !== -1;

        // 判定规则执行：
        // 电脑端直接跳转到夸克网盘；推特/𝕏 APP 及移动端留在本落地判定页
        if (!isMobile && !isTwitter && !isBot && !isNoRedirect) {
          var targetDriveUrl = "${escapeHtml(res.driveUrl)}";
          if (targetDriveUrl && targetDriveUrl.length > 5) {
            if (targetDriveUrl.indexOf('http://') !== 0 && targetDriveUrl.indexOf('https://') !== 0) {
              targetDriveUrl = 'https://' + targetDriveUrl;
            }
            window.location.replace(targetDriveUrl);
          }
        }
      } catch (e) {}
    })();
  </script>

  <style>
    :root {
      --primary: #10b981;
      --primary-dark: #059669;
      --text-main: #1f2937;
      --text-muted: #6b7280;
      --bg-main: #f9fafb;
      --bg-card: #ffffff;
      --border: #e5e7eb;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --text-main: #f3f4f6;
        --text-muted: #9ca3af;
        --bg-main: #111827;
        --bg-card: #1f2937;
        --border: #374151;
      }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: var(--bg-main);
      color: var(--text-main);
      line-height: 1.6;
    }
    .container {
      max-width: 860px;
      margin: 0 auto;
      padding: 24px 16px;
    }
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    /* 人类访客友好提示栏 */
    .human-banner {
      background: linear-gradient(135deg, #10b98115, #3b82f615);
      border: 1px solid #10b98140;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 18px;
      background: #10b981;
      color: #fff !important;
      font-weight: 600;
      font-size: 14px;
      text-decoration: none;
      border-radius: 8px;
      transition: background 0.2s;
    }
    .btn:hover {
      background: #059669;
    }
    .btn-secondary {
      background: #3b82f6;
    }
    .btn-secondary:hover {
      background: #2563eb;
    }
    .breadcrumb {
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 12px;
    }
    .breadcrumb a {
      color: inherit;
      text-decoration: none;
    }
    .breadcrumb a:hover {
      text-decoration: underline;
    }
    h1 {
      font-size: 22px;
      line-height: 1.4;
      margin: 0 0 16px 0;
      color: var(--text-main);
    }
    h2 {
      font-size: 17px;
      margin: 20px 0 12px 0;
      border-left: 4px solid var(--primary);
      padding-left: 10px;
      color: var(--text-main);
    }
    /* 核心事实表格（AI 最偏好的 GEO 结构） */
    .facts-table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      font-size: 14px;
    }
    .facts-table th, .facts-table td {
      border: 1px solid var(--border);
      padding: 10px 14px;
      text-align: left;
    }
    .facts-table th {
      background: rgba(0,0,0,0.03);
      width: 25%;
      color: var(--text-muted);
      font-weight: 600;
    }
    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }
    .tag {
      font-size: 12px;
      background: rgba(16, 185, 129, 0.1);
      color: var(--primary-dark);
      padding: 4px 10px;
      border-radius: 9999px;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }
    .download-box {
      background: rgba(16, 185, 129, 0.08);
      border: 1px dashed var(--primary);
      border-radius: 12px;
      padding: 18px;
      margin: 20px 0;
      text-align: center;
    }
    /* 仿截图 夸克网盘分享原生风格卡片 (不暴露可点击外链，防误触/防拦截/极简转存) */
    .quark-app-modal {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 24px 22px;
      margin-bottom: 24px;
      box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.02);
    }
    .quark-modal-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 22px;
    }
    .quark-logo-badge {
      width: 38px;
      height: 38px;
      background: #2563eb;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 20px;
      font-weight: bold;
      box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
    }
    .quark-modal-title {
      font-size: 20px;
      font-weight: 800;
      color: #1e293b;
      letter-spacing: -0.2px;
    }
    .quark-section-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 6px;
    }
    .quark-section-dot {
      width: 8px;
      height: 8px;
      background: #2563eb;
      border-radius: 50%;
      display: inline-block;
    }
    .quark-section-desc {
      font-size: 13px;
      color: #64748b;
      line-height: 1.6;
      margin: 0 0 12px 0;
    }
    .btn-quark-primary {
      display: block;
      width: 100%;
      background: #3b82f6;
      color: #ffffff !important;
      text-align: center;
      padding: 13px 20px;
      border-radius: 14px;
      font-size: 16px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
      transition: all 0.2s ease;
      box-sizing: border-box;
    }
    .btn-quark-primary:hover {
      background: #2563eb;
      transform: translateY(-1px);
    }
    .quark-url-display-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 12px 14px;
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
      color: #334155;
      word-break: break-all;
      user-select: all;
      cursor: text;
      margin-bottom: 12px;
    }
    .btn-copy-quark {
      display: block;
      width: 100%;
      background: #eff6ff;
      color: #2563eb;
      border: 1px solid #bfdbfe;
      border-radius: 12px;
      padding: 12px 20px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }
    .btn-copy-quark:hover {
      background: #dbeafe;
    }
    .quark-footer-note {
      font-size: 12px;
      color: #94a3b8;
      text-align: center;
      margin: 12px 0 0 0;
      line-height: 1.5;
    }
    @media (prefers-color-scheme: dark) {
      .quark-app-modal {
        background: #1e293b;
        border-color: #334155;
        box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.4);
      }
      .quark-modal-title, .quark-section-label {
        color: #f1f5f9;
      }
      .quark-section-desc {
        color: #94a3b8;
      }
      .quark-url-display-box {
        background: #0f172a;
        border-color: #334155;
        color: #cbd5e1;
      }
      .btn-copy-quark {
        background: rgba(59, 130, 246, 0.15);
        color: #60a5fa;
        border-color: rgba(59, 130, 246, 0.3);
      }
      .btn-copy-quark:hover {
        background: rgba(59, 130, 246, 0.25);
      }
      .quark-footer-note {
        color: #64748b;
      }
    }
    .faq-item {
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border);
    }
    .faq-q {
      font-weight: 700;
      font-size: 15px;
      margin-bottom: 6px;
      color: var(--text-main);
    }
    .faq-a {
      font-size: 14px;
      color: var(--text-muted);
      margin: 0;
    }
    .related-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .related-list li {
      padding: 8px 0;
      border-bottom: 1px dashed var(--border);
    }
    .related-list a {
      color: var(--text-main);
      text-decoration: none;
      font-size: 14px;
    }
    .related-list a:hover {
      color: var(--primary);
      text-decoration: underline;
    }
    footer {
      text-align: center;
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 32px;
      padding-top: 20px;
      border-top: 1px solid var(--border);
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- 面包屑导航 -->
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="${homeUrl}">网盘吧首页</a> &gt; 
      <a href="${DOMAIN}/category/${res.mainCategoryId}.html">${escapeHtml(mainCategory?.name || '分类')}</a> &gt; 
      <span>${escapeHtml(res.subCategoryName || res.categoryName || '正文')}</span>
    </nav>

    <!-- 核心资源卡片 -->
    <article class="card">
      <header>
        <h1 style="font-size:22px; font-weight:800; line-height:1.4; margin-bottom:12px; color:var(--text-main);">${escapeHtml(res.title)}</h1>
        <div style="font-size:13px; color:var(--text-muted); margin-bottom:18px;">
          <span>更新时间：${escapeHtml(res.publishDate || DEFAULT_DATE)}</span> &bull; 
          <span>来源分站：${escapeHtml(res.subsiteName)}</span> &bull; 
          <span>收录分类：${escapeHtml(res.categoryName)}</span>
        </div>
      </header>

      <!-- 电脑端直达提示 (电脑端默认已毫秒级重定向，此处作为备用防卡通道) -->
      <div id="pcRedirectNotice" style="display:none; background:#eff6ff; border:1px solid #bfdbfe; color:#1e40af; border-radius:12px; padding:12px 16px; margin-bottom:18px; font-size:14px; text-align:center;">
        <span>💻 检测到您正在使用电脑端浏览器，正在为您直达夸克网盘... 如未自动跳转，</span>
        <a href="${escapeHtml(res.driveUrl)}" style="color:#2563eb; font-weight:bold; text-decoration:underline;">请点击这里直接打开</a>
      </div>

      <!-- 【夸克网盘分享原生风格卡片】严格参照用户提供截图样式构建：不出现可点击链接，防误点/防推特屏蔽 -->
      <section class="quark-app-modal" aria-label="夸克网盘分享">
        <!-- 头部 Logo 与 标题 -->
        <div class="quark-modal-header">
          <div class="quark-logo-badge" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="4" fill="currentColor"></circle>
            </svg>
          </div>
          <h2 class="quark-modal-title" style="margin:0; padding:0; border:none;">${escapeHtml(res.driveName)}分享</h2>
        </div>

        <!-- 1. 打开资源 -->
        <div style="margin-bottom:20px;">
          <div class="quark-section-label">
            <span class="quark-section-dot"></span>
            <span>打开资源</span>
          </div>
          <p class="quark-section-desc">
            点击按钮唤起夸克并自动跳转。若未打开，请复制链接到浏览器自行打开。
          </p>
          <button type="button" class="btn-quark-primary" onclick="handleOpenQuarkApp('${escapeHtml(res.driveUrl)}')">
            打开夸克 App
          </button>
        </div>

        <!-- 2. 网盘链接（纯文本不可点，仅供查看与一键复制，不出现可点击外链，免得误点打不开） -->
        <div style="margin-bottom:6px;">
          <div class="quark-section-label">
            <span class="quark-section-dot"></span>
            <span>网盘链接</span>
          </div>
          <div class="quark-url-display-box" id="quarkUrlText" title="双击或点击复制">
            ${escapeHtml(res.driveUrl)}
          </div>
          <button type="button" class="btn-copy-quark" onclick="copyText('${escapeHtml(res.driveUrl)}', '夸克链接已成功复制！')">
            复制夸克链接
          </button>
          <p class="quark-footer-note">
            打开 App 没反应？也可以复制夸克链接，再用 Safari、Chrome 或夸克 APP 打开。
          </p>
        </div>

        ${res.extractCode ? `
        <!-- 提取码 / 口令（如有） -->
        <div style="margin-top:16px; padding:12px 14px; background:#f0fdf4; border:1px dashed #86efac; border-radius:12px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
          <div style="font-size:13px; color:#166534;">
            <span style="font-weight:700;">提取口令 / 提取码：</span>
            <strong style="font-size:16px; font-family:monospace; background:#fff; padding:2px 8px; border-radius:6px; border:1px solid #bbf7d0; color:#15803d;">${escapeHtml(res.extractCode)}</strong>
          </div>
          <button type="button" onclick="copyText('${escapeHtml(res.extractCode)}', '提取口令已成功复制！')" style="background:#16a34a; color:#fff; border:none; padding:6px 14px; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer;">
            一键复制口令
          </button>
        </div>
        ` : ''}

        <!-- 快速回到主站全部功能 -->
        <div style="margin-top:14px; text-align:center;">
          <a href="${spaDirectUrl}" style="color:#64748b; font-size:12px; text-decoration:underline;">
            🖥️ 浏览该资源的网盘吧主站全功能详情
          </a>
        </div>
      </section>

      <!-- AI / GEO 专属实体速查卡片 (Generative Engine Optimization Block) -->
      <section style="background:rgba(59,130,246,0.06); border:1px solid rgba(59,130,246,0.25); border-radius:12px; padding:16px; margin-bottom:20px;" aria-label="AI 智能摘要">
        <div style="font-weight:700; font-size:14px; color:#2563eb; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
          <span>🤖 AI 智能搜索与实体抽取摘要 (GEO Direct Citation)</span>
        </div>
        <p style="margin:0; font-size:14px; color:var(--text-main); line-height:1.65;">
          <strong>《${escapeHtml(formatCleanName(res.title))}》</strong>是收录于网盘吧权威索引库的精品${escapeHtml(res.categoryName)}资源。
          该资源存放在<strong>${escapeHtml(res.driveName)}</strong>平台，文件规格为<strong>${escapeHtml(res.quality || '高清官方版')}</strong>，总容量约为<strong>${escapeHtml(res.size || '完整合集')}</strong>。
          用户可直接免密转存或输入提取码${res.extractCode ? `【${escapeHtml(res.extractCode)}】` : ''}保存至个人网盘，支持手机端与电脑客户端多端高速下载。
        </p>
      </section>

      <!-- 核心事实列表 (Key Facts Table) - AI/GEO 最爱 -->
      <h2>📌 资源核心事实清单 (Key Facts)</h2>
      <table class="facts-table" summary="资源基本规格与属性信息">
        <tbody>
          <tr>
            <th>资源全名</th>
            <td><strong>${escapeHtml(res.title)}</strong></td>
          </tr>
          <tr>
            <th>归属分类</th>
            <td>${escapeHtml(mainCategory?.name || '其他')} &gt; ${escapeHtml(res.subCategoryName || res.categoryName)}</td>
          </tr>
          <tr>
            <th>网盘渠道</th>
            <td><strong>${escapeHtml(res.driveName)}</strong> (${escapeHtml(res.driveType.toUpperCase())})</td>
          </tr>
          <tr>
            <th>文件大小</th>
            <td>${escapeHtml(res.size || '暂无标注')}</td>
          </tr>
          <tr>
            <th>清晰度/规格</th>
            <td>${escapeHtml(res.quality || '高清官方版')}</td>
          </tr>
          <tr>
            <th>提取码/密码</th>
            <td>${res.extractCode ? `<code>${escapeHtml(res.extractCode)}</code>` : '免密直接转存 / 公开分享'}</td>
          </tr>
          <tr>
            <th>收录平台</th>
            <td><a href="${DOMAIN}" target="_blank">网盘吧 (www.wangpan8.com)</a></td>
          </tr>
        </tbody>
      </table>

      <!-- 资源深度介绍与看点 -->
      <h2>📖 资源详细内容与看点介绍</h2>
      <div style="font-size:15px; line-height:1.7; color:var(--text-main);">
        <p>${escapeHtml(res.description || res.title)}</p>
      </div>

      ${res.recommendation ? `
      <!-- 官方推荐文案 -->
      <h2>📢 官方推荐文案</h2>
      <div style="background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.3); border-radius:10px; padding:16px; font-size:14px; white-space:pre-line;">
${escapeHtml(res.recommendation)}
      </div>
      ` : ''}

      ${res.fileList && res.fileList.length > 0 ? `
      <!-- 包含文件清单 -->
      <h2>📂 包含文件与分集列表</h2>
      <ul style="background:rgba(0,0,0,0.02); border:1px solid var(--border); border-radius:8px; padding:12px 24px; font-size:13px; font-family:monospace;">
        ${res.fileList.map(f => `<li>${escapeHtml(f)}</li>`).join('\n        ')}
      </ul>
      ` : ''}

      <!-- 标签体系 -->
      ${res.tags && res.tags.length > 0 ? `
      <h2>🏷️ 相关主题标签</h2>
      <div class="tags-container">
        ${res.tags.map(t => `<span class="tag">#${escapeHtml(t)}</span>`).join('\n        ')}
      </div>
      ` : ''}

      <!-- 常见问答 (FAQ) - AI / GEO 极高权重引用 -->
      <h2>❓ 常见问答 (FAQ)</h2>
      <div class="faq-list">
        <div class="faq-item">
          <div class="faq-q">Q1：如何保存或下载该《${escapeHtml(cleanName)}》？</div>
          <p class="faq-a">A：点击上方提供的${escapeHtml(res.driveName)}直达链接${res.extractCode ? `，输入提取码【${escapeHtml(res.extractCode)}】` : ''}，即可保存到您的网盘账号中。支持网页端、电脑端及手机客户端不限速转存与下载。</p>
        </div>
        <div class="faq-item">
          <div class="faq-q">Q2：该资源是否支持在线播放或预览？</div>
          <p class="faq-a">A：${res.mainCategoryId === 'video' ? '支持！转存至网盘后，使用客户端可直接在线高清点播，无需全部下载至本地。' : res.mainCategoryId === 'books' ? '支持！转存后可直接使用网盘内置阅读器或第三方阅读App打开EPUB/PDF查看。' : '根据网盘支持情况，文档、音频及压缩包均支持在线预览或极速解压。'}</p>
        </div>
        <div class="faq-item">
          <div class="faq-q">Q3：如果链接失效了应该如何处理？</div>
          <p class="faq-a">A：您可以访问网盘吧官网（<a href="${DOMAIN}">www.wangpan8.com</a>），在全站搜索框中搜索该资源名称获取最新补充链接，或点击页面底部的反馈按钮向站长提交补链请求。</p>
        </div>
      </div>

      <!-- 站内同类资源推荐 (强内链) -->
      ${relatedResources.length > 0 ? `
      <h2>🧭 更多相关推荐资源</h2>
      <ul class="related-list">
        ${relatedResources.map(rel => `
        <li>
          <a href="${DOMAIN}/resource/${rel.id}.html">
            <strong>${escapeHtml(rel.title)}</strong> 
            <span style="font-size:12px; color:var(--text-muted);">[${escapeHtml(rel.driveName)} · ${escapeHtml(rel.size || '')}]</span>
          </a>
        </li>
        `).join('')}
      </ul>
      ` : ''}
    </article>

    <!-- 底部声明与版权导航 -->
    <footer>
      <p>网盘吧 (<a href="${DOMAIN}">www.wangpan8.com</a>) - 专业的网盘资源检索与内容索引平台</p>
      <p style="font-size:12px;">本页面内容均为互联网公开收集整理，仅供个人学习交流与研究，版权归原作者所有。如有侵权，请联系管理员及时处理。</p>
    </footer>
  </div>

  <div id="toast" style="display:none; position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:rgba(17,24,39,0.95); color:#fff; padding:10px 20px; border-radius:8px; font-size:14px; font-weight:bold; z-index:9999; box-shadow:0 4px 12px rgba(0,0,0,0.25);"></div>
  <script>
    function handleOpenQuarkApp(url) {
      if (!url) return;
      // 1. 优先自动复制到剪贴板，确保万无一失
      copyText(url, '链接已自动复制！正在尝试唤起夸克 App...');
      
      // 2. 尝试唤起夸克网盘 App (Quark URL Scheme)
      // 夸克移动端常见的 scheme 协议
      var quarkScheme = 'quark://open?url=' + encodeURIComponent(url);
      var startTime = Date.now();
      
      window.location.href = quarkScheme;
      
      // 3. 如果在 1.5 秒内没有离开页面，说明可能在 Twitter 内置 Webview 或未安装 App，弹窗友好提示
      setTimeout(function() {
        if (Date.now() - startTime < 2200) {
          copyText(url, '夸克链接已复制！请切换到手机浏览器或直接打开夸克APP');
        }
      }, 1500);
    }

    function copyText(text, msg) {
      if (!text) return;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(show).catch(function() { fallback(text); });
      } else {
        fallback(text);
      }
      function fallback(val) {
        var ta = document.createElement('textarea');
        ta.value = val;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); show(); } catch(e) {}
        document.body.removeChild(ta);
      }
      function show() {
        var toast = document.getElementById('toast');
        if (toast) {
          toast.textContent = msg || '已成功复制到剪贴板！';
          toast.style.display = 'block';
          clearTimeout(window.__toastTimer);
          window.__toastTimer = setTimeout(function() { toast.style.display = 'none'; }, 2500);
        }
      }
    }

    // 智能识别客户端访问环境：电脑端备用提示
    (function checkClientEnvironment() {
      var ua = navigator.userAgent || '';
      var isTwitter = /Twitter/i.test(ua);
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(ua) || 
                     (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      var isBot = /bot|spider|crawl|slurp|googlebot|bingbot|baiduspider|bytespider/i.test(ua);

      var pcEl = document.getElementById('pcRedirectNotice');
      if (pcEl && !isMobile && !isTwitter && !isBot) {
        pcEl.style.display = 'block';
      }
    })();
  </script>
</body>
</html>`;
}

// 生成分类页面 HTML
function renderCategoryHtml(category: MainFolderCategory, categoryResources: ResourceItem[]): string {
  const pageTitle = `${category.name}网盘资源汇总与合集下载｜网盘吧`;
  const metaDesc = `网盘吧${category.name}专区，收录${categoryResources.length}部精选${category.titleName}等优质网盘资源，涵盖夸克网盘、百度网盘、UC网盘等免密分享链接。`;
  const canonicalUrl = `${DOMAIN}/category/${category.id}.html`;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(metaDesc)}">
  <link rel="canonical" href="${canonicalUrl}">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f9fafb; color: #111827; margin:0; padding:20px; line-height:1.6; }
    .container { max-width: 860px; margin: 0 auto; background: #fff; border-radius: 16px; padding: 24px; border: 1px solid #e5e7eb; }
    h1 { font-size: 24px; margin-bottom: 8px; }
    .meta { font-size: 14px; color: #6b7280; margin-bottom: 20px; }
    .res-list { list-style: none; padding: 0; margin: 0; }
    .res-list li { padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
    .res-list a { color: #1f2937; text-decoration: none; font-size: 15px; font-weight: 500; }
    .res-list a:hover { color: #10b981; text-decoration: underline; }
    .badge { font-size: 12px; background: #ecfdf5; color: #059669; padding: 2px 8px; border-radius: 4px; margin-left: 8px; }
    .back { display: inline-block; margin-bottom: 16px; color: #10b981; text-decoration: none; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <a href="${DOMAIN}" class="back">&larr; 返回网盘吧首页</a>
    <h1>${escapeHtml(category.name)}</h1>
    <div class="meta">${escapeHtml(category.titleName)} &bull; 共收录 <strong>${categoryResources.length}</strong> 部优质资源</div>
    <ul class="res-list">
      ${categoryResources.map(res => `
      <li>
        <a href="${DOMAIN}/resource/${res.id}.html">${escapeHtml(res.title)}</a>
        <span class="badge">${escapeHtml(res.driveName)}</span>
        <span style="font-size:12px; color:#9ca3af; margin-left:8px;">${escapeHtml(res.size || '')}</span>
      </li>
      `).join('\n      ')}
    </ul>
  </div>
</body>
</html>`;
}

// 生成 XML 格式 Sitemap
function generateSitemapXml(resources: ResourceItem[], categories: MainFolderCategory[]): string {
  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

  // 1. 首页
  urls.push({
    loc: DOMAIN,
    lastmod: DEFAULT_DATE,
    changefreq: 'daily',
    priority: '1.0'
  });

  // 2. 分类页
  categories.forEach(cat => {
    urls.push({
      loc: `${DOMAIN}/category/${cat.id}.html`,
      lastmod: DEFAULT_DATE,
      changefreq: 'daily',
      priority: '0.8'
    });
  });

  // 3. 所有独立资源页 (423+)
  resources.forEach(res => {
    urls.push({
      loc: `${DOMAIN}/resource/${res.id}.html`,
      lastmod: (res.publishDate && res.publishDate.slice(0, 10)) || DEFAULT_DATE,
      changefreq: 'weekly',
      priority: res.isFeatured ? '0.9' : '0.7'
    });
  });

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xmlContent;
}

// 生成 HTML 格式 Sitemap (便于蜘蛛爬取全网链接)
function generateSitemapHtml(resources: ResourceItem[], categories: MainFolderCategory[]): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>网站地图 (Sitemap) - 网盘吧 (www.wangpan8.com)</title>
  <meta name="robots" content="index, follow">
  <style>
    body { font-family: -apple-system, sans-serif; padding: 24px; max-width: 900px; margin: 0 auto; color: #333; line-height: 1.6; }
    h1 { font-size: 22px; }
    h2 { font-size: 18px; margin-top: 24px; color: #059669; }
    ul { padding-left: 20px; font-size: 14px; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>网盘吧全站 HTML 站点地图 (Sitemap)</h1>
  <p>更新时间：${DEFAULT_DATE} ｜ 共收录 <strong>${resources.length}</strong> 部精品资源</p>
  <p><a href="${DOMAIN}">返回网盘吧首页 &rarr;</a></p>

  <h2>📚 资源分类目录</h2>
  <ul>
    ${categories.map(c => `<li><a href="${DOMAIN}/category/${c.id}.html">${escapeHtml(c.name)} (${escapeHtml(c.titleName)})</a></li>`).join('\n    ')}
  </ul>

  <h2>💎 全站所有收录资源直接索引</h2>
  <ul>
    ${resources.map(r => `<li><a href="${DOMAIN}/resource/${r.id}.html">${escapeHtml(r.title)}</a> [${escapeHtml(r.driveName)}]</li>`).join('\n    ')}
  </ul>
</body>
</html>`;
}

// 生成 robots.txt (对所有搜索引擎和 AI 爬虫完全开放)
function generateRobotsTxt(): string {
  return `# Robots.txt for 网盘吧 (www.wangpan8.com)
# 针对 Google, 百度, Bing, 360, 搜狗以及主流 AI 搜索引擎 (GPTBot, PerplexityBot, ClaudeBot, Bytespider) 完全开放

User-agent: *
Allow: /
Allow: /resource/
Allow: /category/
Allow: /sitemap.xml
Allow: /sitemap.html

# 主流 AI 搜索爬虫 (GEO 优化)
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

# 传统搜索引擎爬虫
User-agent: Googlebot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: Bingbot
Allow: /

User-agent: 360Spider
Allow: /

User-agent: Sogou web spider
Allow: /

User-agent: YisouSpider
Allow: /

# Sitemap 权威地址
Sitemap: ${DOMAIN}/sitemap.xml
`;
}

// 主执行入口
async function main() {
  console.log(`[SEO-Engine] 开始生成网盘吧独立 SEO & GEO 页面系统...`);
  console.log(`[SEO-Engine] 待处理资源总数: ${INITIAL_RESOURCES.length}`);
  console.log(`[SEO-Engine] 待处理核心分类总数: ${MAIN_FOLDERS.length}`);

  // 1. 为每个资源生成独立 HTML
  let resourceCount = 0;
  INITIAL_RESOURCES.forEach((res, index) => {
    // 寻找同分类下的其他推荐资源（6个）
    const related = INITIAL_RESOURCES
      .filter(r => r.id !== res.id && (r.mainCategoryId === res.mainCategoryId || r.subCategoryId === res.subCategoryId))
      .slice(0, 6);

    const mainCategory = MAIN_FOLDERS.find(f => f.id === res.mainCategoryId);
    const html = renderResourceHtml(res, related, mainCategory);
    
    // 写入 public/resource/${res.id}.html
    const filePath = path.resolve(RESOURCE_DIR, `${res.id}.html`);
    fs.writeFileSync(filePath, html, 'utf8');
    resourceCount++;
  });
  console.log(`[SEO-Engine]  已完成 ${resourceCount} 个独立资源 SEO/GEO 页面生成 -> public/resource/*.html`);

  // 2. 为每个核心分类生成分类索引 HTML
  let categoryCount = 0;
  MAIN_FOLDERS.forEach(cat => {
    const catResources = INITIAL_RESOURCES.filter(r => r.mainCategoryId === cat.id);
    const html = renderCategoryHtml(cat, catResources);
    const filePath = path.resolve(CATEGORY_DIR, `${cat.id}.html`);
    fs.writeFileSync(filePath, html, 'utf8');
    categoryCount++;
  });
  console.log(`[SEO-Engine]  已完成 ${categoryCount} 个核心分类索引页面生成 -> public/category/*.html`);

  // 3. 生成 sitemap.xml
  const sitemapXml = generateSitemapXml(INITIAL_RESOURCES, MAIN_FOLDERS);
  fs.writeFileSync(path.resolve(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`[SEO-Engine]  已生成 sitemap.xml (包含 ${INITIAL_RESOURCES.length + MAIN_FOLDERS.length + 1} 个权威 URL)`);

  // 4. 生成 sitemap.html
  const sitemapHtml = generateSitemapHtml(INITIAL_RESOURCES, MAIN_FOLDERS);
  fs.writeFileSync(path.resolve(PUBLIC_DIR, 'sitemap.html'), sitemapHtml, 'utf8');
  console.log(`[SEO-Engine]  已生成 sitemap.html (HTML 版蜘蛛索引地图)`);

  // 5. 生成 robots.txt
  const robotsTxt = generateRobotsTxt();
  fs.writeFileSync(path.resolve(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf8');
  console.log(`[SEO-Engine]  已生成 robots.txt (对 Google, 百度, Bing, GPTBot, PerplexityBot 全面开放)`);

  console.log(`[SEO-Engine]  SEO & GEO 全套独立系统生成完毕！`);
}

main().catch(err => {
  console.error('[SEO-Engine] 生成失败:', err);
  process.exit(1);
});
