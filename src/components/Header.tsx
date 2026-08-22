import React from 'react';
import { 
  Flame, 
  ExternalLink, 
  Users, 
  Moon, 
  Sun,
  Layers
} from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenHotRank: () => void;
  onOpenSubsitesPortal: () => void;
  onOpenQQGroup: () => void;
  onResetToHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenHotRank,
  onOpenSubsitesPortal,
  onOpenQQGroup,
  onResetToHome
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-h-[4rem] sm:min-h-[4.5rem] py-2 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo & Domain Info */}
        <div 
          onClick={onResetToHome}
          className="flex items-center gap-2.5 sm:gap-4 cursor-pointer select-none group min-w-0"
          id="brand-logo-button"
        >
          <Logo size="md" />
          
          <div className="flex flex-col justify-center min-w-0">
            {/* Top row: Brand name + Domain */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-black text-lg sm:text-2xl tracking-tight text-neutral-900 dark:text-neutral-50 font-sans shrink-0">
                网盘吧
              </span>
              <span className="font-mono text-xs sm:text-base font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 px-2 sm:px-2.5 py-0.5 rounded-lg border border-blue-200/80 dark:border-blue-800/80 group-hover:bg-blue-100/80 dark:group-hover:bg-blue-900/50 transition-colors">
                www.wangpan8.com
              </span>
            </div>

            {/* Bottom row: Slogan under the domain & brand */}
            <span className="text-[11px] sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium tracking-tight mt-0.5 truncate max-w-[200px] xs:max-w-[260px] sm:max-w-none">
              1000T网盘资源聚合，尽在网盘吧！
            </span>
          </div>
        </div>

        {/* Right: Quick actions */}
        <nav className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* 热门榜 */}
          <button
            id="nav-hot-rank-btn"
            onClick={onOpenHotRank}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[38px] sm:min-h-[40px] text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            title="查看热门资源排行榜"
          >
            <Flame className="w-4 h-4 text-orange-500 shrink-0" />
            <span className="hidden xs:inline">热门榜</span>
          </button>

          {/* 分站矩阵 */}
          <button
            id="nav-subsites-btn"
            onClick={onOpenSubsitesPortal}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[38px] sm:min-h-[40px] text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            title="查看所有分类分站与导航"
          >
            <Layers className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="hidden sm:inline">分站</span>
          </button>

          {/* QQ群交流 */}
          <button
            id="nav-qq-group-btn"
            onClick={onOpenQQGroup}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 min-h-[38px] sm:min-h-[40px] text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            title="加入官方QQ群交流"
          >
            <Users className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="hidden md:inline">QQ群</span>
          </button>

          {/* 友情链接 / 官网直达 */}
          <a
            id="nav-official-link"
            href="https://www.wangpan8.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-colors"
          >
            <span>wangpan8.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* 浅色/深色模式切换 */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleDarkMode}
            className="p-2 min-h-[38px] min-w-[38px] flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            title={darkMode ? "切换至浅色模式" : "切换至深色模式"}
            aria-label="切换主题"
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
