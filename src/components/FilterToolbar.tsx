import React, { useRef, useEffect } from 'react';
import { 
  Search, 
  RotateCw, 
  SlidersHorizontal, 
  X, 
  Check, 
  ArrowUpDown,
  FileCheck
} from 'lucide-react';
import { DriveType, FilterState } from '../types';
import { HOT_SEARCH_KEYWORDS } from '../data/resources';

interface FilterToolbarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
  totalAllCount: number;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
  totalAllCount
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [searchExpanded, setSearchExpanded] = React.useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setShowAdvanced(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const driveOptions: { key: DriveType; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'quark', label: '夸克' },
    { key: 'baidu', label: '百度' },
    { key: 'uc', label: 'UC' },
    { key: 'xunlei', label: '迅雷' },
    { key: 'magnet', label: '磁力' },
  ];

  return (
    <div className="w-full space-y-3 mb-4">
      {/* Top row: Drive Pills and Action buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-neutral-900 p-2 sm:p-3 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        {/* Left: Drive Tabs */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {driveOptions.map((opt) => {
            const isSelected = filters.selectedDrive === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => onFilterChange({ selectedDrive: opt.key })}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Right: Refresh, Filter, Search Trigger */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-auto">
          {/* Refresh / Reset */}
          <button
            onClick={onResetFilters}
            title="重置全部筛选与搜索"
            className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Advanced Filter button */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
              showAdvanced || filters.qualityFilter || filters.hasExtractCode !== 'all' || filters.sortBy !== 'latest'
                ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white shadow-sm'
                : 'bg-neutral-50 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>精选筛选</span>
          </button>

          {/* Quick Search Button / Toggle */}
          <button
            onClick={() => {
              setSearchExpanded(true);
              searchInputRef.current?.focus();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
              filters.searchQuery
                ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300 border-orange-200 dark:border-orange-900/50'
                : 'bg-neutral-50 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>搜索</span>
          </button>
        </div>
      </div>

      {/* Instant Search Box with keyboard shortcut & clear button */}
      {searchExpanded && (
        <div className="relative flex flex-col sm:flex-row items-center gap-2 bg-white dark:bg-neutral-900 p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-all focus-within:ring-2 focus-within:ring-neutral-900/10 dark:focus-within:ring-white/10 focus-within:border-neutral-400 dark:focus-within:border-neutral-600">
          <div className="relative flex-1 w-full flex items-center">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="输入资源关键词、电影、剧集、学科、天涯神贴、高晓松、比特币等 (按 / 聚焦)..."
              className="w-full bg-transparent pl-9 pr-16 py-1.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="absolute right-9 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1"
                title="清空搜索"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <kbd className="hidden sm:inline-block absolute right-3 px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
              /
            </kbd>
          </div>
        </div>
      )}

      {/* Hot search tags */}
      <div className="flex items-center gap-2 px-1 overflow-x-auto no-scrollbar py-1">
        <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500 shrink-0">
          热门推荐:
        </span>
        <div className="flex items-center gap-1.5">
          {HOT_SEARCH_KEYWORDS.map((kw) => (
            <button
              key={kw}
              onClick={() => onFilterChange({ searchQuery: kw })}
              className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors whitespace-nowrap"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filter Panel dropdown */}
      {showAdvanced && (
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900/90 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-inner grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Quality filter */}
          <div>
            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              画质 / 格式筛选
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['全部', '4K', '1080P', 'HDR/DV', 'PDF/EPUB', '无损音频'].map((q) => {
                const isAll = q === '全部';
                const isSelected = isAll ? !filters.qualityFilter : filters.qualityFilter === q;
                return (
                  <button
                    key={q}
                    onClick={() => onFilterChange({ qualityFilter: isAll ? '' : q })}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      isSelected
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium'
                        : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
                    }`}
                  >
                    {q}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Extract code filter */}
          <div>
            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              提取码状态
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { key: 'all', label: '全部' },
                { key: 'free', label: '免提取码' },
                { key: 'with_code', label: '附提取码' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => onFilterChange({ hasExtractCode: item.key as any })}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filters.hasExtractCode === item.key
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              排序方式
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { key: 'latest', label: '最新发布' },
                { key: 'views', label: '热度最多' },
                { key: 'size_desc', label: '体积由大到小' },
                { key: 'size_asc', label: '体积由小到大' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => onFilterChange({ sortBy: item.key as any })}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filters.sortBy === item.key
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
