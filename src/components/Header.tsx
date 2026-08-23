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
  ChevronDown
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
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 min-h-[4.25rem] py-2 flex flex-col md:flex-row items-center justify-between gap-2.5 md:gap-3">
        
        {/* Top / Left Row on Mobile: Logo & Navigation actions */}
        <div className="w-full md:w-auto flex items-center justify-between gap-3 shrink-0">
          {/* Brand Logo & Slogan */}
          <div 
            onClick={onResetToHome}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group shrink-0"
            id="brand-logo-button"
          >
            <Logo size="sm" />
            
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-black text-lg sm:text-xl tracking-tight text-neutral-900 dark:text-neutral-50 font-sans">
                  网盘吧
                </span>
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 px-2 py-0.2 rounded-md border border-blue-200/80 dark:border-blue-800/80 group-hover:bg-blue-100/80 transition-colors">
                  www.wangpan8.com
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 font-medium tracking-tight mt-0.5 hidden sm:inline">
                1000T网盘资源聚合，尽在网盘吧！
              </span>
            </div>
          </div>

          {/* Mobile-only quick actions */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={onOpenHotRank}
              className="p-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
              title="热门榜"
            >
              <Flame className="w-4 h-4 text-orange-500" />
            </button>
            <button
              onClick={onOpenSubsitesPortal}
              className="p-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
              title="分站矩阵"
            >
              <Layers className="w-4 h-4 text-blue-500" />
            </button>
            <button
              onClick={onOpenQQGroup}
              className="p-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
              title="QQ群"
            >
              <Users className="w-4 h-4 text-emerald-500" />
            </button>
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
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
              className={`flex items-center w-full rounded-xl bg-neutral-50 dark:bg-neutral-800 border-2 transition-all shadow-2xs ${
                isFocused 
                  ? 'border-blue-500 dark:border-blue-400 ring-3 ring-blue-500/15 dark:ring-blue-400/20 bg-white dark:bg-neutral-850' 
                  : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
              }`}
            >
              {/* Drive Selector Dropdown inside Search Bar */}
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  type="button"
                  id="header-drive-selector-btn"
                  onClick={() => setShowDriveDropdown(!showDriveDropdown)}
                  className="flex items-center gap-1 pl-2.5 sm:pl-3 pr-2 py-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer border-r border-neutral-200 dark:border-neutral-700 mr-1"
                  title="切换筛选网盘"
                >
                  <HardDrive className={`w-3.5 h-3.5 ${currentDriveObj.color}`} />
                  <span className="hidden xs:inline">{currentDriveObj.label}</span>
                  <span className="xs:hidden">{currentDriveObj.shortLabel}</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {/* Dropdown Menu */}
                {showDriveDropdown && (
                  <div className="absolute top-full left-0 mt-1.5 w-36 py-1 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-2.5 py-1 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
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
                        className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors ${
                          selectedDrive === drive.id
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${selectedDrive === drive.id ? 'bg-blue-500' : 'bg-neutral-300 dark:bg-neutral-600'}`} />
                          {drive.label}
                        </span>
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
                placeholder="搜索资源：美剧、电视剧、4K电影、课程、软件、小说、游戏..."
                className="flex-1 py-1.5 sm:py-2 px-2 text-xs sm:text-sm bg-transparent text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 font-medium outline-none min-w-0"
              />

              {/* Clear Input Button */}
              {searchQuery && (
                <button
                  type="button"
                  id="header-clear-search-btn"
                  onClick={handleClear}
                  className="p-1 mr-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-full hover:bg-neutral-200/60 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
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
                  className="flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer shrink-0"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">搜索</span>
                </button>
              </div>
            </div>
          </form>

          {/* Quick Drive Pills & Result count indicator (Desktop/Tablet) */}
          <div className="hidden lg:flex items-center justify-between gap-2 mt-1 px-1 text-[11px]">
            <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
              <span className="text-neutral-400">快捷:</span>
              {DRIVE_OPTIONS.map((d) => (
                <button
                  key={`pill-${d.id}`}
                  type="button"
                  onClick={() => onSelectDrive(d.id)}
                  className={`px-1.5 py-0.2 rounded hover:underline transition-colors cursor-pointer ${
                    selectedDrive === d.id
                      ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/60'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                  }`}
                >
                  {d.shortLabel}
                </button>
              ))}
            </div>

            <div className="text-neutral-400 dark:text-neutral-500 font-mono">
              {isSearching ? (
                <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  匹配到 {filteredCount} 条资源
                </span>
              ) : (
                <span>已收录 {totalCount}+ 条优质网盘资源</span>
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
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs lg:text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            title="查看热门资源排行榜"
          >
            <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>热门榜</span>
          </button>

          {/* 分站矩阵 */}
          <button
            id="nav-subsites-btn"
            onClick={onOpenSubsitesPortal}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs lg:text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            title="查看所有分类分站与导航"
          >
            <Layers className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>分站</span>
          </button>

          {/* QQ群交流 */}
          <button
            id="nav-qq-group-btn"
            onClick={onOpenQQGroup}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs lg:text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            title="加入官方QQ群交流"
          >
            <Users className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>QQ群</span>
          </button>

          {/* 浅色/深色模式切换 */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleDarkMode}
            className="p-1.5 lg:p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
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
