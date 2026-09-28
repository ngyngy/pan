/**
 * 权威主域名与 Canonical 规范化处理模块
 * 
 * 作用：针对站点绑定三个域名的场景，向所有搜索引擎（Google, 百度, Bing, 360, 搜狗等）
 * 明确指定 https://www.wangpan8.com 为唯一权威主域名。
 * 格式要求：<link rel="canonical" href="https://www.wangpan8.com/current page path" />
 */

export const PRIMARY_DOMAIN = 'https://www.wangpan8.com';

/**
 * 计算当前页面的权威规范 URL
 * @param customPath 可选自定义路径（如 /resource/abc.html 或 /?r=123），未传则取当前浏览器路径及参数
 */
export function getCanonicalUrl(customPath?: string): string {
  if (typeof window === 'undefined') {
    return customPath ? `${PRIMARY_DOMAIN}${customPath.startsWith('/') ? customPath : '/' + customPath}` : `${PRIMARY_DOMAIN}/`;
  }

  let path = customPath;
  if (!path) {
    path = window.location.pathname + window.location.search;
  }

  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  return `${PRIMARY_DOMAIN}${path}`;
}

/**
 * 动态同步更新 DOM 中的 <link rel="canonical"> 及相关权威元标签
 */
export function syncCanonicalTag(customPath?: string): string {
  if (typeof window === 'undefined') return PRIMARY_DOMAIN;

  const canonicalUrl = getCanonicalUrl(customPath);

  try {
    // 1. 同步 <link rel="canonical">
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    // 2. 同步 Open Graph URL
    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalUrl);

    // 3. 同步 Twitter Card URL
    let twitterUrl = document.querySelector<HTMLMetaElement>('meta[name="twitter:url"]');
    if (!twitterUrl) {
      twitterUrl = document.createElement('meta');
      twitterUrl.setAttribute('name', 'twitter:url');
      document.head.appendChild(twitterUrl);
    }
    twitterUrl.setAttribute('content', canonicalUrl);

    // 4. 同步国内移动适配 meta mobile-agent
    let mobileAgent = document.querySelector<HTMLMetaElement>('meta[name="mobile-agent"]');
    if (mobileAgent) {
      mobileAgent.setAttribute('content', `format=html5;url=${canonicalUrl}`);
    }
  } catch (err) {
    console.warn('[SEO] Failed to update canonical tag:', err);
  }

  return canonicalUrl;
}
