import React, { useState, useMemo } from 'react';
import {
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Globe,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Calculator,
  Languages,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { ResourceItem } from '../types';

export type SchoolSubjectType = 'all' | 'chinese' | 'math' | 'english' | 'comprehensive';
export type SchoolStageType = 'all' | 'primary' | 'junior' | 'senior';

interface SchoolSubjectHierarchyViewProps {
  resources: ResourceItem[];
  searchQuery: string;
  copiedId: string | null;
  onSelectResource: (resource: ResourceItem) => void;
  onCopyLink: (resource: ResourceItem, e?: React.MouseEvent) => void;
}

interface SubjectDefinition {
  id: 'chinese' | 'math' | 'english' | 'comprehensive';
  name: string;
  code: string;
  icon: React.ReactNode;
  themeColor: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  description: string;
}

const SUBJECT_DEFINITIONS: SubjectDefinition[] = [
  {
    id: 'chinese',
    name: '语文',
    code: 'CHI',
    icon: <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
    themeColor: 'amber',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/80',
    badgeText: 'text-amber-800 dark:text-amber-300',
    borderColor: 'border-amber-200 dark:border-amber-800',
    description: '涵盖小学/初中/高中：文学常识、现代文阅读、文言文精析、满分作文模板与黄保余名师体系'
  },
  {
    id: 'math',
    name: '数学',
    code: 'MAT',
    icon: <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
    themeColor: 'blue',
    badgeBg: 'bg-blue-100 dark:bg-blue-950/80',
    badgeText: 'text-blue-800 dark:text-blue-300',
    borderColor: 'border-blue-200 dark:border-blue-800',
    description: '涵盖小学/初中/高中：学而思奥数思维、计算高手、几何模型、中考压轴与高考导数圆锥曲线'
  },
  {
    id: 'english',
    name: '英语',
    code: 'ENG',
    icon: <Languages className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    themeColor: 'emerald',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/80',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    description: '涵盖小学/初中/高中：自然拼读、名师语法体系、3500核心词汇、完形阅读秒杀与听力真题'
  },
  {
    id: 'comprehensive',
    name: '全科综合 / 升学真题',
    code: 'ALL',
    icon: <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
    themeColor: 'purple',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/80',
    badgeText: 'text-purple-800 dark:text-purple-300',
    borderColor: 'border-purple-200 dark:border-purple-800',
    description: '学而思K12全科通学大合集、53初高中真题卷、一模二模多地模拟卷与名校内部提分笔记'
  }
];

const STAGE_DEFINITIONS: { id: 'primary' | 'junior' | 'senior'; name: string; tag: string; label: string }[] = [
  { id: 'primary', name: '小学', tag: '🎒 1-6年级', label: '小学阶段 (1-6年级)' },
  { id: 'junior', name: '初中', tag: '🏫 7-9年级/中考', label: '初中阶段 (7-9年级/中考)' },
  { id: 'senior', name: '高中', tag: '🎓 高一至高三/高考', label: '高中阶段 (高一至高三/高考)' }
];

/**
 * 智能分类资源归属的科目与学段
 */
export function classifySchoolResource(item: ResourceItem): {
  subjects: ('chinese' | 'math' | 'english' | 'comprehensive')[];
  stages: ('primary' | 'junior' | 'senior')[];
} {
  const text = `${item.title} ${item.categoryName} ${(item.tags || []).join(' ')} ${item.description || ''}`.toLowerCase();

  const subjects: ('chinese' | 'math' | 'english' | 'comprehensive')[] = [];
  const stages: ('primary' | 'junior' | 'senior')[] = [];

  // 科目匹配
  const hasChinese = /语文|作文|古诗|文言文|文学|文坛|阅读|满分作文|古文观止|黄保余|宋北平|现代文|议论文|诗词/.test(text);
  const hasMath = /数学|奥数|速算|计算高手|几何|函数|导数|圆锥曲线|名校学典|题库.*数学|解题大招|压轴题.*数学|最值|考点专题|鹰击长空/.test(text);
  const hasEnglish = /英语|自然拼读|新概念|剑桥|pep|外研|词汇|完形|听力|语法|长难句|unlock|3500/.test(text);
  const isK12AllInOne = /小学初中高中|语数英|小初高|全科|九科|全科目|冲刺营|通学包|名校课堂|会考|一模二模|必刷题 全年级|初中资源总库|学霸资料|中考真题|高考真题|历年真题|试卷合集/.test(text);

  if (hasChinese) subjects.push('chinese');
  if (hasMath) subjects.push('math');
  if (hasEnglish) subjects.push('english');
  if (isK12AllInOne || subjects.length === 0) {
    subjects.push('comprehensive');
  }

  // 学段匹配
  const hasPrimary = /小学|1-6年级|六年级|一至六年级|小升初|少儿|幼小/.test(text);
  const hasJunior = /初中|中考|7-9年级|初一|初二|初三|七年级|八年级|九年级|8年级|53系列|万唯/.test(text);
  const hasSenior = /高中|高考|高一|高二|高三|10-12年级|高分作文模板|文言文120|导数|圆锥曲线|3500/.test(text);

  if (hasPrimary) stages.push('primary');
  if (hasJunior) stages.push('junior');
  if (hasSenior) stages.push('senior');

  // 如果是小初高大合集或涵盖全年级
  if (/小初高|小学初中高中|k12|通学包|全国各地/.test(text)) {
    if (!stages.includes('primary')) stages.push('primary');
    if (!stages.includes('junior')) stages.push('junior');
    if (!stages.includes('senior')) stages.push('senior');
  }

  // 兜底
  if (stages.length === 0) {
    if (/中考/.test(text)) stages.push('junior');
    else if (/高考/.test(text)) stages.push('senior');
    else stages.push('primary');
  }

  return { subjects, stages };
}

export const SchoolSubjectHierarchyView: React.FC<SchoolSubjectHierarchyViewProps> = ({
  resources,
  searchQuery,
  copiedId,
  onSelectResource,
  onCopyLink
}) => {
  // 选中的快捷科目与学段 Pills
  const [selectedSubject, setSelectedSubject] = useState<SchoolSubjectType>('all');
  const [selectedStage, setSelectedStage] = useState<SchoolStageType>('all');

  // 控制科目与学段的展开折叠状态（默认全部收起）
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({});
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({});

  const handleToggleExpandAll = (expand: boolean) => {
    const newSubjects: Record<string, boolean> = {};
    const newStages: Record<string, boolean> = {};
    SUBJECT_DEFINITIONS.forEach((subj) => {
      newSubjects[subj.id] = expand;
      STAGE_DEFINITIONS.forEach((stg) => {
        newStages[`${subj.id}_${stg.id}`] = expand;
      });
    });
    setExpandedSubjects(newSubjects);
    setExpandedStages(newStages);
  };

  const toggleSubject = (subId: string) => {
    setExpandedSubjects((prev) => ({ ...prev, [subId]: !prev[subId] }));
  };

  const toggleStage = (stageKey: string) => {
    setExpandedStages((prev) => ({ ...prev, [stageKey]: !prev[stageKey] }));
  };

  // 高亮搜索文本
  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 dark:bg-yellow-900/80 text-blue-700 dark:text-blue-300 px-0.5 rounded font-bold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // 网盘类型 Badge
  const getDriveBadge = (driveType: string, driveName: string) => {
    switch (driveType) {
      case 'quark':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 shrink-0">
            夸克
          </span>
        );
      case 'baidu':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 shrink-0">
            百度
          </span>
        );
      case 'uc':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 shrink-0">
            UC
          </span>
        );
      case 'yidong':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30 shrink-0">
            移动云盘
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
            {driveName}
          </span>
        );
    }
  };

  // 资源分类映射字典: subject -> stage -> items
  const { categorizedData, subjectTotals, stageTotals } = useMemo(() => {
    const data: Record<string, Record<string, ResourceItem[]>> = {
      chinese: { primary: [], junior: [], senior: [] },
      math: { primary: [], junior: [], senior: [] },
      english: { primary: [], junior: [], senior: [] },
      comprehensive: { primary: [], junior: [], senior: [] }
    };

    const subCounts: Record<string, number> = { chinese: 0, math: 0, english: 0, comprehensive: 0 };
    const stgCounts: Record<string, number> = { primary: 0, junior: 0, senior: 0 };

    resources.forEach((r) => {
      const { subjects, stages } = classifySchoolResource(r);

      subjects.forEach((subj) => {
        subCounts[subj] = (subCounts[subj] || 0) + 1;
        stages.forEach((stg) => {
          if (data[subj] && data[subj][stg]) {
            data[subj][stg].push(r);
          }
        });
      });

      stages.forEach((stg) => {
        stgCounts[stg] = (stgCounts[stg] || 0) + 1;
      });
    });

    return { categorizedData: data, subjectTotals: subCounts, stageTotals: stgCounts };
  }, [resources]);

  return (
    <div className="space-y-4 pt-1">
      {/* 1. 科目与学段快速切换过滤栏 */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-blue-50/50 dark:from-emerald-950/20 dark:via-neutral-900 dark:to-blue-950/20 border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xs space-y-3">
        {/* Row 1: 科目选择 (语文 / 数学 / 英语 / 全科综合) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-neutral-700 dark:text-neutral-300 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>选择科目：</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedSubject('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSubject === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs scale-102'
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-emerald-50 dark:hover:bg-neutral-750 border border-neutral-200 dark:border-neutral-700'
              }`}
            >
              全部科目 ({resources.length})
            </button>

            {SUBJECT_DEFINITIONS.map((subj) => {
              const count = subjectTotals[subj.id] || 0;
              const isSelected = selectedSubject === subj.id;

              return (
                <button
                  key={`filter-sub-${subj.id}`}
                  onClick={() => setSelectedSubject(subj.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs scale-102'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-emerald-50 dark:hover:bg-neutral-750 border border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  {subj.icon}
                  <span>{subj.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-emerald-700/80 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: 学段选择 (小学 / 初中 / 高中) + 全部展开/收起快捷按钮 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-emerald-100/80 dark:border-neutral-800">
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-neutral-700 dark:text-neutral-300 shrink-0 mr-1">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>选择学段：</span>
            </div>

            <button
              onClick={() => setSelectedStage('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedStage === 'all'
                  ? 'bg-blue-600 text-white shadow-xs scale-102'
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-blue-50 dark:hover:bg-neutral-750 border border-neutral-200 dark:border-neutral-700'
              }`}
            >
              全部学段
            </button>

            {STAGE_DEFINITIONS.map((stg) => {
              const count = stageTotals[stg.id] || 0;
              const isSelected = selectedStage === stg.id;

              return (
                <button
                  key={`filter-stage-${stg.id}`}
                  onClick={() => setSelectedStage(stg.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs scale-102'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-blue-50 dark:hover:bg-neutral-750 border border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  <span>{stg.tag}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-blue-700/80 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 全部展开 / 全部收起 快捷控制 */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
            <button
              onClick={() => handleToggleExpandAll(true)}
              className="px-2 py-0.5 text-[11px] font-bold rounded-lg bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 transition-colors shadow-2xs cursor-pointer"
            >
              全部展开
            </button>
            <button
              onClick={() => handleToggleExpandAll(false)}
              className="px-2 py-0.5 text-[11px] font-bold rounded-lg bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 transition-colors shadow-2xs cursor-pointer"
            >
              全部收起
            </button>
          </div>
        </div>
      </div>

      {/* 2. 科目与学段层级目录树 (语文、数学、英语、全科综合) */}
      <div className="space-y-3.5">
        {SUBJECT_DEFINITIONS.filter((subj) => selectedSubject === 'all' || selectedSubject === subj.id).map((subj) => {
          const isSubjExpanded = expandedSubjects[subj.id] ?? false;
          const subjectItemsCount = subjectTotals[subj.id] || 0;

          return (
            <div
              key={`subj-card-${subj.id}`}
              className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 shadow-2xs overflow-hidden"
            >
              {/* 科目主卡片标题栏 */}
              <div
                onClick={() => toggleSubject(subj.id)}
                className="flex items-center justify-between p-3 sm:p-3.5 bg-neutral-50/70 dark:bg-neutral-800/40 hover:bg-emerald-50/50 dark:hover:bg-neutral-800/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 flex items-center justify-center shadow-2xs shrink-0">
                    {subj.icon}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
                        {subj.name}
                      </span>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                        {subjectItemsCount} 个资源
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate hidden sm:block">
                      {subj.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-neutral-400 hover:text-emerald-600 transition-colors">
                    {isSubjExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* 科目内部：展开呈现 小学 / 初中 / 高中 三大学段子目录 */}
              {isSubjExpanded && (
                <div className="p-3 sm:p-4 space-y-3 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
                  {STAGE_DEFINITIONS.filter((stg) => selectedStage === 'all' || selectedStage === stg.id).map((stg) => {
                    const stageKey = `${subj.id}_${stg.id}`;
                    const isStageExpanded = expandedStages[stageKey] ?? false;
                    const items = categorizedData[subj.id]?.[stg.id] || [];

                    return (
                      <div
                        key={`stage-card-${stageKey}`}
                        className="rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-850/40 overflow-hidden"
                      >
                        {/* 学段标题栏 */}
                        <div
                          onClick={() => toggleStage(stageKey)}
                          className="flex items-center justify-between p-2.5 sm:p-3 bg-neutral-100/50 dark:bg-neutral-800/50 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/90 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            {isStageExpanded ? (
                              <FolderOpen className="w-4 h-4 text-amber-500 shrink-0" />
                            ) : (
                              <Folder className="w-4 h-4 text-amber-500 shrink-0" />
                            )}
                            <span className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
                              {stg.name}{subj.name}
                            </span>
                            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                              ({stg.tag})
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[11px] font-mono font-medium px-2 py-0.2 rounded-full bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                              {items.length} 项
                            </span>
                            <div className="text-neutral-400">
                              {isStageExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </div>
                          </div>
                        </div>

                        {/* 学段具体资源列表 */}
                        {isStageExpanded && (
                          <div className="p-2 sm:p-3 space-y-2 border-t border-neutral-200/50 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                            {items.length === 0 ? (
                              <div className="py-4 text-center text-xs text-neutral-400 italic">
                                当前学段暂无对应单科资源，可查看其他科目或全科综合
                              </div>
                            ) : (
                              items.map((item, idx) => {
                                const rankMedal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '🔹';

                                return (
                                  <div
                                    key={`school-item-${item.id}`}
                                    onClick={() => onSelectResource(item)}
                                    className="group/item flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-3 rounded-xl bg-neutral-50/80 dark:bg-neutral-800/50 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40 border border-neutral-200/60 dark:border-neutral-800 hover:border-emerald-400 dark:hover:border-emerald-700 transition-all cursor-pointer gap-2"
                                  >
                                    {/* Left: Rank + Drive + Title */}
                                    <div className="flex items-center gap-2 min-w-0 flex-1">
                                      <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-700 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                                        <Globe className="w-3.5 h-3.5" />
                                      </div>

                                      <span className="text-xs shrink-0">{rankMedal}</span>

                                      {getDriveBadge(item.driveType, item.driveName)}

                                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover/item:text-emerald-700 dark:group-hover/item:text-emerald-300 truncate leading-tight">
                                        {renderHighlightedText(item.title, searchQuery)}
                                      </h4>

                                      {item.isFeatured && (
                                        <span className="hidden sm:inline-flex text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shrink-0">
                                          🔥 精选
                                        </span>
                                      )}
                                      {item.isCollection && (
                                        <span className="hidden md:inline-flex text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 shrink-0">
                                          全套
                                        </span>
                                      )}
                                    </div>

                                    {/* Right: Size + Extract Code + Copy & Jump */}
                                    <div className="flex items-center justify-end gap-2 shrink-0 pt-1 sm:pt-0">
                                      {item.size && (
                                        <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                                          {item.size}
                                        </span>
                                      )}

                                      {item.extractCode ? (
                                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-mono font-bold shrink-0">
                                          码: {item.extractCode}
                                        </span>
                                      ) : (
                                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 shrink-0">
                                          免密
                                        </span>
                                      )}

                                      {/* Copy Link button */}
                                      <button
                                        onClick={(e) => onCopyLink(item, e)}
                                        title="复制网盘链接与提取码"
                                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-600 transition-colors shadow-2xs cursor-pointer active:scale-95"
                                      >
                                        {copiedId === item.id ? (
                                          <>
                                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">已复制</span>
                                          </>
                                        ) : (
                                          <>
                                            <Copy className="w-3 h-3" />
                                            <span>复制</span>
                                          </>
                                        )}
                                      </button>

                                      {/* Direct Jump button */}
                                      <a
                                        href={item.driveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        title="直接在新窗口打开网盘"
                                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors shrink-0 active:scale-95"
                                      >
                                        <span>直达</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
