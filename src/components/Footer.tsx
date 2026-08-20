import React from 'react';
import { SUB_SITES } from '../data/subsites';
import { ExternalLink, ShieldCheck, Heart, Link as LinkIcon, Award, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenSubsitesPortal: () => void;
  onOpenFeedback: () => void;
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

export const Footer: React.FC<FooterProps> = ({
  onOpenSubsitesPortal,
  onOpenFeedback
}) => {
  return (
    <footer className="w-full mt-16 border-t border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top: Sub-sites quick links row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              官方分站矩阵：
            </span>
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
              {SUB_SITES.map((site) => (
                <a
                  key={site.id}
                  href={site.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-neutral-950 dark:hover:text-white hover:underline inline-flex items-center gap-0.5"
                >
                  <span>{site.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <button
              onClick={onOpenFeedback}
              className="hover:text-neutral-800 dark:hover:text-neutral-200 underline"
            >
              侵权申诉 / 失效反馈
            </button>
            <span>•</span>
            <button
              onClick={onOpenSubsitesPortal}
              className="hover:text-neutral-800 dark:hover:text-neutral-200 underline"
            >
              分站状态总览
            </button>
          </div>
        </div>

        {/* Middle: Friendly Links (友情链接) */}
        <div className="space-y-3 pb-6 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              友情链接
            </span>
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              （优质行业导航与权威垂直门户）
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {FRIENDLY_LINKS.map((link, idx) => (
              <a
                key={`fl-${idx}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${link.name}${link.desc ? ` - ${link.desc}` : ''}`}
                className="group relative flex flex-col p-2.5 rounded-xl bg-neutral-50/80 dark:bg-neutral-800/40 hover:bg-neutral-100/90 dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all text-left"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white truncate">
                    {link.name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex items-center justify-between gap-1 mt-auto">
                  <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 truncate">
                    {link.url.replace('http://', '').replace('/', '')}
                  </span>
                  {link.badge && (
                    <span className="shrink-0 text-[10px] px-1.5 py-0.2 font-medium rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60">
                      {link.badge}
                    </span>
                  )}
                </div>

                {link.desc && (
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5 leading-tight">
                    {link.desc}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 dark:text-neutral-500">
          <p className="leading-relaxed text-center sm:text-left">
            免责声明：本站为非营利性网盘资源聚合索引工具 (pan.ngy123.com)，所有资源均收集自公开互联网及夸克、百度、UC、迅雷等第三方网盘。本站不存储任何音视频或文件实体。若有侵权请联系删除。
          </p>
          <div className="shrink-0 text-center sm:text-right">
            © 2026 网盘资源聚合 (pan.ngy123.com)
          </div>
        </div>
      </div>
    </footer>
  );
};

