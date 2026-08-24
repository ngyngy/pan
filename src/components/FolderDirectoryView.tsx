import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink, 
  Search, 
  Layers, 
  Flame, 
  Download, 
  Eye, 
  Film, 
  GraduationCap, 
  Cpu, 
  BookOpen, 
  Gamepad2, 
  Music,
  Info,
  Award,
  Globe,
  FolderOpen,
  FolderClosed,
  X,
  Sparkles,
  ArrowRight,
  Filter,
  ListFilter,
  LayoutGrid
} from 'lucide-react';
import { ResourceItem, MainFolderCategoryKey, DriveType } from '../types';
import { MAIN_FOLDERS } from '../data/categories';

interface FolderDirectoryViewProps {
  resources: ResourceItem[];
  onSelectResource: (resource: ResourceItem) => void;
  onCopyLink: (resource: ResourceItem, e?: React.MouseEvent) => void;
  copiedId: string | null;
  activeMainFolder: MainFolderCategoryKey | null;
  activeSubFolder: string | null;
  onNavigateFolder: (mainKey: MainFolderCategoryKey | null, subId: string | null) => void;
  selectedDrive: DriveType;
  onSelectDrive: (drive: DriveType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const DRIVE_OPTIONS: { id: DriveType; label: string; color: string }[] = [
  { id: 'all', label: '全部网盘', color: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300' },
  { id: 'quark', label: '夸克网盘', color: 'bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border-amber-300' },
  { id: 'baidu', label: '百度网盘', color: 'bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border-blue-300' },
  { id: 'aliyun', label: '阿里云盘', color: 'bg-orange-50 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 border-orange-300' },
  { id: 'xunlei', label: '迅雷云盘', color: 'bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 border-sky-300' },
  { id: 'uc', label: 'UC网盘', color: 'bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border-rose-300' },
];

const SUGGESTED_SEARCHES = [
  '云游戏',
  '特别福利',
  '周星驰',
  '天涯神贴',
  '4K电影',
  '高晓松',
  '得到App',
  '短剧',
  '比特币',
  '雅思',
  'B站付费课',
  '无损音乐'
];

export const FolderDirectoryView: React.FC<FolderDirectoryViewProps> = ({
  resources,
  onSelectResource,
  onCopyLink,
  copiedId,
  selectedDrive,
  onSelectDrive,
  searchQuery,
  onSearchChange
}) => {
  // Local state: which main folder is expanded (00 特别福利 默认展开)
  const [expandedMains, setExpandedMains] = useState<Record<string, boolean>>({
    welfare: true
  });

  // Local state: which subfolder is expanded in-place to show resources (免费获得7小时云游戏 默认展开)
  const [expandedSubs, setExpandedSubs] = useState<Record<string, boolean>>({
    welfare_cloud_game_welfare: true
  });

  // View mode when search is active: 'direct' (flat direct results) or 'tree' (tree with auto-expanded matches)
  const [searchViewMode, setSearchViewMode] = useState<'direct' | 'tree'>('direct');

  const isSearchActive = searchQuery.trim().length > 0;

  // Compute all matching resources flat list for direct search display
  const flatSearchResults = useMemo(() => {
    return resources.filter((r) => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = r.title.toLowerCase().includes(q);
        const matchTags = r.tags.some((t) => t.toLowerCase().includes(q));
        const matchDesc = r.description?.toLowerCase().includes(q) || false;
        const matchDrive = r.driveName.toLowerCase().includes(q);
        if (!matchTitle && !matchTags && !matchDesc && !matchDrive) return false;
      }

      // 2. Drive Filter
      if (selectedDrive !== 'all' && r.driveType !== selectedDrive) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      if (a.isPinned && b.isPinned) return (a.pinOrder || 0) - (b.pinOrder || 0);
      return (b.views || 0) - (a.views || 0);
    });
  }, [resources, searchQuery, selectedDrive]);

  // Map resources by main category
  const resourcesByMainCategory = useMemo(() => {
    const map: Record<string, ResourceItem[]> = {};
    MAIN_FOLDERS.forEach((m) => {
      map[m.id] = [];
    });

    flatSearchResults.forEach((r) => {
      let matchedMain = r.mainCategoryId;
      if (!matchedMain) {
        if (r.isWelfare || r.tags.some(t => /福利|云游戏|酷卡云|兑换码/.test(t))) {
          matchedMain = 'welfare';
        } else if (r.subsiteId === 'dy' || r.tags.some(t => /影视|电视剧|美剧|HBO|Netflix|短剧|电影|4K|动漫|兽夫|广播剧|裙下臣/.test(t))) {
          matchedMain = 'video';
        } else if (r.subsiteId === 'xuexi' || r.tags.some(t => /英语|初中|小学|高中|试卷|题库|网课|刷题|学霸|会考/.test(t))) {
          matchedMain = 'education';
        } else if (r.subsiteId === 'gxs') {
          matchedMain = 'video';
        } else if (r.tags.some(t => /音乐|无损|CD|歌曲/.test(t))) {
          matchedMain = 'music';
        } else if (r.subsiteId === 'btczy' || r.tags.some(t => /比特币|区块链|中本聪|ahr999|九神|币安|Bitcoin|Broken Money|精通比特币/i.test(t))) {
          matchedMain = 'crypto';
        } else {
          matchedMain = 'books';
        }
      }

      if (map[matchedMain]) {
        map[matchedMain].push(r);
      }
    });

    return map;
  }, [flatSearchResults]);

  // Map resources by sub-category for tree view
  const resourcesBySubFolder = useMemo(() => {
    const map: Record<string, ResourceItem[]> = {};

    MAIN_FOLDERS.forEach((m) => {
      m.subFolders.forEach((s) => {
        const key = `${m.id}_${s.id}`;
        map[key] = [];
      });
    });

    flatSearchResults.forEach((r) => {
      let matchedMain = r.mainCategoryId;
      let matchedSub = r.subCategoryId;

      if (!matchedMain) {
        if (r.isWelfare || r.tags.some(t => /福利|云游戏|酷卡云|兑换码/.test(t))) {
          matchedMain = 'welfare';
          matchedSub = 'cloud_game_welfare';
        } else if (r.subsiteId === 'dy' || r.tags.some(t => /影视|电视剧|美剧|HBO|Netflix|短剧|电影|4K|动漫|兽夫|广播剧|裙下臣/.test(t))) {
          matchedMain = 'video';
          if (r.tags.some(t => /美剧|HBO|Netflix|绝命毒师|权力的游戏|黄石|老友记|生活大爆炸|怪奇物语|行尸走肉|越狱/.test(t)) || /美剧|HBO|Netflix|Breaking Bad|Game of Thrones|Yellowstone|Friends/.test(r.title)) {
            matchedSub = 'us_drama';
          } else if (r.tags.some(t => /短剧|兽夫|裙下臣/.test(t)) || r.title.includes('短剧')) {
            matchedSub = 'short_drama';
          } else if (r.tags.some(t => /动漫|修仙|大王饶命/.test(t))) {
            matchedSub = 'anime';
          } else if (r.tags.some(t => /电视剧|韩剧|日剧|热播剧|全集|御瑶庭|猎虎|执政者|鬼谜东宫/.test(t)) || r.title.includes('剧')) {
            matchedSub = 'tv';
          } else if (r.tags.some(t => /电影|流浪地球|4K/.test(t))) {
            matchedSub = 'movie';
          } else {
            matchedSub = 'variety_doc';
          }
        } else if (r.subsiteId === 'xuexi' || r.tags.some(t => /英语|初中|小学|高中|试卷|题库|网课|刷题|学霸|会考/.test(t))) {
          matchedMain = 'education';
          matchedSub = 'school';
        } else if (r.subsiteId === 'gxs') {
          matchedMain = 'video';
          matchedSub = 'variety_doc';
        } else if (r.subsiteId === 'tianya' || r.subsiteId === 'btczy') {
          matchedMain = 'books';
          if (r.tags.some(t => /金庸|古龙|聊斋|武侠/.test(t))) matchedSub = 'novels';
          else matchedSub = 'ebooks';
        } else if (r.tags.some(t => /音乐|无损|CD|歌曲/.test(t))) {
          matchedMain = 'music';
          matchedSub = 'lossless';
        } else if (r.subsiteId === 'btczy' || r.tags.some(t => /比特币|区块链|中本聪|ahr999|九神|币安|Bitcoin|Broken Money|精通比特币/i.test(t))) {
          matchedMain = 'crypto';
          if (r.tags.some(t => /工具|脚本|量化|助手|下载库/.test(t))) matchedSub = 'btc_tools';
          else if (r.tags.some(t => /Broken Money|货币未来|Mastering Bitcoin|Genesis Book|精通比特币|原版/i.test(t))) matchedSub = 'btc_theory';
          else matchedSub = 'btc_books';
        } else {
          matchedMain = 'books';
          matchedSub = 'ebooks';
        }
      }

      const compositeKey = `${matchedMain}_${matchedSub}`;
      if (map[compositeKey]) {
        map[compositeKey].push(r);
      } else {
        const firstSub = MAIN_FOLDERS.find(m => m.id === matchedMain)?.subFolders[0]?.id;
        if (firstSub && map[`${matchedMain}_${firstSub}`]) {
          map[`${matchedMain}_${firstSub}`].push(r);
        }
      }
    });

    return map;
  }, [flatSearchResults]);

  // When search query is entered, auto-expand categories that contain results in tree mode
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const autoMains: Record<string, boolean> = {};
      const autoSubs: Record<string, boolean> = {};
      
      MAIN_FOLDERS.forEach((m) => {
        let hasInMain = (resourcesByMainCategory[m.id] || []).length > 0;
        m.subFolders.forEach((s) => {
          const key = `${m.id}_${s.id}`;
          const count = (resourcesBySubFolder[key] || []).length;
          if (count > 0) {
            hasInMain = true;
            autoSubs[key] = true;
          }
        });
        if (hasInMain) {
          autoMains[m.id] = true;
        }
      });

      setExpandedMains(autoMains);
      setExpandedSubs(autoSubs);
      setSearchViewMode('direct'); // Default to direct view for search
    }
  }, [searchQuery, resourcesBySubFolder, resourcesByMainCategory]);

  // Counts for main categories
  const mainCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MAIN_FOLDERS.forEach((m) => {
      counts[m.id] = (resourcesByMainCategory[m.id] || []).length;
    });
    return counts;
  }, [resourcesByMainCategory]);

  const toggleMain = (mainId: string) => {
    setExpandedMains((prev) => ({ ...prev, [mainId]: !prev[mainId] }));
  };

  const toggleSub = (subKey: string) => {
    setExpandedSubs((prev) => ({ ...prev, [subKey]: !prev[subKey] }));
  };

  const handleExpandAll = (expand: boolean) => {
    const newMains: Record<string, boolean> = {};
    const newSubs: Record<string, boolean> = {};
    MAIN_FOLDERS.forEach((m) => {
      newMains[m.id] = expand;
      m.subFolders.forEach((s) => {
        newSubs[`${m.id}_${s.id}`] = expand;
      });
    });
    setExpandedMains(newMains);
    setExpandedSubs(newSubs);
  };

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
      case 'xunlei':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30 shrink-0">
            迅雷
          </span>
        );
      case 'aliyun':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30 shrink-0">
            阿里
          </span>
        );
      case 'official':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/40 shrink-0">
            🎁 官方直链
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

  // Highlight search text helper
  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 dark:bg-yellow-800/80 text-neutral-900 dark:text-yellow-100 rounded-xs px-0.5 font-bold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* 1. Header Toolbar / Search Results Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        {/* Title / Search State Indicator */}
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${isSearchActive ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'} shadow-2xs`}>
            {isSearchActive ? <Search className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex flex-wrap items-center gap-2">
              {isSearchActive ? (
                <>
                  <span>搜索结果直达</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 font-bold">
                    匹配到 “{searchQuery}” 关键词
                  </span>
                </>
              ) : (
                <>
                  <span>八大分类资源目录树</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80 font-semibold">
                    单列树形展开 · 实时在本页打开
                  </span>
                </>
              )}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isSearchActive 
                ? `共匹配到 ${flatSearchResults.length} 条网盘资源，已为您直接平铺展开展示` 
                : '1000T海量优质资源聚合，点击文件夹即可直接在本页浏览与转存'}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto flex-wrap">
          {isSearchActive ? (
            <>
              {/* View Switcher during search */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setSearchViewMode('direct')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    searchViewMode === 'direct'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="直接平铺展示所有匹配内容"
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  <span>直接展示 ({flatSearchResults.length})</span>
                </button>
                <button
                  onClick={() => setSearchViewMode('tree')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    searchViewMode === 'tree'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="在分类目录树中查看位置"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>目录树视图</span>
                </button>
              </div>

              {/* Clear Search button */}
              <button
                onClick={() => onSearchChange('')}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
                title="清空搜索回到全部分类"
              >
                <X className="w-3.5 h-3.5" />
                <span>清除搜索</span>
              </button>
            </>
          ) : (
            <>
              {/* Prominent Large Expand/Collapse All Buttons */}
              <button
                onClick={() => handleExpandAll(true)}
                id="btn-expand-all-tree"
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-sm sm:text-base font-bold shadow-xs hover:shadow-md hover:shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
              >
                <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-100" />
                <span>全部展开</span>
              </button>
              <button
                onClick={() => handleExpandAll(false)}
                id="btn-collapse-all-tree"
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 text-sm sm:text-base font-bold border border-slate-300/80 dark:border-slate-700 shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <FolderClosed className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 dark:text-slate-400" />
                <span>全部收起</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* 2. DIRECT SEARCH RESULTS VIEW (用户搜索时直接展示所有匹配结果，不用逐层翻找文件夹) */}
      {isSearchActive && searchViewMode === 'direct' ? (
        <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-sm p-4 sm:p-6 space-y-4">
          
          {/* Top summary row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                搜索关键字：<mark className="bg-yellow-200 dark:bg-yellow-900/80 px-2 py-0.5 rounded font-mono font-bold text-blue-700 dark:text-blue-300">{searchQuery}</mark>
              </span>
              <span className="text-xs text-neutral-500">
                (已找到 <strong className="text-blue-600 dark:text-blue-400 font-bold">{flatSearchResults.length}</strong> 条直接可用资源)
              </span>
            </div>

            {/* Quick Drive filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-neutral-400 shrink-0">筛选网盘:</span>
              {DRIVE_OPTIONS.map((d) => (
                <button
                  key={`search-drive-${d.id}`}
                  onClick={() => onSelectDrive(d.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    selectedDrive === d.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          {flatSearchResults.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 mx-auto flex items-center justify-center text-neutral-400">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-200">
                  未找到与 “{searchQuery}” 相关的网盘资源
                </h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  建议缩短关键词（如输入“周星驰”、“4K”、“美剧”或“得到”）重试，或尝试下方热门推荐热词：
                </p>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 max-w-lg mx-auto">
                {SUGGESTED_SEARCHES.map((kw) => (
                  <button
                    key={`sug-${kw}`}
                    onClick={() => onSearchChange(kw)}
                    className="px-3 py-1 text-xs font-medium rounded-lg bg-neutral-100 hover:bg-blue-50 dark:bg-neutral-800 dark:hover:bg-blue-950/60 text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 border border-neutral-200 dark:border-neutral-700 transition-colors cursor-pointer"
                  >
                    #{kw}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSearchChange('')}
                  className="px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  清空搜索条件并返回全部分类
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {flatSearchResults.map((item, idx) => {
                const rankMedal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;
                
                return (
                  <div
                    key={`search-res-${item.id}`}
                    onClick={() => onSelectResource(item)}
                    className="group relative flex flex-col p-3.5 sm:p-4 rounded-xl bg-neutral-50/90 dark:bg-neutral-800/60 hover:bg-blue-50/60 dark:hover:bg-blue-950/30 border border-neutral-200/80 dark:border-neutral-700/80 hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer shadow-2xs gap-2.5"
                  >
                    {/* Top row: Badges, Title and Fast Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1 flex-wrap">
                        {/* Index / Medal */}
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-200/80 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 shrink-0">
                          {rankMedal}
                        </span>

                        {/* Drive Badge */}
                        {getDriveBadge(item.driveType, item.driveName)}

                        {/* Title with search highlight */}
                        <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                          {renderHighlightedText(item.title, searchQuery)}
                        </h3>

                        {/* Pinned or Featured Tag */}
                        {item.isPinned && (
                          <span className="inline-flex items-center text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-red-600 text-white shadow-xs shrink-0">
                            📌 置顶
                          </span>
                        )}
                        {item.isFeatured && !item.isPinned && (
                          <span className="inline-flex text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shrink-0">
                            🔥 推荐
                          </span>
                        )}
                        {item.isCollection && (
                          <span className="inline-flex text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 shrink-0">
                            典藏合集
                          </span>
                        )}
                      </div>

                      {/* Right Action buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        {item.isWelfare || item.mainCategoryId === 'welfare' ? (
                          <>
                            <button
                              onClick={(e) => onCopyLink(item, e)}
                              title="一键复制福利介绍与兑换说明"
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-600 transition-colors shadow-2xs cursor-pointer active:scale-95"
                            >
                              {copiedId === item.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  <span className="text-emerald-600 dark:text-emerald-400">已复制说明</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>复制说明</span>
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectResource(item);
                              }}
                              className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors shrink-0 active:scale-95 cursor-pointer"
                            >
                              <span>查看介绍</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <>
                            {/* Extract Code if any */}
                            {item.extractCode ? (
                              <span className="text-xs px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-mono font-bold shrink-0 border border-amber-300/80">
                                提取码: {item.extractCode}
                              </span>
                            ) : (
                              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium shrink-0">
                                免密提取
                              </span>
                            )}

                            {/* Copy Link Button */}
                            <button
                              onClick={(e) => onCopyLink(item, e)}
                              title="复制网盘链接与提取码"
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-600 transition-colors shadow-2xs cursor-pointer active:scale-95"
                            >
                              {copiedId === item.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  <span className="text-emerald-600 dark:text-emerald-400">已复制</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>复制链接</span>
                                </>
                              )}
                            </button>

                            {/* Direct Jump to Pan */}
                            <a
                              href={item.driveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              title="直接在新窗口打开网盘页面"
                              className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors shrink-0 active:scale-95"
                            >
                              <span>直达网盘</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Bottom row: Description details & category tags */}
                    {item.description && (
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                        {renderHighlightedText(item.description, searchQuery)}
                      </p>
                    )}

                    {/* Meta info tags */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-neutral-500 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-800/80">
                      {!item.isWelfare && item.mainCategoryId !== 'welfare' && item.size && (
                        <span className="font-mono font-medium text-neutral-700 dark:text-neutral-300">
                          📦 大小: {item.size}
                        </span>
                      )}
                      {item.quality && (
                        <span className="text-neutral-600 dark:text-neutral-400">
                          🎬 规格: {item.quality}
                        </span>
                      )}
                      {item.publishDate && (
                        <span className="text-neutral-400">
                          ⏱️ 更新: {item.publishDate}
                        </span>
                      )}
                      {item.categoryName && (
                        <span className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.2 rounded border border-blue-200/60 dark:border-blue-900/60">
                          🏷️ {item.categoryName}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* 3. Single Column Tree Directory Structure (目录树视图) */
        <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-sm p-4 sm:p-6 space-y-6">
          {MAIN_FOLDERS.map((main) => {
            const isMainExpanded = expandedMains[main.id];
            const totalMainResources = mainCounts[main.id] || 0;

            // If in search mode, only render categories that have matching items
            if (isSearchActive && totalMainResources === 0) {
              return null;
            }

            return (
              <div key={main.id} className="relative select-none">
                {/* Level 1: Main Category Golden Folder */}
                <div
                  onClick={() => toggleMain(main.id)}
                  className="group flex items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-emerald-50/70 dark:hover:bg-neutral-800/80 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Golden Main Folder Icon */}
                    <svg className="w-8 h-8 shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 48 48" fill="none">
                      <path d="M4 10C4 7.79086 5.79086 6 8 6H18.5858C19.6466 6 20.664 6.42143 21.4142 7.17157L24.8284 10.5858C25.5786 11.3359 26.596 11.7574 27.6569 11.7574H40C42.2091 11.7574 44 13.5482 44 15.7574V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V10Z" fill="#FBBF24" />
                      <path d="M4 17C4 14.7909 5.79086 13 8 13H40C42.2091 13 44 14.7909 44 17V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V17Z" fill="#F59E0B" />
                      <path d="M6 18C6 16.3431 7.34315 15 9 15H39C40.6569 15 42 16.3431 42 18V37C42 39.2091 40.2091 41 38 41H10C7.79086 41 6 39.2091 6 37V18Z" fill="#FDE047" opacity="0.35" />
                    </svg>

                    <div className="flex items-baseline gap-2 min-w-0">
                      <span className={`font-extrabold font-mono text-lg sm:text-xl ${main.id === 'welfare' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                        {main.num}
                      </span>
                      <h3 className={`text-base sm:text-xl font-extrabold ${main.id === 'welfare' ? 'text-rose-700 dark:text-rose-400 group-hover:text-rose-600' : 'text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-600'} tracking-tight truncate flex items-center gap-2`}>
                        {main.name}
                        {main.id === 'welfare' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white shadow-xs animate-pulse">
                            🎁 限时必领
                          </span>
                        )}
                        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300 hidden sm:inline">
                          （{main.titleName}）
                        </span>
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      共 {totalMainResources} 项
                    </span>
                    <div className="p-1 rounded-md text-neutral-400 group-hover:text-emerald-600">
                      {isMainExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Level 2: Link Mode Items for Categories without Sub-folders (e.g. 00 特别福利) */}
                {isMainExpanded && main.subFolders.length === 0 && (
                  <div className="relative ml-4 sm:ml-6 pl-4 sm:pl-6 border-l-2 border-rose-300 dark:border-rose-700/80 space-y-2.5 my-2.5">
                    {(resourcesByMainCategory[main.id] || []).length === 0 ? (
                      <div className="p-3 text-xs text-neutral-400 italic">
                        暂无特别福利
                      </div>
                    ) : (
                      (resourcesByMainCategory[main.id] || []).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => onSelectResource(item)}
                          className="group/welfare flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-3.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 hover:bg-rose-100/90 dark:hover:bg-rose-900/50 border border-rose-200/90 dark:border-rose-800/80 hover:border-rose-400 dark:hover:border-rose-600 transition-all cursor-pointer gap-2.5 shadow-2xs"
                        >
                          {/* Left: Gift icon + Title + tags */}
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 text-white flex items-center justify-center text-sm shadow-xs shrink-0 font-bold">
                              🎁
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover/welfare:text-rose-600 dark:group-hover/welfare:text-rose-400 transition-colors">
                                  {renderHighlightedText(item.title, searchQuery)}
                                </h4>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-extrabold bg-rose-600 text-white shadow-2xs">
                                  特别福利
                                </span>
                                {item.quality && (
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                                    {item.quality}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                                {item.description ? item.description.split('\n')[0] : '点击查看专属福利介绍与领取攻略'}
                              </p>
                            </div>
                          </div>

                          {/* Right: Button "查看介绍" */}
                          <div className="flex items-center justify-end gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectResource(item);
                              }}
                              className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors cursor-pointer active:scale-95"
                            >
                              <span>查看介绍</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Level 2 & 3: Tree Lines + Sub-Folders + Direct Resources In-Place for Categories with Sub-folders */}
                {isMainExpanded && main.subFolders.length > 0 && (
                  <div className="relative ml-4 sm:ml-6 pl-4 sm:pl-6 border-l-2 border-neutral-300 dark:border-neutral-700 space-y-4 my-2">
                    {main.subFolders.map((sub, sIdx) => {
                      const subKey = `${main.id}_${sub.id}`;
                      const isSubExpanded = expandedSubs[subKey] ?? false;
                      const subResources = resourcesBySubFolder[subKey] || [];
                      const subNum = `${String(sIdx + 1).padStart(2, '0')}`;

                      if (isSearchActive && subResources.length === 0) {
                        return null;
                      }

                      return (
                        <div key={sub.id} className="relative">
                          {/* Sub-Folder Bar */}
                          <div
                            onClick={() => toggleSub(subKey)}
                            className="group/sub flex items-center justify-between p-2 rounded-xl hover:bg-neutral-100/90 dark:hover:bg-neutral-800/70 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
                                <path d="M2 5C2 3.89543 2.89543 3 4 3H9.17157C9.70201 3 10.2107 3.21071 10.5858 3.58579L12.4142 5.41421C12.7893 5.78929 13.298 6 13.8284 6H20C21.1046 6 22 6.89543 22 8V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V5Z" fill="#FBBF24" />
                                <path d="M2 9C2 7.89543 2.89543 7 4 7H20C21.1046 7 22 7.89543 22 9V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V9Z" fill="#F59E0B" />
                              </svg>

                              <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 group-hover/sub:text-emerald-500 font-mono">
                                {subNum}.
                              </span>

                              <span className="text-sm sm:text-base font-bold text-neutral-800 dark:text-neutral-100 group-hover/sub:text-emerald-600 dark:group-hover/sub:text-emerald-400">
                                {sub.name}
                              </span>

                              <span className="text-xs text-neutral-400 dark:text-neutral-500 hidden sm:inline truncate">
                                - {sub.description}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs px-2 py-0.5 rounded-full font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                                {subResources.length} 项
                              </span>
                              <div className="text-neutral-400 group-hover/sub:text-emerald-600">
                                {isSubExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                              </div>
                            </div>
                          </div>

                          {/* Level 3: Direct Resource Links under this Sub-folder */}
                          {isSubExpanded && (
                            <div className="relative ml-4 sm:ml-6 pl-4 sm:pl-6 border-l-2 border-dashed border-neutral-300 dark:border-neutral-700/80 space-y-2 my-2.5">
                              {subResources.length === 0 ? (
                                <div className="p-3 text-xs text-neutral-400 italic">
                                  当前子分类暂无符合筛选的网盘资源
                                </div>
                              ) : (
                                subResources.map((item, rIdx) => {
                                  const rankMedal = rIdx === 0 ? '🥇' : rIdx === 1 ? '🥈' : rIdx === 2 ? '🥉' : '🔹';
                                  return (
                                    <div
                                      key={item.id}
                                      onClick={() => onSelectResource(item)}
                                      className="group/item flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-3 rounded-xl bg-neutral-50/80 dark:bg-neutral-800/50 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40 border border-neutral-200/60 dark:border-neutral-800 hover:border-emerald-400 dark:hover:border-emerald-700 transition-all cursor-pointer gap-2"
                                    >
                                      {/* Left: Globe + Rank + Title */}
                                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                        <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-700 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                                          <Globe className="w-3.5 h-3.5" />
                                        </div>

                                        <span className="text-sm shrink-0" title={`推荐排序 #${rIdx + 1}`}>
                                          {rankMedal}
                                        </span>

                                        {getDriveBadge(item.driveType, item.driveName)}

                                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover/item:text-emerald-700 dark:group-hover/item:text-emerald-300 truncate leading-tight">
                                          {renderHighlightedText(item.title, searchQuery)}
                                        </h4>

                                        {item.isPinned && (
                                          <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-red-600 text-white shadow-xs shrink-0">
                                            📌 置顶
                                          </span>
                                        )}
                                        {item.isFeatured && !item.isPinned && (
                                          <span className="hidden sm:inline-flex text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shrink-0">
                                            🔥 推荐
                                          </span>
                                        )}
                                        {item.isCollection && (
                                          <span className="hidden md:inline-flex text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 shrink-0">
                                            典藏合集
                                          </span>
                                        )}
                                      </div>

                                      {/* Right: Size + Code + Action Buttons */}
                                      <div className="flex items-center justify-end gap-2 shrink-0 pt-1 sm:pt-0">
                                        <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                                          {item.size}
                                        </span>

                                        {item.extractCode ? (
                                          <span className="text-[11px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-mono font-bold shrink-0">
                                            码: {item.extractCode}
                                          </span>
                                        ) : (
                                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 shrink-0">
                                            免密
                                          </span>
                                        )}

                                        <button
                                          onClick={(e) => onCopyLink(item, e)}
                                          title="复制网盘链接与提取码"
                                          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-600 transition-colors shadow-2xs cursor-pointer"
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

                                        <a
                                          href={item.driveUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={(e) => e.stopPropagation()}
                                          title="直接在新窗口打开网盘页面"
                                          className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors shrink-0 cursor-pointer"
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
      )}
    </div>
  );
};
