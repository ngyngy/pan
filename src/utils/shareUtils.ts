import { ResourceItem } from '../types';

/**
 * 官方标准主域名（在推特发帖时默认使用此权威域名，不受本地开发环境 localhost 限制）
 */
export const OFFICIAL_DOMAIN = 'https://www.wangpan8.com';

/**
 * 获取当前应用所运行的基础 Origin（若在浏览器环境可优先取 window.location.origin）
 */
export function getAppOrigin(preferCanonical: boolean = false): string {
  if (preferCanonical) return OFFICIAL_DOMAIN;
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    // 若不是本地 localhost，则优先使用当前访问地址，方便测试
    const origin = window.location.origin;
    if (!origin.includes('localhost') && !origin.includes('127.0.0.1')) {
      return origin;
    }
  }
  return OFFICIAL_DOMAIN;
}

/**
 * 获取每个资源专属的本站独立落地页链接（推特防封专用静态 HTML）
 * 该页面是完全独立的静态 HTML 快照，推特/X 爬虫抓取可秒出 OpenGraph 大图卡片，用户在推特内点击 100% 顺畅打开
 */
export function getResourceHtmlLandingUrl(resourceId: string, preferCanonical: boolean = false): string {
  const origin = getAppOrigin(preferCanonical);
  return `${origin}/resource/${resourceId}.html`;
}

/**
 * 获取每个资源专属的主站应用直达链接（进入 SPA 应用并自动弹窗高亮该资源）
 */
export function getResourceSpaDirectUrl(resourceId: string, preferCanonical: boolean = false): string {
  const origin = getAppOrigin(preferCanonical);
  return `${origin}/?r=${encodeURIComponent(resourceId)}`;
}

/**
 * 提取精简资源标题（去除外部中括号）
 */
export function getCleanTitle(title: string): string {
  return title.replace(/【.*?】|\[.*?\]/g, '').trim() || title;
}

/**
 * 生成推特 / X 专用防封推文文本
 * 彻底替换掉直接的 pan.quark.cn 敏感链接，改用本站独立落地页，并提供夸克口令/提取码与话题标签
 */
export function generateTwitterPostText(resource: ResourceItem, preferCanonical: boolean = true): string {
  const landingUrl = getResourceHtmlLandingUrl(resource.id, preferCanonical);
  const cleanTitle = getCleanTitle(resource.title);
  
  // 提取分类标签与推特话题
  const tagList = Array.isArray(resource.tags) ? resource.tags.slice(0, 3) : [];
  const hashtags = ['#网盘资源', `#${resource.driveName || '夸克网盘'}`];
  if (resource.categoryName) {
    hashtags.push(`#${resource.categoryName}`);
  }
  tagList.forEach(t => {
    const cleanTag = t.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');
    if (cleanTag && !hashtags.includes(`#${cleanTag}`)) {
      hashtags.push(`#${cleanTag}`);
    }
  });

  const lines: string[] = [
    `🎬 发现高分稀缺资源：《${cleanTitle}》`,
    `📦 存储平台：${resource.driveName}（${resource.driveType.toUpperCase()}）`,
  ];

  if (resource.quality) {
    lines.push(`✨ 规格品质：${resource.quality}`);
  }
  if (resource.size) {
    lines.push(`💾 文件大小：${resource.size}`);
  }
  if (resource.extractCode) {
    lines.push(`🔑 提取口令：${resource.extractCode}`);
  }

  lines.push('');
  lines.push('👇 推特专属免拦截·本站直达专页（点击即刻转存）：');
  lines.push(landingUrl);
  lines.push('');
  lines.push(hashtags.slice(0, 5).join(' '));

  return lines.join('\n');
}

/**
 * 生成 Twitter / X 的 Web Intent 发推快捷跳转 URL
 * 点击后直接在浏览器中打开推特发帖框，并自动填充好文案和独立防封链接！
 */
export function getTwitterIntentUrl(resource: ResourceItem, preferCanonical: boolean = true): string {
  const tweetText = generateTwitterPostText(resource, preferCanonical);
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
}
