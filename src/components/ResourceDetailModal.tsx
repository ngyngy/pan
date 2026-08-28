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
  const [copiedCode1, setCopiedCode1] = useState(false);
  const [copiedCode2, setCopiedCode2] = useState(false);
  const [copiedDownloadLink, setCopiedDownloadLink] = useState(false);
  const [copiedPanDownloadLink, setCopiedPanDownloadLink] = useState(false);
  const [copiedOfficialGameLink, setCopiedOfficialGameLink] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!resource) return null;

  const isWelfareItem = resource.isWelfare || resource.mainCategoryId === 'welfare';

  const handleCopyExtractCode = () => {
    if (resource.extractCode) {
      navigator.clipboard.writeText(resource.extractCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyText = (text: string, type: 'code1' | 'code2' | 'link' | 'panLink' | 'officialGameLink') => {
    navigator.clipboard.writeText(text);
    if (type === 'code1') {
      setCopiedCode1(true);
      setTimeout(() => setCopiedCode1(false), 2000);
    } else if (type === 'code2') {
      setCopiedCode2(true);
      setTimeout(() => setCopiedCode2(false), 2000);
    } else if (type === 'link') {
      setCopiedDownloadLink(true);
      setTimeout(() => setCopiedDownloadLink(false), 2000);
    } else if (type === 'panLink') {
      setCopiedPanDownloadLink(true);
      setTimeout(() => setCopiedPanDownloadLink(false), 2000);
    } else if (type === 'officialGameLink') {
      setCopiedOfficialGameLink(true);
      setTimeout(() => setCopiedOfficialGameLink(false), 2000);
    }
  };

  const handleCopyFullShare = () => {
    if (resource.id === 'game-mobile-zero-one-discount-platform' || resource.title.includes('0.1折')) {
      const discountText = `【特别福利】0.1折手游平台 (热门手游千款0.1折充值 / 官方BT福利变态版)\n【夸克网盘下载】：https://pan.quark.cn/s/4979ed20ffd0\n【夸克口令】：/~90ea3aMBnt~:/\n【官网直达下载】：https://www.3387.com/cps/app/6a85087b2beb0.html\n【福利说明】：聚合千款热门仙侠、卡牌、传奇、策略及二次元手游，充值全场永久0.1折（648元仅需6.48元），上线送满级VIP特权与无限元宝礼包，安卓手机一键极速安装畅玩！`;
      navigator.clipboard.writeText(discountText);
    } else if (isWelfareItem) {
      const text = `【特别福利】：${resource.title}\n【下载链接】：${resource.driveUrl}${resource.extractCode ? `\n【提取码/口令】：${resource.extractCode}` : ''}\n【说明】：${resource.description || ''}`;
      navigator.clipboard.writeText(text);
    } else {
      const text = `【资源名称】：${resource.title}\n【网盘类型】：${resource.driveName}\n【分享链接】：${resource.driveUrl}${resource.extractCode ? `\n【提取码】：${resource.extractCode}` : ''}\n【来源分站】：${resource.subsiteName} (${resource.subsiteUrl})\n【聚合门户】：网盘吧 (www.wangpan8.com)`;
      navigator.clipboard.writeText(text);
    }
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
              {isWelfareItem ? (
                <span className="px-2.5 py-0.5 rounded text-xs font-extrabold bg-rose-600 text-white shadow-2xs flex items-center gap-1">
                  🎁 特别福利
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                  {resource.driveName}
                </span>
              )}
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
            className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Scrollable */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-sm">
          {/* SPECIAL WELFARE PRESENTATION */}
          {isWelfareItem ? (
            <div className="space-y-4">
              {/* 0.1折手游平台专属福利展示 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50/90 to-amber-50/60 dark:from-rose-950/40 dark:to-neutral-900 border border-rose-200 dark:border-rose-800/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                    🎮
                  </div>
                  <div>
                    <h4 className="font-extrabold text-neutral-900 dark:text-neutral-100 text-base">
                      0.1折手游特权充值平台 · 变态BT福利
                    </h4>
                    <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                      充值全场永久0.1折（648元仅需6.48元）· 上线送满V与无限元宝
                    </p>
                  </div>
                </div>

                  {/* Feature Bullets */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-xl bg-white/90 dark:bg-neutral-800/90 border border-rose-100 dark:border-neutral-700 space-y-1">
                      <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <span>💎</span> 永久0.1折直充
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-tight">
                        官方授权正版直充，648元礼包折后仅6.48元，折上折无门槛
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/90 dark:bg-neutral-800/90 border border-rose-100 dark:border-neutral-700 space-y-1">
                      <div className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <span>👑</span> 送满级VIP特权
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-tight">
                        登录即送满V、百万钻石元宝、千抽招募令与神级专属礼包
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/90 dark:bg-neutral-800/90 border border-rose-100 dark:border-neutral-700 space-y-1">
                      <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span>🚀</span> 千款热门大作
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-tight">
                        涵盖仙侠、回合、三国、卡牌、传奇等爆款变态版与折扣版
                      </p>
                    </div>
                  </div>

                  {/* Download & Command Section */}
                  <div className="p-3.5 rounded-xl bg-white/90 dark:bg-neutral-800/90 border border-rose-100 dark:border-neutral-700 space-y-3 font-mono text-xs sm:text-sm">
                    {/* Quark Link */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-700 gap-2">
                      <div className="flex items-center gap-2 flex-wrap min-w-0">
                        <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-xs font-bold shrink-0">夸克网盘</span>
                        <span className="font-medium text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">极速下载链接：</span>
                        <a 
                          href={resource.driveUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline break-all"
                        >
                          {resource.driveUrl}
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                        <button
                          onClick={() => handleCopyText(resource.driveUrl, 'link')}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                        >
                          {copiedDownloadLink ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedDownloadLink ? '已复制' : '复制链接'}</span>
                        </button>
                        <a
                          href={resource.driveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer"
                        >
                          <span>直达网盘</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Quark Command Code */}
                    {resource.extractCode && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50 gap-2">
                        <div className="flex items-center gap-2 flex-wrap min-w-0">
                          <span className="px-2 py-0.5 rounded bg-amber-600 text-white text-xs font-bold shrink-0">夸克口令</span>
                          <span className="font-mono font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-200 bg-white/80 dark:bg-neutral-800 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                            {resource.extractCode}
                          </span>
                          <span className="text-[11px] text-amber-700 dark:text-amber-400">（打开手机夸克App自动弹出）</span>
                        </div>
                        <button
                          onClick={handleCopyExtractCode}
                          className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded bg-amber-600 hover:bg-amber-700 text-white shadow-2xs transition-colors cursor-pointer shrink-0 self-end sm:self-auto"
                        >
                          {copiedCode ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedCode ? '已复制口令' : '复制口令'}</span>
                        </button>
                      </div>
                    )}

                    {/* Official Website Download Link */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 gap-2">
                      <div className="flex items-center gap-2 flex-wrap min-w-0">
                        <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-xs font-bold shrink-0">官网直达</span>
                        <span className="font-medium text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">官网下载链接：</span>
                        <a 
                          href="https://www.3387.com/cps/app/6a85087b2beb0.html" 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline break-all"
                        >
                          https://www.3387.com/cps/app/6a85087b2beb0.html
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                        <button
                          onClick={() => handleCopyText('https://www.3387.com/cps/app/6a85087b2beb0.html', 'officialGameLink')}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-blue-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                        >
                          {copiedOfficialGameLink ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedOfficialGameLink ? '已复制' : '复制官网'}</span>
                        </button>
                        <a
                          href="https://www.3387.com/cps/app/6a85087b2beb0.html"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
                        >
                          <span>打开官网</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-dashed border-rose-200 dark:border-neutral-700 text-xs sm:text-sm space-y-1">
                      <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                        提示：下载《0.1折手游平台.apk》后在安卓手机安装即可畅玩，绿色安全无广告。
                      </p>
                    </div>
                  </div>
                </div>

              {/* Tags */}
              {resource.tags && resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* STANDARD RESOURCE PRESENTATION */
            <>
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
                    <span className="font-medium text-amber-900 dark:text-amber-200 text-xs">提取码 / 神秘代码：</span>
                    <span className="font-mono text-base font-bold text-amber-700 dark:text-amber-300 tracking-wider bg-white/80 dark:bg-black/30 px-2 py-0.5 rounded">
                      {resource.extractCode}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyExtractCode}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? '已复制' : '复制代码'}</span>
                  </button>
                </div>
              )}

              {/* Baidu Welfare Books Special Acquisition Tutorial */}
              {resource.subCategoryId === 'baidu_welfare' && (
                <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">
                    <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[10px] font-extrabold">
                      入库教程
                    </span>
                    <span>如何永久免费获取此正版图书：</span>
                  </div>
                  <ol className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300 list-decimal list-inside font-medium">
                    <li>点击上方按钮<strong>复制提取码/神秘代码</strong>【{resource.extractCode || ''}】；</li>
                    <li>打开手机<strong>百度网盘APP</strong>，App会自动弹出兑换提示或在顶部搜索框粘贴代码；</li>
                    <li>点击<strong>【加入书架】</strong>，并在书架中打开该书<strong>连续阅读满5分钟</strong>，该正版图书即永久入库属于您！</li>
                  </ol>
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
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onReportIssue(resource)}
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{isWelfareItem ? '福利问题反馈' : '链接失效投诉'}</span>
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleCopyFullShare}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer shadow-2xs"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedAll ? '已复制全部攻略' : (isWelfareItem ? '一键复制福利说明' : '复制整套信息')}</span>
            </button>

            {!isWelfareItem && (
              <a
                href={resource.driveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-900 shadow-sm transition-colors cursor-pointer"
              >
                <span>立即前往网盘转存</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {isWelfareItem && (
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-900 shadow-xs transition-colors cursor-pointer"
              >
                <span>我知道了</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
