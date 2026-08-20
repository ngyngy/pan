import React from 'react';
import { ChevronRight, Sparkles, Clock, FolderArchive } from 'lucide-react';
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

  // Extract items for 3 columns
  const featuredList = resources.filter(r => r.isFeatured).slice(0, 8);
  const latestList = resources.filter(r => r.isLatest || r.publishDate.includes('2026-08-20') || r.publishDate.includes('2026-08-19')).slice(0, 8);
  const collectionList = resources.filter(r => r.isCollection).slice(0, 8);

  return (
    <section className="w-full mb-8 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Column 1: 精选 */}
        <div className="flex flex-col bg-white dark:bg-neutral-900 rounded-xl p-5 border border-neutral-200/80 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800 mb-3">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-neutral-900 dark:text-neutral-100 tracking-tight">
                精选优质网盘资源
              </h2>
            </div>
            <button
              onClick={() => onViewMore('featured')}
              className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 flex items-center gap-0.5 transition-colors font-medium"
            >
              查看更多
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col space-y-2.5">
            {featuredList.map((item, idx) => (
              <div
                key={`feat-${item.id}-${idx}`}
                onClick={() => onSelectResource(item)}
                className="group flex items-start gap-2 cursor-pointer text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
              >
                <span className="truncate leading-relaxed">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: 最新 */}
        <div className="flex flex-col bg-white dark:bg-neutral-900 rounded-xl p-5 border border-neutral-200/80 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800 mb-3">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-neutral-900 dark:text-neutral-100 tracking-tight">
                最新收录上线
              </h2>
            </div>
            <button
              onClick={() => onViewMore('latest')}
              className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 flex items-center gap-0.5 transition-colors font-medium"
            >
              查看更多
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col space-y-2.5">
            {latestList.map((item, idx) => {
              const isHighlight = item.isLatest || item.title.includes('福利') || item.title.includes('柏林之声') || item.title.includes('三体') || item.title.includes('资治通鉴') || item.title.includes('雅思');
              return (
                <div
                  key={`latest-${item.id}-${idx}`}
                  onClick={() => onSelectResource(item)}
                  className={`group flex items-start gap-2 cursor-pointer text-sm transition-colors ${
                    isHighlight 
                      ? 'text-orange-600 dark:text-orange-400 font-medium' 
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white'
                  }`}
                >
                  <span className="truncate leading-relaxed">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: 合集 */}
        <div className="flex flex-col bg-white dark:bg-neutral-900 rounded-xl p-5 border border-neutral-200/80 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800 mb-3">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-neutral-900 dark:text-neutral-100 tracking-tight">
                经典大合集精选
              </h2>
            </div>
            <button
              onClick={() => onViewMore('collection')}
              className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 flex items-center gap-0.5 transition-colors font-medium"
            >
              查看更多
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col space-y-2.5">
            {collectionList.map((item, idx) => (
              <div
                key={`col-${item.id}-${idx}`}
                onClick={() => onSelectResource(item)}
                className="group flex items-start gap-2 cursor-pointer text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
              >
                <span className="truncate leading-relaxed">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
