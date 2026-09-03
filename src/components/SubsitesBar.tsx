import React from 'react';
import { SUB_SITES } from '../data/subsites';
import { ExternalLink, Compass } from 'lucide-react';

interface SubsitesBarProps {
  resourceCounts: Record<string, number>;
}

export const SubsitesBar: React.FC<SubsitesBarProps> = ({
  resourceCounts
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 mb-2.5 px-1">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
          <div className="w-5 h-5 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-extrabold tracking-tight">官方聚合分站矩阵</span>
          <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500 hidden sm:inline">
            （8大垂直分站 · 点击任意卡片直接在新窗口打开对应分站）
          </span>
        </div>
      </div>

      {/* Grid Layout: Responsive columns for 8 sub-sites */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {SUB_SITES.map((site) => {
          const count = resourceCounts[site.id] || site.totalResources;

          return (
            <a
              key={site.id}
              href={site.url}
              target="_blank"
              rel="noreferrer"
              title={`点击直达 ${site.name}（${site.url}）`}
              className="group relative flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200/90 dark:border-slate-800/90 hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/30 hover:shadow-md hover:shadow-emerald-500/10 cursor-pointer"
            >
              {/* Left: Subsite Dot, Name & Count */}
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-emerald-500 group-hover:scale-110 transition-all duration-300 shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                      {site.name}
                    </span>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60 group-hover:border-emerald-200 dark:group-hover:border-emerald-800 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                      {count}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Visual External Link indicator */}
              <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-slate-100/80 dark:bg-slate-800 group-hover:bg-emerald-600 text-slate-400 dark:text-slate-500 group-hover:text-white transition-all duration-200 shrink-0 shadow-xs">
                <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

