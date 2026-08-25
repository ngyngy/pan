import React from 'react';
import { SUB_SITES } from '../data/subsites';
import { SubSiteCategory } from '../types';
import { ExternalLink, Globe, Sparkles, Compass } from 'lucide-react';

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
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 mb-2.5 px-1">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
          <div className="w-5 h-5 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-extrabold tracking-tight">官方聚合分站矩阵</span>
          <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500 hidden sm:inline">
            （7大垂直分站直达 · 点击卡片可快速筛选分类，点击网址直达官方站点）
          </span>
        </div>
      </div>

      {/* Grid Layout: Responsive columns for 7 sub-sites */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3">
        {SUB_SITES.map((site) => {
          const isSelected = selectedSubsite === site.category;
          const count = resourceCounts[site.id] || site.totalResources;

          return (
            <div
              key={site.id}
              onClick={() => onSelectSubsite(site.category)}
              className={`group relative flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200/90 dark:border-slate-800/90 hover:border-emerald-400/80 dark:hover:border-emerald-600/80 hover:shadow-md hover:shadow-slate-200/50 dark:hover:shadow-black/40'
              }`}
            >
              {/* Left: Subsite Name & Count */}
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shrink-0 ${
                  isSelected ? 'bg-emerald-500 scale-110 ring-4 ring-emerald-500/20' : 'bg-slate-300 dark:bg-slate-700 group-hover:bg-emerald-400'
                }`} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                      {site.name}
                    </span>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
                      {count}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Big, Prominent URL Link Button */}
              <a
                href={site.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                title={`在新窗口访问官方分站: ${site.url}`}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow-md hover:shadow-emerald-500/20 transition-all shrink-0 group/btn"
              >
                <span className="font-mono tracking-tight">{site.subdomain}</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

