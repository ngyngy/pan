import React from 'react';
import { 
  Tv, 
  Flame, 
  HelpCircle, 
  ShieldAlert, 
  Moon, 
  Sun, 
  Globe, 
  Layers
} from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenTVBox: () => void;
  onOpenHotRank: () => void;
  onOpenSubsitesPortal: () => void;
  onOpenRequestResource: () => void;
  onOpenFeedback: () => void;
  onResetToHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenTVBox,
  onOpenHotRank,
  onOpenSubsitesPortal,
  onOpenRequestResource,
  onOpenFeedback,
  onResetToHome
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Title */}
        <div 
          onClick={onResetToHome}
          className="flex items-center gap-3 cursor-pointer select-none group"
          id="brand-logo-button"
        >
          <div className="w-9 h-9 rounded-xl bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 font-bold text-xs tracking-wider shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-orange-500 font-extrabold mr-0.5">N</span>GY
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
            <h1 className="font-bold text-lg sm:text-xl tracking-tight text-neutral-900 dark:text-neutral-100 font-sans">
              网盘资源聚合
            </h1>
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 font-medium tracking-tight">
              pan.ngy123.com
            </span>
          </div>
        </div>

        {/* Right: Quick actions matching screenshot navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {/* TVBox */}
          <button
            id="nav-tvbox-btn"
            onClick={onOpenTVBox}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            title="TVBox接口配置与教程"
          >
            <Tv className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            <span className="hidden xs:inline">TVBox</span>
          </button>

          {/* 热门榜 */}
          <button
            id="nav-hot-rank-btn"
            onClick={onOpenHotRank}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            title="查看热门资源排行榜"
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span>热门榜</span>
          </button>

          {/* 6大分站直达 */}
          <button
            id="nav-subsites-btn"
            onClick={onOpenSubsitesPortal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            title="直达分站 (天涯/学习/影视/高晓松/比特币/UC)"
          >
            <Globe className="w-4 h-4 text-sky-500" />
            <span className="hidden md:inline">分站直达</span>
          </button>

          {/* 求资源 */}
          <button
            id="nav-request-resource-btn"
            onClick={onOpenRequestResource}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            title="未找到想要的资源？点此提交求资源"
          >
            <HelpCircle className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            <span>求资源</span>
          </button>

          {/* 投诉 / 失效反馈 */}
          <button
            id="nav-feedback-btn"
            onClick={onOpenFeedback}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            title="链接失效或侵权投诉反馈"
          >
            <ShieldAlert className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            <span className="hidden sm:inline">投诉/反馈</span>
            <span className="sm:hidden">反馈</span>
          </button>

          <div className="h-4 w-[1px] bg-neutral-200 dark:bg-neutral-800 mx-0.5 sm:mx-1"></div>

          {/* 南宫远社交账号直达: 推特 & 微博 */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* 推特 (X) */}
            <a
              id="nav-twitter-link"
              href="https://x.com/nangongyuan/"
              target="_blank"
              rel="noopener noreferrer"
              title="南宫远 Twitter / X 官方账号 (@nangongyuan)"
              aria-label="南宫远 Twitter"
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white bg-neutral-100/80 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all border border-neutral-200/80 dark:border-neutral-700/80 group"
            >
              {/* X / Twitter Logo */}
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="hidden md:inline font-medium">南宫远推特</span>
              <span className="md:hidden font-medium">X</span>
            </a>

            {/* 微博 (Weibo) */}
            <a
              id="nav-weibo-link"
              href="https://weibo.com/u/7594643421"
              target="_blank"
              rel="noopener noreferrer"
              title="南宫远 官方新浪微博"
              aria-label="南宫远 微博"
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-50/80 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 rounded-lg transition-all border border-red-200/60 dark:border-red-800/60 group"
            >
              {/* Weibo Eye / Logo */}
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10.09 19.34c-4.4 0-7.96-2.5-7.96-5.59 0-1.74 1.15-3.3 2.97-4.32.48-.27.84-.04.7.46-.16.58-.2 1.07-.12 1.48.16.8 1.07 1.34 2.2 1.34 1.35 0 2.45-.77 2.45-1.72 0-.64-.5-1.2-1.27-1.48-.68-.25-.92-.68-.6-1.22.42-.7 1.25-1.07 2.15-1.07 3.96 0 7.18 2.5 7.18 5.59 0 3.65-3.44 6.53-7.71 6.53zm8.93-9.52c-.36-.08-.53-.33-.44-.68.17-.66.1-1.37-.2-1.95-.45-.88-1.33-1.41-2.34-1.41-.38 0-.57-.22-.49-.57.08-.34.34-.51.72-.51 1.45 0 2.7 1.77 3.32 2.01.42.82.52 1.83.27 2.77-.09.34-.48.42-.84.34zm2.84-.71c-.32-.1-.45-.33-.36-.63.4-1.31.25-2.73-.39-3.9-1-1.84-2.82-3-4.9-3-.4 0-.6-.2-.5-.56.09-.34.35-.5.74-.5 2.54 0 4.74 1.42 5.95 3.65.78 1.41.97 3.12.5 4.67-.1.33-.72.37-1.04.27z" />
              </svg>
              <span className="hidden md:inline font-medium">南宫远微博</span>
              <span className="md:hidden font-medium">微博</span>
            </a>
          </div>

          <div className="h-4 w-[1px] bg-neutral-200 dark:bg-neutral-800 mx-0.5 sm:mx-1"></div>

          {/* Dark mode switcher */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleDarkMode}
            aria-label="切换明暗主题"
            className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-600" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
