import React, { useState, useRef, useEffect } from 'react';
import { 
  Flame, 
  ExternalLink, 
  Users, 
  Moon, 
  Sun,
  Layers,
  Search,
  X,
  HardDrive,
  CheckCircle2,
  ChevronDown,
  Twitter
} from 'lucide-react';
import { Logo } from './Logo';
import { DriveType } from '../types';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenHotRank: () => void;
  onOpenSubsitesPortal: () => void;
  onOpenQQGroup: () => void;
  onResetToHome: () => void;
  // Search props
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDrive: DriveType;
  onSelectDrive: (drive: DriveType) => void;
  totalCount: number;
  filteredCount: number;
}

const DRIVE_OPTIONS: { id: DriveType; label: string; shortLabel: string; color: string }[] = [
  { id: 'all', label: '全部网盘', shortLabel: '全部', color: 'text-blue-500' },
  { id: 'quark', label: '夸克网盘', shortLabel: '夸克', color: 'text-amber-500' },
  { id: 'baidu', label: '百度网盘', shortLabel: '百度', color: 'text-blue-600' },
  { id: 'aliyun', label: '阿里云盘', shortLabel: '阿里', color: 'text-orange-500' },
  { id: 'xunlei', label: '迅雷云盘', shortLabel: '迅雷', color: 'text-sky-500' },
  { id: 'uc', label: 'UC网盘', shortLabel: 'UC', color: 'text-rose-500' },
  { id: 'yidong', label: '移动云盘', shortLabel: '移动', color: 'text-teal-500' },
];

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenHotRank,
  onOpenSubsitesPortal,
  onOpenQQGroup,
  onResetToHome,
  searchQuery,
  onSearchChange,
  selectedDrive,
  onSelectDrive,
  totalCount,
  filteredCount
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDriveDropdown, setShowDriveDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close drive dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDriveDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    onSearchChange('');
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const dirEl = document.getElementById('main-folder-directory');
    if (dirEl) {
      dirEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentDriveObj = DRIVE_OPTIONS.find(d => d.id === selectedDrive) || DRIVE_OPTIONS[0];
  const isSearching = searchQuery.trim().length > 0 || selectedDrive !== 'all';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 min-h-[4.25rem] py-2 flex flex-col md:flex-row items-center justify-between gap-2.5 md:gap-4">
        
        {/* Top / Left Row on Mobile: Logo & Navigation actions */}
        <div className="w-full md:w-auto flex items-center justify-between gap-3 shrink-0">
          {/* Brand Logo & Slogan */}
          <div 
            onClick={onResetToHome}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0"
            id="brand-logo-button"
          >
            <div className="relative">
              <Logo size="sm" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white font-sans group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  网盘吧
                </span>
                <span className="font-mono text-[11px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 px-2 py-0.5 rounded-full border border-blue-500/20 dark:border-blue-400/20 group-hover:bg-blue-500/15 transition-colors">
                  wangpan8.com
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-0.5 hidden sm:inline">
                1000T+ 网盘资源聚合，尽在网盘吧！
              </span>
            </div>
          </div>

          {/* Mobile-only quick actions */}
          <div className="flex md:hidden items-center gap-0.5 sm:gap-1">
            <button
              onClick={onOpenHotRank}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl active:scale-95 transition-all"
              title="热门榜"
            >
              <Flame className="w-4 h-4 text-orange-500" />
            </button>
            <button
              onClick={onOpenSubsitesPortal}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl active:scale-95 transition-all"
              title="分站矩阵"
            >
              <Layers className="w-4 h-4 text-blue-500" />
            </button>
            <button
              onClick={onOpenQQGroup}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl active:scale-95 transition-all"
              title="QQ群"
            >
              <Users className="w-4 h-4 text-emerald-500" />
            </button>
            <a
              id="mobile-nav-weibo-link"
              href="https://weibo.com/u/6184008812"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl active:scale-95 transition-all text-xs font-bold flex items-center justify-center"
              title="关注微博"
            >
              微博
            </a>
            <a
              id="mobile-nav-x-link"
              href="https://x.com/nangongyuan/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-sky-950/40 rounded-xl active:scale-95 transition-all flex items-center justify-center"
              title="关注 X (Twitter)"
            >
              <Twitter className="w-4 h-4 text-sky-500" />
            </a>
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl active:scale-95 transition-all"
              title="切换主题"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Center: 第一行核心全局搜索框 (Migrated into the header line) */}
        <div className="w-full md:flex-1 md:max-w-2xl lg:max-w-3xl">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div 
              className={`flex items-center w-full rounded-2xl bg-slate-50/90 dark:bg-slate-900/90 border transition-all duration-200 shadow-xs ${
                isFocused 
                  ? 'border-blue-500 dark:border-blue-500 ring-3 ring-blue-500/15 dark:ring-blue-500/25 bg-white dark:bg-slate-900 shadow-md shadow-blue-500/5' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Drive Selector Dropdown inside Search Bar */}
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  type="button"
                  id="header-drive-selector-btn"
                  onClick={() => setShowDriveDropdown(!showDriveDropdown)}
                  className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer border-r border-slate-200 dark:border-slate-800 mr-1"
                  title="切换筛选网盘"
                >
                  <HardDrive className={`w-3.5 h-3.5 ${currentDriveObj.color}`} />
                  <span className="hidden xs:inline">{currentDriveObj.label}</span>
                  <span className="xs:hidden">{currentDriveObj.shortLabel}</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-150 ${showDriveDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showDriveDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-40 p-1.5 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      筛选指定网盘
                    </div>
                    {DRIVE_OPTIONS.map((drive) => (
                      <button
                        key={drive.id}
                        type="button"
                        onClick={() => {
                          onSelectDrive(drive.id);
                          setShowDriveDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                          selectedDrive === drive.id
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${selectedDrive === drive.id ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                          {drive.label}
                        </span>
                        {selectedDrive === drive.id && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Input Field */}
              <input
                id="header-top-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="搜索资源：4K电影、热播短剧、天涯神贴、名师课程、电子书、游戏..."
                className="flex-1 py-2 px-2 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium outline-none min-w-0"
              />

              {/* Clear Input Button */}
              {searchQuery && (
                <button
                  type="button"
                  id="header-clear-search-btn"
                  onClick={handleClear}
                  className="p-1 mr-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="清空搜索"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Search Submit Button */}
              <div className="pr-1">
                <button
                  type="submit"
                  id="header-submit-search-btn"
                  className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer shrink-0"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">搜索</span>
                </button>
              </div>
            </div>
          </form>

          {/* Quick Drive Pills & Result count indicator (Desktop/Tablet) */}
          <div className="hidden lg:flex items-center justify-between gap-2 mt-1.5 px-1 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <span className="text-slate-400">快捷:</span>
              {DRIVE_OPTIONS.map((d) => (
                <button
                  key={`pill-${d.id}`}
                  type="button"
                  onClick={() => onSelectDrive(d.id)}
                  className={`px-2 py-0.5 rounded-md font-medium transition-all cursor-pointer ${
                    selectedDrive === d.id
                      ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/60 ring-1 ring-blue-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {d.shortLabel}
                </button>
              ))}
            </div>

            <div className="text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1">
              {isSearching ? (
                <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  匹配到 {filteredCount} 条精选资源
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                  已聚合收录 <strong className="text-slate-700 dark:text-slate-300">{totalCount}+</strong> 条优质网盘资源
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Quick actions (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 shrink-0">
          {/* 热门榜 */}
          <button
            id="nav-hot-rank-btn"
            onClick={onOpenHotRank}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs lg:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 rounded-xl transition-all cursor-pointer"
            title="查看热门资源排行榜"
          >
            <Flame className="w-4 h-4 text-orange-500 shrink-0" />
            <span>热门榜</span>
          </button>

          {/* 分站矩阵 */}
          <button
            id="nav-subsites-btn"
            onClick={onOpenSubsitesPortal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs lg:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition-all cursor-pointer"
            title="查看所有分类分站与导航"
          >
            <Layers className="w-4 h-4 text-blue-500 shrink-0" />
            <span>分站</span>
          </button>

          {/* QQ群交流 */}
          <button
            id="nav-qq-group-btn"
            onClick={onOpenQQGroup}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs lg:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl transition-all cursor-pointer"
            title="加入官方QQ群交流"
          >
            <Users className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>QQ群</span>
          </button>

          {/* 微博 */}
          <a
            id="nav-weibo-link"
            href="https://weibo.com/u/6184008812"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs lg:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-all cursor-pointer group"
            title="关注南宫远微博 (https://weibo.com/u/6184008812)"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 group-hover:scale-125 transition-transform shrink-0" />
            <span>微博</span>
          </a>

          {/* X (Twitter) */}
          <a
            id="nav-x-link"
            href="https://x.com/nangongyuan/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs lg:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 rounded-xl transition-all cursor-pointer group"
            title="关注南宫远 X / Twitter (https://x.com/nangongyuan/)"
          >
            <Twitter className="w-4 h-4 text-sky-500 shrink-0 group-hover:scale-110 transition-transform" />
            <span>X</span>
          </a>

          {/* 浅色/深色模式切换 */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer active:scale-95 ml-1"
            title={darkMode ? "切换至浅色模式" : "切换至深色模式"}
            aria-label="切换主题"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

