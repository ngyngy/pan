import React from 'react';
import { SUB_SITES } from '../data/subsites';
import { ExternalLink, Link as LinkIcon, Search, ShieldCheck, Tag, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenSubsitesPortal: () => void;
  onOpenFeedback: () => void;
  onSearchKeyword?: (kw: string) => void;
}

interface FriendlyLink {
  name: string;
  url: string;
  desc?: string;
  badge?: string;
}

const FRIENDLY_LINKS: FriendlyLink[] = [
  {
    name: '比特币导航站',
    url: 'http://btc.ngy123.com/',
    desc: '百度搜“比特币导航/资源”排第一',
    badge: '百度第1'
  },
  {
    name: '全球法币排行榜',
    url: 'http://fabi.ngy123.com/',
    desc: '百度搜“法币排行”排第四',
    badge: '百度第4'
  },
  {
    name: '以太坊资源导航',
    url: 'http://eth.ngy123.com/',
    desc: '以太坊生态与开发资源导航'
  },
  {
    name: '高晓松资源下载',
    url: 'http://gxs.ngy123.com/',
    desc: '高晓松全套音视频与文学著作'
  },
  {
    name: '比特币资源下载站',
    url: 'http://btczy.ngy123.com/',
    desc: '比特币文献、白皮书与量化工具'
  },
  {
    name: '币安导航',
    url: 'http://binance.ngy123.com/',
    desc: '全球顶尖加密资产服务'
  },
  {
    name: '欧易OKX导航',
    url: 'http://okx.ngy123.com/',
    desc: 'Web3与数字资产服务'
  },
  {
    name: '天涯神贴分享站',
    url: 'http://tianya.ngy123.com/',
    desc: '天涯论坛经典神帖与历史文学'
  },
  {
    name: '中小学学习资料网',
    url: 'http://xuexi.ngy123.com/',
    desc: '小初高同步名校试卷与网课教程'
  },
  {
    name: '电影资源站',
    url: 'http://dy.ngy123.com/',
    desc: '4K超清院线影视与爆款短剧'
  },
  {
    name: 'AI导航',
    url: 'http://ai.ngy123.com/',
    desc: '前沿人工智能工具与大模型'
  },
  {
    name: 'UC资源导航',
    url: 'http://uc.ngy123.com/',
    desc: 'UC网盘优质资源与分类直达'
  }
];

// 高频 SEO 搜索关键词列表（精准覆盖网盘吧、网盘搜索、网盘资源及各垂直细分）
const SEO_HOT_KEYWORDS = [
  '网盘吧',
  '网盘搜索',
  '网盘资源',
  '夸克网盘资源',
  '百度网盘资源',
  'UC网盘资源',
  '迅雷云盘资源',
  '天涯神贴全集',
  '中小学课件教案',
  '4K院线影视',
  '短剧全集打包',
  '高晓松晓说音频',
  '比特币白皮书下载',
  '雅思新东方名师课',
  'B站付费专栏课',
  '正版电子书免费入库',
  '高考名校模拟卷',
  '无损FLAC音乐合集',
  'Python编程实战',
  'CAD工程图纸库',
  '夸克吧',
  '网盘资源聚合',
  'wangpan8.com'
];

export const Footer: React.FC<FooterProps> = ({
  onOpenSubsitesPortal,
  onOpenFeedback,
  onSearchKeyword
}) => {
  const handleKeywordClick = (kw: string) => {
    if (onSearchKeyword) {
      onSearchKeyword(kw);
      const topSearch = document.getElementById('top-search-section');
      if (topSearch) {
        topSearch.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full mt-6 sm:mt-8 border-t border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm py-6 sm:py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
        
        {/* 1. SEO 热门搜索词与资源标签云 */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/60 space-y-2.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100">
                网盘吧热门搜索热词 · 网盘资源索引
              </span>
            </div>
            <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
              点击关键词可一键直达搜索
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {SEO_HOT_KEYWORDS.map((kw, idx) => (
              <button
                key={`seo-kw-${idx}`}
                onClick={() => handleKeywordClick(kw)}
                type="button"
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/80 dark:hover:bg-blue-950/60 border border-neutral-200/90 dark:border-neutral-700/80 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                #{kw}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Top: Sub-sites quick links row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100">
              官方分站矩阵：
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-600 dark:text-neutral-400">
              {SUB_SITES.map((site) => (
                <a
                  key={site.id}
                  href={site.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline inline-flex items-center gap-0.5 transition-colors"
                >
                  <span>{site.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <button
              onClick={onOpenFeedback}
              className="hover:text-neutral-800 dark:hover:text-neutral-200 underline cursor-pointer"
            >
              侵权申诉 / 失效反馈
            </button>
            <span>•</span>
            <button
              onClick={onOpenSubsitesPortal}
              className="hover:text-neutral-800 dark:hover:text-neutral-200 underline cursor-pointer"
            >
              分站状态总览
            </button>
          </div>
        </div>

        {/* 3. Middle: Friendly Links (友情链接) */}
        <div className="space-y-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-neutral-400 dark:text-neutral-500 shrink-0" />
            <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100">
              友情链接
            </span>
            <span className="text-xs text-neutral-400 dark:text-neutral-500 hidden sm:inline">
              （优质行业导航与权威垂直门户）
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-2.5">
            {FRIENDLY_LINKS.map((link, idx) => (
              <a
                key={`fl-${idx}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${link.name}${link.desc ? ` - ${link.desc}` : ''}`}
                className="group relative flex flex-col p-2 sm:p-2.5 rounded-xl bg-neutral-50/80 dark:bg-neutral-800/40 hover:bg-neutral-100/90 dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 hover:border-blue-400 dark:hover:border-blue-600 transition-all text-left"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                    {link.name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-blue-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex items-center justify-between gap-1 mt-auto">
                  <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 dark:text-neutral-500 truncate">
                    {link.url.replace('http://', '').replace('/', '')}
                  </span>
                  {link.badge && (
                    <span className="shrink-0 text-[9px] sm:text-[10px] px-1 py-0.2 font-medium rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60">
                      {link.badge}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 4. SEO 知识库与权威介绍 (有利于搜索引擎长尾关键词索引) */}
        <section aria-label="关于网盘吧与网盘搜索导航" className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed space-y-1.5">
          <h3 className="font-bold text-xs text-neutral-700 dark:text-neutral-300">
            关于网盘吧 (www.wangpan8.com) - 专业网盘搜索与资源聚合门户
          </h3>
          <p>
            <strong>网盘吧</strong>（<a href="https://www.wangpan8.com" className="text-blue-600 dark:text-blue-400 hover:underline">www.wangpan8.com</a>）致力于为广大网友打造一个极简、纯净、高效的<strong>网盘资源搜索</strong>与导航平台。聚合涵盖<strong>夸克网盘资源</strong>、<strong>百度网盘资源</strong>、<strong>UC网盘</strong>、<strong>迅雷云盘</strong>等优质网盘链接。全站涵盖名师网课、天涯神贴合集、4K高清院线影视短剧、比特币加密金融文献、高晓松作品集、正版图书及实用软件工具，支持免登录秒速检索、一键复制提取码与极速转存。
          </p>
        </section>

        {/* 5. Disclaimer & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 dark:text-neutral-500 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
          <p className="leading-relaxed text-center sm:text-left text-[11px] sm:text-xs">
            免责声明：本站为非营利性网盘资源聚合索引工具 (<span className="text-blue-600 dark:text-blue-400 font-semibold font-mono">www.wangpan8.com</span> 网盘吧)，所有资源均收集自公开互联网及夸克、百度、UC、迅雷等第三方网盘。本站不存储任何音视频或文件实体。若有侵权请联系删除。
          </p>
          <div className="shrink-0 text-center sm:text-right font-medium text-[11px] sm:text-xs">
            © 2026 网盘吧 · <span className="font-mono text-neutral-600 dark:text-neutral-300 font-bold">www.wangpan8.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
