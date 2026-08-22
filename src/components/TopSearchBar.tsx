import React, { useState } from 'react';
import { Search, X, CheckCircle2, HardDrive } from 'lucide-react';
import { DriveType } from '../types';

interface TopSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDrive: DriveType;
  onSelectDrive: (drive: DriveType) => void;
  totalCount: number;
  filteredCount: number;
}

const DRIVE_OPTIONS: { id: DriveType; label: string; iconColor: string }[] = [
  { id: 'all', label: '全部网盘', iconColor: 'text-blue-500' },
  { id: 'quark', label: '夸克网盘', iconColor: 'text-amber-500' },
  { id: 'baidu', label: '百度网盘', iconColor: 'text-blue-600' },
  { id: 'aliyun', label: '阿里云盘', iconColor: 'text-orange-500' },
  { id: 'xunlei', label: '迅雷云盘', iconColor: 'text-sky-500' },
  { id: 'uc', label: 'UC网盘', iconColor: 'text-rose-500' },
];

export const TopSearchBar: React.FC<TopSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedDrive,
  onSelectDrive,
  totalCount,
  filteredCount
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onSearchChange('');
  };

  const isSearching = searchQuery.trim().length > 0 || selectedDrive !== 'all';

  return (
    <section 
      id="top-search-section" 
      className="w-full bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 shadow-sm p-4 sm:p-5 space-y-4 transition-all"
    >
      {/* 1. Main Search Bar Input */}
      <div className="relative max-w-4xl mx-auto">
        <div 
          className={`flex items-center w-full rounded-2xl bg-neutral-50 dark:bg-neutral-800/90 border-2 transition-all shadow-sm ${
            isFocused 
              ? 'border-blue-500 dark:border-blue-400 ring-4 ring-blue-500/15 dark:ring-blue-400/20 bg-white dark:bg-neutral-800' 
              : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
          }`}
        >
          {/* Left Search Icon */}
          <div className="pl-4 sm:pl-5 pr-2 flex items-center justify-center text-neutral-400 dark:text-neutral-500 pointer-events-none">
            <Search className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${isFocused ? 'text-blue-500 dark:text-blue-400' : ''}`} />
          </div>

          {/* Search Input Field */}
          <input
            id="main-top-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="输入关键词搜索资源：美剧、电视剧、4K电影、动漫、课程、软件、小说、游戏..."
            className="flex-1 py-3.5 sm:py-4 px-2 text-sm sm:text-base md:text-lg bg-transparent text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 font-medium outline-none"
          />

          {/* Right Clear Button */}
          {searchQuery && (
            <button
              id="clear-search-btn"
              type="button"
              onClick={handleClear}
              className="p-1.5 sm:p-2 mr-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              title="清空搜索内容"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          {/* Big Search Action Button */}
          <div className="pr-1.5 sm:pr-2">
            <button
              id="submit-search-btn"
              type="button"
              onClick={() => {
                const dirEl = document.getElementById('main-folder-directory');
                if (dirEl) dirEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>搜索</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Cloud Drive Switcher & Live Status */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
        {/* Drive Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 flex items-center gap-1 mr-1">
            <HardDrive className="w-3.5 h-3.5" />
            网盘筛选:
          </span>
          {DRIVE_OPTIONS.map((drive) => {
            const isActive = selectedDrive === drive.id;
            return (
              <button
                key={drive.id}
                id={`drive-filter-btn-${drive.id}`}
                type="button"
                onClick={() => onSelectDrive(drive.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                <span>{drive.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter Stats Badge */}
        <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
          {isSearching ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
              匹配到 <strong className="text-blue-700 dark:text-blue-300">{filteredCount}</strong> 条资源
            </span>
          ) : (
            <span className="text-neutral-400 dark:text-neutral-500">
              已收录 <strong className="font-semibold text-neutral-700 dark:text-neutral-300 font-mono">{totalCount}</strong>+ 条网盘优质资源
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
