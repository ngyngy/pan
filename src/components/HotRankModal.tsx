import React, { useState } from 'react';
import { X, Flame, Trophy, TrendingUp, Download, ExternalLink, KeyRound } from 'lucide-react';
import { ResourceItem } from '../types';

interface HotRankModalProps {
  isOpen: boolean;
  onClose: () => void;
  resources: ResourceItem[];
  onSelectResource: (resource: ResourceItem) => void;
}

export const HotRankModal: React.FC<HotRankModalProps> = ({
  isOpen,
  onClose,
  resources,
  onSelectResource
}) => {
  const [tab, setTab] = useState<'downloads' | 'views' | 'tianya_btc'>('downloads');

  if (!isOpen) return null;

  const topDownloads = [...resources].sort((a, b) => b.downloads - a.downloads).slice(0, 10);
  const topViews = [...resources].sort((a, b) => b.views - a.views).slice(0, 10);
  const tianyaAndSpecial = [...resources].filter(r => r.subsiteId === 'tianya' || r.subsiteId === 'btczy' || r.subsiteId === 'gxs');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[90vh] z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                全网网盘资源热度排行榜
              </h3>
              <p className="text-xs text-neutral-400">
                基于全部分站用户实时转存、点击与下载量综合计算
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

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-neutral-100 dark:border-neutral-800 text-xs font-semibold">
          <button
            onClick={() => setTab('downloads')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              tab === 'downloads'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>转存总榜 Top 10</span>
          </button>

          <button
            onClick={() => setTab('views')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              tab === 'views'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>浏览热度榜</span>
          </button>

          <button
            onClick={() => setTab('tianya_btc')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              tab === 'tianya_btc'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            <span>天涯/晓松/比特币专榜</span>
          </button>
        </div>

        {/* List Content */}
        <div className="p-5 overflow-y-auto space-y-2.5 flex-1">
          {(tab === 'downloads' ? topDownloads : tab === 'views' ? topViews : tianyaAndSpecial).map((item, idx) => {
            const rank = idx + 1;
            const rankBadgeColor =
              rank === 1
                ? 'bg-amber-500 text-white font-bold'
                : rank === 2
                ? 'bg-slate-400 text-white font-bold'
                : rank === 3
                ? 'bg-amber-700 text-white font-bold'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 font-medium';

            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelectResource(item);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/60 cursor-pointer border border-neutral-100 dark:border-neutral-800 transition-colors gap-3"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs shrink-0 ${rankBadgeColor}`}>
                    {rank}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                      {item.title}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                      <span>{item.subsiteName}</span>
                      <span>•</span>
                      <span>{item.driveName}</span>
                      <span>•</span>
                      <span>{item.size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono font-medium text-orange-600 dark:text-orange-400">
                    {tab === 'downloads' ? `${item.downloads} 次` : `${item.views} 阅`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
