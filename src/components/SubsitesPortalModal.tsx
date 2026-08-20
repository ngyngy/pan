import React from 'react';
import { X, ExternalLink, Globe, CheckCircle2, Sparkles, BookOpen, GraduationCap, Film, Mic2, Coins, Compass } from 'lucide-react';
import { SUB_SITES } from '../data/subsites';

interface SubsitesPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterBySubsite: (subsiteCategory: any) => void;
}

export const SubsitesPortalModal: React.FC<SubsitesPortalModalProps> = ({
  isOpen,
  onClose,
  onFilterBySubsite
}) => {
  if (!isOpen) return null;

  const getSiteIcon = (id: string) => {
    switch (id) {
      case 'tianya':
        return <BookOpen className="w-5 h-5 text-amber-500" />;
      case 'xuexi':
        return <GraduationCap className="w-5 h-5 text-emerald-500" />;
      case 'dy':
        return <Film className="w-5 h-5 text-rose-500" />;
      case 'gxs':
        return <Mic2 className="w-5 h-5 text-indigo-500" />;
      case 'btczy':
        return <Coins className="w-5 h-5 text-orange-500" />;
      case 'uc':
        return <Compass className="w-5 h-5 text-sky-500" />;
      default:
        return <Globe className="w-5 h-5 text-neutral-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[90vh] z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                NGY 官方分站矩阵直达
              </h3>
              <p className="text-xs text-neutral-400">
                所有分站数据已全部聚合在此主站，您也可以直接访问分站独立站点
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {SUB_SITES.map((site) => (
              <div
                key={site.id}
                className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getSiteIcon(site.id)}
                      <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                        {site.name}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-200/80 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium">
                      {site.badge}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-sky-600 dark:text-sky-400 mb-2">
                    {site.subdomain}
                  </div>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-2">
                    {site.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {site.highlightTags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800 text-neutral-500 border border-neutral-200/60 dark:border-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-800">
                  <button
                    onClick={() => {
                      onFilterBySubsite(site.category);
                      onClose();
                    }}
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-center transition-colors"
                  >
                    在聚合站筛选 ({site.totalResources})
                  </button>

                  <a
                    href={site.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 py-1.5 px-3 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    <span>直达分站</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center text-xs text-neutral-400">
          <span>全部分站均由 NGY 统一维护与实时同步</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-medium hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
