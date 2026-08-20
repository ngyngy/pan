import React from 'react';
import { SUB_SITES } from '../data/subsites';
import { SubSiteCategory } from '../types';
import { ExternalLink, Sparkles } from 'lucide-react';

interface SubsitesBarProps {
  selectedSubsite: SubSiteCategory;
  onSelectSubsite: (subsite: SubSiteCategory) => void;
  resourceCounts: Record<string, number>;
}

export const SubsitesBar: React.FC<SubsitesBarProps> = ({
  selectedSubsite,
  onSelectSubsite,
  resourceCounts
}) => {
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between gap-2 mb-2 px-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          <span>聚合分站导航</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-normal">
            6大官方分站
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* All / 全部 */}
        <button
          onClick={() => onSelectSubsite('all')}
          className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
            selectedSubsite === 'all'
              ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white shadow-sm ring-2 ring-neutral-900/10 dark:ring-white/20'
              : 'bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <span className="text-xs font-bold tracking-tight">全部分站资源</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
              selectedSubsite === 'all' 
                ? 'bg-white/20 text-white dark:bg-neutral-900/10 dark:text-neutral-900' 
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
            }`}>
              {resourceCounts['all'] || 0}
            </span>
          </div>
          <span className={`text-[11px] truncate ${
            selectedSubsite === 'all' ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400 dark:text-neutral-500'
          }`}>
            全网全量资源汇总
          </span>
        </button>

        {/* 6 User Subsites */}
        {SUB_SITES.map((site) => {
          const isSelected = selectedSubsite === site.category;
          const count = resourceCounts[site.id] || site.totalResources;

          return (
            <div
              key={site.id}
              className={`group relative flex flex-col justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white shadow-sm ring-2 ring-neutral-900/10 dark:ring-white/20'
                  : 'bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
              onClick={() => onSelectSubsite(site.category)}
            >
              <div>
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xs font-bold tracking-tight truncate mr-1">
                    {site.name}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                    isSelected 
                      ? 'bg-white/20 text-white dark:bg-neutral-900/10 dark:text-neutral-900' 
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                  }`}>
                    {count}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-[11px] font-mono truncate ${
                    isSelected ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400 dark:text-neutral-500'
                  }`}>
                    {site.subdomain}
                  </span>
                </div>
              </div>

              {/* Direct Open Link on hover/click */}
              <div className="mt-2 pt-1.5 border-t border-neutral-100/10 dark:border-neutral-800 flex items-center justify-between">
                <span className={`text-[10px] ${isSelected ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400'}`}>
                  {site.badge}
                </span>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title={`新窗口打开分站 ${site.subdomain}`}
                  className={`p-1 rounded transition-colors ${
                    isSelected 
                      ? 'hover:bg-white/20 text-white dark:hover:bg-neutral-200 dark:text-neutral-900' 
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                  }`}
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
