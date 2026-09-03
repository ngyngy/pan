import React, { useState } from 'react';
import { X, HelpCircle, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { ResourceRequestForm } from '../types';

interface RequestResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (msg: string) => void;
}

export const RequestResourceModal: React.FC<RequestResourceModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess
}) => {
  const [form, setForm] = useState<ResourceRequestForm>({
    resourceName: '',
    category: '影视资源',
    preferredDrive: '夸克网盘',
    note: '',
    contact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.resourceName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(`已收到您提交的《${form.resourceName}》求资源请求，站长将尽快搜集并更新上线！`);
      onClose();
      setForm({
        resourceName: '',
        category: '影视资源',
        preferredDrive: '夸克网盘',
        note: '',
        contact: ''
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                提交求资源需求
              </h3>
              <p className="text-xs text-neutral-400">
                如果网站尚未收录您需要的资源，可在此提交需求，站长将及时为您补充
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              资源名称 / 关键词 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="例如：《某电视剧》4K版、高一数学必修一讲义、天涯某神贴等"
              value={form.resourceName}
              onChange={(e) => setForm({ ...form, resourceName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                所属分类
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none"
              >
                <option value="影视资源">影视资源 (dy)</option>
                <option value="游戏资源">游戏资源下载 (youxi)</option>
                <option value="天涯神贴">天涯神贴 (tianya)</option>
                <option value="中小学学习资料">中小学学习资料 (xuexi)</option>
                <option value="高晓松专区">高晓松专区 (gxs)</option>
                <option value="比特币/区块链">比特币/区块链 (btczy)</option>
                <option value="UC/网盘综合">UC/网盘综合 (uc)</option>
                <option value="其他资源">其他综合资源</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                期望网盘
              </label>
              <select
                value={form.preferredDrive}
                onChange={(e) => setForm({ ...form, preferredDrive: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none"
              >
                <option value="不限">不限 (优先可用)</option>
                <option value="夸克网盘">夸克网盘</option>
                <option value="百度网盘">百度网盘</option>
                <option value="UC网盘">UC网盘</option>
                <option value="迅雷云盘">迅雷云盘</option>
                <option value="磁力下载">磁力链接</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              补充说明 (可选)
            </label>
            <textarea
              rows={3}
              placeholder="如有特定版本、字幕要求、格式偏好（如4K 60FPS、PDF精校版）请在此说明..."
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              联系邮箱 / QQ / 微信 (可选，资源上线后通知)
            </label>
            <input
              type="text"
              placeholder="选填，方便站长补充后第一时间通知您"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !form.resourceName.trim()}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-900 font-semibold shadow-sm transition-opacity disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? '提交中...' : '立即提交'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
