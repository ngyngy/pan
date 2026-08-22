import React, { useState } from 'react';
import { X, Copy, Check, Users, MessageSquare, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

interface QQGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopySuccess?: (msg: string) => void;
}

export const QQGroupModal: React.FC<QQGroupModalProps> = ({
  isOpen,
  onClose,
  onCopySuccess
}) => {
  const [copied, setCopied] = useState(false);
  const groupNumber = '1036591276';
  const groupName = '资源共享总群';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(groupNumber);
    setCopied(true);
    if (onCopySuccess) {
      onCopySuccess(`QQ群号【${groupNumber}】已复制到剪贴板`);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Header */}
        <div className="p-6 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 text-sky-100">
                  官方交流群
                </span>
                <span className="text-xs text-sky-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 免费进群
                </span>
              </div>
              <h2 className="text-xl font-extrabold mt-0.5 tracking-tight">
                {groupName}
              </h2>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* QQ Group Info Box */}
          <div className="p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                官方QQ群号
              </div>
              <div className="text-2xl font-black font-mono text-sky-600 dark:text-sky-400 tracking-wider">
                {groupNumber}
              </div>
            </div>

            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>已复制群号</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>一键复制群号</span>
                </>
              )}
            </button>
          </div>

          {/* Group benefits */}
          <div className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-300">
            <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>进群福利与交流内容：</span>
            </div>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0"></span>
                <span>第一时间获取全网最新影视、电视剧、爆款短剧与4K原盘网盘更新通知</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0"></span>
                <span>求资源快速响应：群友互助求片、求考试资料、求办公设计软件工具</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0"></span>
                <span>网盘链接失效实时补链与备用链接索取</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0"></span>
                <span>交流探讨网盘高速下载技巧与TVBox最新配置接口</span>
              </li>
            </ul>
          </div>

          {/* Footer Action */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Copy className="w-4 h-4" />
              <span>复制群号去QQ添加 ({groupNumber})</span>
            </button>
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold text-xs hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
