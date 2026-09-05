import React from 'react';
import { Copy, ExternalLink, KeyRound, Sparkles, Folder, Check, FileText } from 'lucide-react';
import { ResourceItem } from '../types';

interface ResourceTableProps {
  resources: ResourceItem[];
  searchQuery: string;
  totalFilteredCount: number;
  totalAllCount: number;
  onSelectResource: (resource: ResourceItem) => void;
  onCopyLink: (resource: ResourceItem, e: React.MouseEvent) => void;
  copiedId: string | null;
}

export const ResourceTable: React.FC<ResourceTableProps> = ({
  resources,
  searchQuery,
  totalFilteredCount,
  totalAllCount,
  onSelectResource,
  onCopyLink,
  copiedId
}) => {
  // Highlight keyword match in title
  const highlightMatch = (text: string, query: string) => {
    if (!query || !query.trim()) return text;
    const trimmed = query.trim();
    const parts = text.split(new RegExp(`(${trimmed})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === trimmed.toLowerCase() ? (
            <mark key={i} className="bg-amber-200 dark:bg-amber-800 text-neutral-900 dark:text-white px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const getDriveBadgeColor = (driveType: string) => {
    switch (driveType) {
      case 'quark':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'baidu':
        return 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 border-sky-200 dark:border-sky-800';
      case 'uc':
        return 'bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'aliyun':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'xunlei':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      case 'magnet':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case '115':
        return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700';
    }
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
      {/* Table Header Row */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/50">
        <h2 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 tracking-wider">
          全网网盘资源聚合检索列表
        </h2>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
          已展示 <strong className="text-neutral-700 dark:text-neutral-300 font-semibold">{totalFilteredCount}</strong> / {totalAllCount}
        </span>
      </div>

      {/* Resource List Rows */}
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
        {resources.length === 0 ? (
          <div className="py-20 px-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
              <FileText className="w-6 h-6" />
            </div>
            {totalAllCount === 0 ? (
              <div className="max-w-md mx-auto space-y-2">
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  资源库已清空，准备就绪
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  请直接发送您的最新网盘资源链接（支持夸克、百度、UC、迅雷等任何网盘分享链接及提取码），将立即为您入库并生成聚合索引！
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">未找到符合条件的资源</p>
                <p className="text-xs text-neutral-400">尝试更换搜索词，或重置筛选条件</p>
              </div>
            )}
          </div>
        ) : (
          resources.map((item) => {
            const isCopied = copiedId === item.id;

            return (
              <article
                key={item.id}
                itemScope
                itemType="https://schema.org/DigitalDocument"
                onClick={() => onSelectResource(item)}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3.5 hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 cursor-pointer transition-colors gap-3"
              >
                {/* Left Section: Status Dot, Title & Meta */}
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  {/* Status Indicator Dot */}
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.4)]" aria-label="可用" />

                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h3 
                      itemProp="name" 
                      className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-950 dark:group-hover:text-white leading-relaxed line-clamp-2 sm:line-clamp-1"
                    >
                      {highlightMatch(item.title, searchQuery)}
                    </h3>

                    {/* Sub-meta tags (like screenshot: 夸克网盘 视频 2天前) */}
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                      {/* Drive Type badge */}
                      <span className={`px-1.5 py-0.5 rounded text-[11px] font-medium border ${getDriveBadgeColor(item.driveType)}`}>
                        {item.driveName}
                      </span>

                      {/* Sub-site badge */}
                      <span className="text-neutral-500 dark:text-neutral-400">
                        {item.subsiteName}
                      </span>

                      <span>•</span>

                      {/* Category */}
                      <span itemProp="genre">{item.categoryName}</span>

                      <span>•</span>

                      {/* Time */}
                      <time itemProp="datePublished" dateTime={item.publishDate}>{item.relativeTime}</time>

                      {/* Extract code indicator if any */}
                      {item.extractCode && (
                        <span className="inline-flex items-center gap-0.5 text-amber-600 dark:text-amber-400 font-mono text-[11px] bg-amber-50 dark:bg-amber-950/40 px-1 py-0.5 rounded">
                          <KeyRound className="w-3 h-3" />
                          码: {item.extractCode}
                        </span>
                      )}

                      {/* Has recommendation post badge */}
                      {item.recommendation && (
                        <span className="inline-flex items-center gap-0.5 text-rose-600 dark:text-rose-400 font-medium text-[11px] bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded border border-rose-200/60 dark:border-rose-900/50">
                          <Sparkles className="w-3 h-3" />
                          含发布文案
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Section: Size & Action buttons */}
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800">
                  {/* File Size */}
                  <span itemProp="fileSize" className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    {item.size}
                  </span>

                  {/* Actions: Copy & Jump */}
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {/* Copy Link Button */}
                    <button
                      onClick={(e) => onCopyLink(item, e)}
                      title={isCopied ? "已复制！" : "复制链接与提取码"}
                      aria-label={`复制 ${item.title} 分享链接`}
                      className={`p-1.5 rounded-lg border transition-all ${
                        isCopied
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
                          : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 border-neutral-200/80 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>

                    {/* Open External Share Link */}
                    <a
                      href={item.driveUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="在新窗口直达网盘链接"
                      aria-label={`跳转至 ${item.title} 网盘链接`}
                      className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
