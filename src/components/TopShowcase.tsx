import React, { useMemo } from 'react';
import { ChevronRight, Sparkles, Clock, FolderArchive, Flame, HardDrive, Eye } from 'lucide-react';
import { ResourceItem } from '../types';

interface TopShowcaseProps {
  resources: ResourceItem[];
  onSelectResource: (resource: ResourceItem) => void;
  onViewMore: (type: 'featured' | 'latest' | 'collection') => void;
}

export const TopShowcase: React.FC<TopShowcaseProps> = ({
  resources,
  onSelectResource,
  onViewMore
}) => {
  if (resources.length === 0) {
    return null;
  }

  // Intelligently build 3 completely distinct, non-overlapping columns
  const { featuredList, latestList, collectionList } = useMemo(() => {
    const usedIds = new Set<string>();

    // 1. Column 1: 精选优质网盘资源 (Top Rated / High Views / Pinned)
    const sortedByFeatured = [...resources].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return (b.views || 0) - (a.views || 0);
    });

    const col1: ResourceItem[] = [];
    for (const item of sortedByFeatured) {
      if (col1.length >= 8) break;
      col1.push(item);
      usedIds.add(item.id);
    }

    // 2. Column 2: 最新收录上线 (Sorted by Date descending, unique from Col 1)
    const sortedByLatest = [...resources].sort((a, b) => {
      const timeA = new Date(a.publishDate).getTime() || 0;
      const timeB = new Date(b.publishDate).getTime() || 0;
      if (timeB !== timeA) return timeB - timeA;
      return (b.views || 0) - (a.views || 0);
    });

    const col2: ResourceItem[] = [];
    for (const item of sortedByLatest) {
      if (col2.length >= 8) break;
      if (!usedIds.has(item.id)) {
        col2.push(item);
        usedIds.add(item.id);
      }
    }
    // Fallback if needed
    if (col2.length < 8) {
      for (const item of sortedByLatest) {
        if (col2.length >= 8) break;
        if (!col2.some(c => c.id === item.id)) {
          col2.push(item);
        }
      }
    }

    // 3. Column 3: 经典大合集精选 (Huge collections / bundle packages, unique from Col 1 & 2)
    const collectionsPool = [...resources]
      .filter(r => r.isCollection || r.title.includes('合集') || r.title.includes('全集') || r.title.includes('全套') || r.title.includes('大全'))
      .sort((a, b) => (b.sizeBytes || 0) - (a.sizeBytes || 0) || (b.downloads || 0) - (a.downloads || 0));

    const col3: ResourceItem[] = [];
    for (const item of collectionsPool) {
      if (col3.length >= 8) break;
      if (!usedIds.has(item.id)) {
        col3.push(item);
        usedIds.add(item.id);
      }
    }
    // Fallback if needed
    if (col3.length < 8) {
      for (const item of collectionsPool) {
        if (col3.length >= 8) break;
        if (!col3.some(c => c.id === item.id)) {
          col3.push(item);
        }
      }
    }

    return { featuredList: col1, latestList: col2, collectionList: col3 };
  }, [resources]);

  return (
    <section className="w-full pt-1">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {/* Column 1: 精选优质网盘资源 */}
        <div className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl p-4 sm:p-5 border border-amber-200/60 dark:border-amber-900/40 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between pb-3.5 border-b border-amber-100 dark:border-neutral-800 mb-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-extrabold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 tracking-tight flex items-center gap-1.5">
                  <span>精选优质网盘资源</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">
                    TOP榜
                  </span>
                </h2>
              </div>
            </div>
            <button
              onClick={() => onViewMore('featured')}
              className="text-xs text-neutral-400 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-0.5 transition-colors font-medium cursor-pointer"
            >
              查看更多
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            {featuredList.map((item, idx) => (
              <div
                key={`feat-${item.id}-${idx}`}
                onClick={() => onSelectResource(item)}
                className="group flex items-center justify-between gap-2 p-1.5 -mx-1.5 rounded-lg hover:bg-amber-50/50 dark:hover:bg-amber-950/20 cursor-pointer text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className={`w-4 h-4 rounded text-[11px] font-black flex items-center justify-center shrink-0 ${
                    idx === 0 ? 'bg-amber-500 text-white' :
                    idx === 1 ? 'bg-amber-400 text-white' :
                    idx === 2 ? 'bg-amber-300 dark:bg-amber-600 text-amber-950 dark:text-white' :
                    'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="truncate leading-relaxed group-hover:text-amber-600 dark:group-hover:text-amber-400 font-medium">
                    {item.title}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400 shrink-0 hidden sm:inline">
                  {item.driveName.slice(0, 2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: 最新收录上线 */}
        <div className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl p-4 sm:p-5 border border-emerald-200/60 dark:border-emerald-900/40 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between pb-3.5 border-b border-emerald-100 dark:border-neutral-800 mb-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-extrabold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 tracking-tight flex items-center gap-1.5">
                  <span>最新收录上线</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                    实时更新
                  </span>
                </h2>
              </div>
            </div>
            <button
              onClick={() => onViewMore('latest')}
              className="text-xs text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-0.5 transition-colors font-medium cursor-pointer"
            >
              查看更多
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            {latestList.map((item, idx) => (
              <div
                key={`latest-${item.id}-${idx}`}
                onClick={() => onSelectResource(item)}
                className="group flex items-center justify-between gap-2 p-1.5 -mx-1.5 rounded-lg hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 cursor-pointer text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate leading-relaxed group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-medium">
                    {item.title}
                  </span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 shrink-0">
                  {item.relativeTime || '最新'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: 经典大合集精选 */}
        <div className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl p-4 sm:p-5 border border-indigo-200/60 dark:border-indigo-900/40 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between pb-3.5 border-b border-indigo-100 dark:border-neutral-800 mb-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400">
                <FolderArchive className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-extrabold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 tracking-tight flex items-center gap-1.5">
                  <span>经典大合集精选</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold">
                    海量打包
                  </span>
                </h2>
              </div>
            </div>
            <button
              onClick={() => onViewMore('collection')}
              className="text-xs text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-0.5 transition-colors font-medium cursor-pointer"
            >
              查看更多
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            {collectionList.map((item, idx) => (
              <div
                key={`col-${item.id}-${idx}`}
                onClick={() => onSelectResource(item)}
                className="group flex items-center justify-between gap-2 p-1.5 -mx-1.5 rounded-lg hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 cursor-pointer text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <FolderArchive className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="truncate leading-relaxed group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-medium">
                    {item.title}
                  </span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 shrink-0 font-medium">
                  {item.size || '合集'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

