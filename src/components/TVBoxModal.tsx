import React, { useState } from 'react';
import { X, Tv, Copy, Check, ExternalLink, HelpCircle, Download, Smartphone } from 'lucide-react';

interface TVBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TVBoxModal: React.FC<TVBoxModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const tvboxInterfaces = [
    {
      name: 'NGY精选主线影视多仓源 (2026全网聚合)',
      url: 'https://uc.ngy123.com/tvbox/main.json',
      type: '多仓主线',
      desc: '内置几十个优质影视源，秒播4K高码率电影、美剧、动漫与热播综艺'
    },
    {
      name: '夸克/UC云盘原盘4K专线接口',
      url: 'https://uc.ngy123.com/tvbox/pan4k.json',
      type: '网盘4K',
      desc: '支持夸克、UC网盘直链无损播放，杜比视界高码率原盘极速加载'
    },
    {
      name: '中小学教育及少儿专线源',
      url: 'https://xuexi.ngy123.com/tvbox/edu.json',
      type: '少儿教育',
      desc: '同步中小学学习资料网教学视频、纪录片、名著动画与名师公开课'
    }
  ];

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[90vh] z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                TVBox 电视盒子接口源配置
              </h3>
              <p className="text-xs text-neutral-400">
                支持 TVBox、影视仓、OK影视、FongMi 等主流播放器一键配置
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
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Interface list */}
          <div className="space-y-3">
            {tvboxInterfaces.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                      {item.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-medium">
                      {item.type}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {item.desc}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    readOnly
                    value={item.url}
                    className="flex-1 font-mono text-xs bg-white dark:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy(item.url, idx)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium hover:opacity-90 transition-opacity shrink-0"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === idx ? '已复制' : '复制接口'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick guide */}
          <div className="p-3.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60 text-xs space-y-1.5 text-neutral-600 dark:text-neutral-300">
            <div className="font-semibold text-neutral-800 dark:text-neutral-100 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-sky-500" /> 如何在 TVBox 中使用：
            </div>
            <ol className="list-decimal list-inside space-y-1 text-neutral-500 dark:text-neutral-400 pl-1 leading-relaxed">
              <li>打开电视或手机端的 TVBox 软件，进入【设置】或【配置】页面。</li>
              <li>点击【配置地址】/【接口设置】，粘贴上方复制的接口链接。</li>
              <li>点击确定保存并重启软件即可畅享海量高清 4K 影视与网盘专线。</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
