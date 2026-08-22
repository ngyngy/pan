import React from 'react';
import { SUB_SITES } from '../data/subsites';
import { SubSiteCategory } from '../types';
import { ExternalLink, Globe } from 'lucide-react';

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
      <div className="flex items-center justify-between gap-2 mb-2 px-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300">
          <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>官方聚合分站导航</span>
          <span className="text-[11px] font-normal text-neutral-400 dark:text-neutral-500">
            （6大分站直达 · 点击可过滤或直达）
          </span>
        </div>
      </div>

      {/* 2 Rows Layout: 3 columns per row (6 sub-sites in total) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {SUB_SITES.map((site) => {
          const isSelected = selectedSubsite === site.category;
          const count = resourceCounts[site.id] || site.totalResources;

          return (
            <div
              key={site.id}
              onClick={() => onSelectSubsite(site.category)}
              className={`group relative flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-100 shadow-sm ring-1 ring-emerald-500'
                  : 'bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border-neutral-200/90 dark:border-neutral-800 hover:border-emerald-400 dark:hover:border-emerald-700 hover:shadow-xs'
              }`}
            >
              {/* Left: Subsite Name & Count */}
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                      {site.name}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                      ({count}项)
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-xs transition-all shrink-0 group/btn"
              >
                <span className="font-mono tracking-tight">{site.subdomain}</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
