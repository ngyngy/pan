import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, AlertTriangle, Send } from 'lucide-react';
import { ResourceItem, FeedbackForm } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetResource?: ResourceItem | null;
  onSubmitSuccess: (msg: string) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  targetResource,
  onSubmitSuccess
}) => {
  const [form, setForm] = useState<FeedbackForm>({
    feedbackType: 'link_invalid',
    comment: '',
    contact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (targetResource) {
      setForm((prev) => ({
        ...prev,
        resourceId: targetResource.id,
        resourceTitle: targetResource.title,
        feedbackType: 'link_invalid'
      }));
    }
  }, [targetResource]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess('感谢您的反馈与监督！站长已收到信息，将在24小时内核实并修复补链。');
      onClose();
      setForm({
        feedbackType: 'link_invalid',
        comment: '',
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
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                失效反馈 / 投诉举报
              </h3>
              <p className="text-xs text-neutral-400">
                遇到链接失效、密码错误或违规内容，请及时向站长反馈
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
          {targetResource && (
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <div className="text-neutral-400 text-[11px] mb-0.5">目标反馈资源：</div>
              <div className="font-medium text-neutral-800 dark:text-neutral-200 line-clamp-1">
                {targetResource.title}
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              反馈问题类型 <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'link_invalid', label: '网盘链接失效 / 已被和谐' },
                { key: 'need_code', label: '提取码错误 / 缺失提取码' },
                { key: 'wrong_content', label: '资源内容与标题不符' },
                { key: 'other', label: '侵权投诉 / 其他建议' }
              ].map((t) => (
                <button
                  type="button"
                  key={t.key}
                  onClick={() => setForm({ ...form, feedbackType: t.key as any })}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    form.feedbackType === t.key
                      ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 font-medium shadow-sm'
                      : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              详细情况说明 (可选)
            </label>
            <textarea
              rows={3}
              placeholder="例如：夸克链接打开提示'文件已被删除'，请站长重新补档..."
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              联系方式 (选填，处理完毕后告知您)
            </label>
            <input
              type="text"
              placeholder="邮箱 / QQ"
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
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-sm transition-opacity disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? '提交中...' : '提交反馈'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
