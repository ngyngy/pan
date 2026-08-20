import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  ExternalLink, 
  KeyRound, 
  Globe, 
  Folder, 
  Download, 
  Eye, 
  Share2, 
  Check, 
  ShieldAlert, 
  FileText,
  Clock,
  HardDrive
} from 'lucide-react';
import { ResourceItem } from '../types';

interface ResourceDetailModalProps {
  resource: ResourceItem | null;
  onClose: () => void;
  onCopyLink: (resource: ResourceItem) => void;
  onReportIssue: (resource: ResourceItem) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  onClose,
  onCopyLink,
  onReportIssue
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!resource) return null;

  const handleCopyExtractCode = () => {
    if (resource.extractCode) {
      navigator.clipboard.writeText(resource.extractCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyFullShare = () => {
    const text = `【资源名称】：${resource.title}\n【网盘类型】：${resource.driveName}\n【分享链接】：${resource.driveUrl}${resource.extractCode ? `\n【提取码】：${resource.extractCode}` : ''}\n【来源分站】：${resource.subsiteName} (${resource.subsiteUrl})\n【聚合门户】：网盘资源聚合 (pan.ngy123.com)`;
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[90vh] z-10">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                {resource.driveName}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                {resource.categoryName}
              </span>
              {resource.quality && (
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-300 border border-orange-200/50 dark:border-orange-800/50">
                  {resource.quality}
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
              {resource.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Scrollable */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-sm">
          {/* Subsite Origin Card */}
          <div className="flex items-center justify-between p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/60 dark:border-neutral-800">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-sky-500 shrink-0" />
              <div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">资源收录来源分站</div>
                <div className="font-semibold text-neutral-800 dark:text-neutral-200">{resource.subsiteName}</div>
              </div>
            </div>
            <a
              href={resource.subsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs font-mono px-2.5 py-1.5 rounded-lg bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              <span>{resource.subsiteUrl.replace('http://', '')}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
              <div className="text-xs text-neutral-400 flex items-center justify-center gap-1 mb-0.5">
                <HardDrive className="w-3.5 h-3.5" /> 文件大小
              </div>
              <div className="font-bold text-neutral-800 dark:text-neutral-200 font-mono">{resource.size}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
              <div className="text-xs text-neutral-400 flex items-center justify-center gap-1 mb-0.5">
                <Clock className="w-3.5 h-3.5" /> 更新时间
              </div>
              <div className="font-bold text-neutral-800 dark:text-neutral-200">{resource.relativeTime}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
              <div className="text-xs text-neutral-400 flex items-center justify-center gap-1 mb-0.5">
                <Download className="w-3.5 h-3.5" /> 转存热度
              </div>
              <div className="font-bold text-neutral-800 dark:text-neutral-200 font-mono">{resource.downloads.toLocaleString()} 次</div>
            </div>
          </div>

          {/* Extract code section if exists */}
          {resource.extractCode && (
            <div className="flex items-center justify-between p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/50">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="font-medium text-amber-900 dark:text-amber-200 text-xs">提取码：</span>
                <span className="font-mono text-base font-bold text-amber-700 dark:text-amber-300 tracking-wider bg-white/80 dark:bg-black/30 px-2 py-0.5 rounded">
                  {resource.extractCode}
                </span>
              </div>
              <button
                onClick={handleCopyExtractCode}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? '已复制' : '复制提取码'}</span>
              </button>
            </div>
          )}

          {/* Description */}
          {resource.description && (
            <div>
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                资源简述
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed bg-neutral-50 dark:bg-neutral-800/30 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800">
                {resource.description}
              </p>
            </div>
          )}

          {/* File Structure Preview if present */}
          {resource.fileList && resource.fileList.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5" /> 包含文件清单
              </h4>
              <div className="bg-neutral-50 dark:bg-neutral-800/40 rounded-xl p-3 border border-neutral-100 dark:border-neutral-800 space-y-1.5 font-mono text-xs text-neutral-600 dark:text-neutral-300 max-h-40 overflow-y-auto">
                {resource.fileList.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 truncate">
                    <FileText className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="truncate">{file}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onReportIssue(resource)}
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>链接失效投诉</span>
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleCopyFullShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedAll ? '已复制分享文案' : '复制整套信息'}</span>
            </button>

            <a
              href={resource.driveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-900 shadow-sm transition-colors"
            >
              <span>立即前往网盘转存</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
