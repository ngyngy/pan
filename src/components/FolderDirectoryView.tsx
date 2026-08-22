import React, { useState, useMemo } from 'react';
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
  Globe
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
  // Local state: which main folder is expanded (default to opening 01 & 02)
  const [expandedMains, setExpandedMains] = useState<Record<string, boolean>>({
    video: true,
    education: true,
    software: true,
    books: true,
    games: true,
    music: true,
    crypto: true
  });

  // Local state: which subfolder is expanded in-place to show resources
  const [expandedSubs, setExpandedSubs] = useState<Record<string, boolean>>({
    'video_movie': true,
    'video_tv': true,
    'video_us_drama': true,
    'video_anime': false,
    'video_short_drama': false,
    'video_variety_doc': false,
    'education_school': true,
    'education_dedao': true,
    'education_bilibili_paid': true,
    'education_ielts': true,
    'education_kaoyan': true,
    'software_apps': true,
    'software_design_tools': true,
    'books_novels': true,
    'books_tianya_posts': true,
    'books_baidu_welfare': true,
    'games_pc_games': true,
    'music_lossless': true,
    'crypto_btc_books': true,
    'crypto_btc_theory': true,
    'crypto_btc_tools': true
  });

  // Map resources by sub-category
  const resourcesBySubFolder = useMemo(() => {
    const map: Record<string, ResourceItem[]> = {};

    MAIN_FOLDERS.forEach((m) => {
      m.subFolders.forEach((s) => {
        const key = `${m.id}_${s.id}`;
        map[key] = [];
      });
    });

    resources.forEach((r) => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = r.title.toLowerCase().includes(q);
        const matchTags = r.tags.some((t) => t.toLowerCase().includes(q));
        const matchDesc = r.description?.toLowerCase().includes(q) || false;
        const matchDrive = r.driveName.toLowerCase().includes(q);
        if (!matchTitle && !matchTags && !matchDesc && !matchDrive) return;
      }

      // 2. Drive Filter
      if (selectedDrive !== 'all' && r.driveType !== selectedDrive) {
        return;
      }

      // Match main & sub
      let matchedMain = r.mainCategoryId;
      let matchedSub = r.subCategoryId;

      if (!matchedMain) {
        if (r.subsiteId === 'dy' || r.tags.some(t => /影视|电视剧|美剧|HBO|Netflix|短剧|电影|4K|动漫|兽夫|广播剧|裙下臣/.test(t))) {
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
        // Fallback into first sub of that main category
        const firstSub = MAIN_FOLDERS.find(m => m.id === matchedMain)?.subFolders[0]?.id;
        if (firstSub && map[`${matchedMain}_${firstSub}`]) {
          map[`${matchedMain}_${firstSub}`].push(r);
        }
      }
    });

    // Ensure isPinned items are always strictly sorted to the top
    Object.keys(map).forEach((k) => {
      map[k].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        if (a.isPinned && b.isPinned) {
          return (a.pinOrder || 0) - (b.pinOrder || 0);
        }
        return 0;
      });
    });

    return map;
  }, [resources, searchQuery, selectedDrive]);

  // Counts for main categories
  const mainCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MAIN_FOLDERS.forEach((m) => {
      let total = 0;
      m.subFolders.forEach((s) => {
        const key = `${m.id}_${s.id}`;
        total += (resourcesBySubFolder[key] || []).length;
      });
      counts[m.id] = total;
    });
    return counts;
  }, [resourcesBySubFolder]);

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
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-700/80 shrink-0">
            夸克
          </span>
        );
      case 'baidu':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-700/80 shrink-0">
            百度
          </span>
        );
      case 'uc':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold bg-orange-50 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 border border-orange-300 dark:border-orange-700/80 shrink-0">
            UC
          </span>
        );
      case 'xunlei':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 border border-sky-300 dark:border-sky-700/80 shrink-0">
            迅雷
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/80 shrink-0">
            {driveName}
          </span>
        );
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* 1. Header Toolbar with Filter & Quick Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-sm">
        {/* Title */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight flex items-center gap-2">
              <span>七大分类资源目录树</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80 font-normal">
                单列树形展开 · 实时在本页打开
              </span>
            </h2>
          </div>
        </div>

        {/* Right Search & Drive Fast Switch */}
        <div className="flex items-center gap-2">
          {/* Quick Drive Selector */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800/90 p-0.5 rounded-xl text-xs">
            {(['all', 'quark', 'baidu', 'uc'] as const).map((d) => (
              <button
                key={d}
                onClick={() => onSelectDrive(d)}
                className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
                  selectedDrive === d
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                {d === 'all' ? '全部网盘' : d === 'quark' ? '夸克' : d === 'baidu' ? '百度' : 'UC'}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="搜索目录树内资源..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-neutral-900 text-neutral-900 dark:text-neutral-100 outline-none transition-all placeholder:text-neutral-400"
            />
          </div>

          {/* Expand/Collapse All Buttons */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs ml-1 border-l pl-2 border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => handleExpandAll(true)}
              className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-600 dark:text-neutral-300 font-medium"
            >
              全部展开
            </button>
            <button
              onClick={() => handleExpandAll(false)}
              className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-600 dark:text-neutral-300 font-medium"
            >
              全部收起
            </button>
          </div>
        </div>
      </div>

      {/* 2. Single Column Tree Directory Structure (Exact match to User's image screenshot) */}
      <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-sm p-4 sm:p-6 space-y-6">
        {MAIN_FOLDERS.map((main) => {
          const isMainExpanded = expandedMains[main.id];
          const totalMainResources = mainCounts[main.id] || 0;

          return (
            <div key={main.id} className="relative select-none">
              {/* Level 1: Main Category Golden Folder (e.g. 📁 01 影视 / 动漫 / 短剧 / 纪录片) */}
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
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold font-mono text-lg sm:text-xl">
                      {main.num}
                    </span>
                    <h3 className="text-base sm:text-xl font-extrabold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-600 tracking-tight truncate">
                      {main.name}
                      <span className="ml-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">
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

              {/* Level 2 & 3: Tree Lines + Sub-Folders + Direct Resources In-Place */}
              {isMainExpanded && (
                <div className="relative ml-4 sm:ml-6 pl-4 sm:pl-6 border-l-2 border-neutral-300 dark:border-neutral-700 space-y-4 my-2">
                  {main.subFolders.map((sub, sIdx) => {
                    const subKey = `${main.id}_${sub.id}`;
                    const isSubExpanded = expandedSubs[subKey] ?? false;
                    const subResources = resourcesBySubFolder[subKey] || [];
                    const subNum = `${String(sIdx + 1).padStart(2, '0')}`;

                    return (
                      <div key={sub.id} className="relative">
                        {/* Sub-Folder Bar (📁 01. 电影 (在线 / 下载 / 4K) ) */}
                        <div
                          onClick={() => toggleSub(subKey)}
                          className="group/sub flex items-center justify-between p-2 rounded-xl hover:bg-neutral-100/90 dark:hover:bg-neutral-800/70 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Golden Sub Folder Icon */}
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

                        {/* Level 3: Real Direct Resource Links under this Sub-folder (Matching Screenshot Style) */}
                        {isSubExpanded && (
                          <div className="relative ml-4 sm:ml-6 pl-4 sm:pl-6 border-l-2 border-dashed border-neutral-300 dark:border-neutral-700/80 space-y-2 my-2.5">
                            {/* Special Tutorial Guide for Baidu Welfare Books */}
                            {sub.id === 'baidu_welfare' && (
                              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 shadow-xs mb-3">
                                <div className="font-bold flex items-center gap-1.5 text-blue-700 dark:text-blue-300 mb-1.5">
                                  <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[11px] font-extrabold">
                                    领取秘籍
                                  </span>
                                  <span>百度网盘正版图书永久免费入库步骤：</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] mt-1 text-neutral-700 dark:text-neutral-300 font-medium">
                                  <div className="flex items-start gap-1 bg-white/70 dark:bg-neutral-900/60 p-2 rounded-lg border border-blue-100 dark:border-blue-900">
                                    <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">1.</span>
                                    <span>点击复制对应图书的<strong>神秘代码 / 提取码</strong></span>
                                  </div>
                                  <div className="flex items-start gap-1 bg-white/70 dark:bg-neutral-900/60 p-2 rounded-lg border border-blue-100 dark:border-blue-900">
                                    <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">2.</span>
                                    <span>打开手机<strong>百度网盘APP</strong>，自动识别弹窗或搜索加入书架</span>
                                  </div>
                                  <div className="flex items-start gap-1 bg-white/70 dark:bg-neutral-900/60 p-2 rounded-lg border border-blue-100 dark:border-blue-900">
                                    <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">3.</span>
                                    <span>在书架中打开并<strong>连续阅读满5分钟</strong>，永久归属于您！</span>
                                  </div>
                                </div>
                              </div>
                            )}

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
                                    {/* Left: Globe/Earth Icon + Rank Medal + Title + Tags (Exact Match to screenshot) */}
                                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                      {/* Blue Globe Internet Icon (e like screenshot) */}
                                      <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-700 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                                        <Globe className="w-3.5 h-3.5" />
                                      </div>

                                      {/* Rank Medal */}
                                      <span className="text-sm shrink-0" title={`推荐排序 #${rIdx + 1}`}>
                                        {rankMedal}
                                      </span>

                                      {/* Drive Badge */}
                                      {getDriveBadge(item.driveType, item.driveName)}

                                      {/* Title */}
                                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover/item:text-emerald-700 dark:group-hover/item:text-emerald-300 truncate leading-tight">
                                        {item.title}
                                      </h4>

                                      {/* Backup link indicator / Extra badges */}
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
                                      {/* File Size */}
                                      <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                                        {item.size}
                                      </span>

                                      {/* Extract Code if any */}
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
                                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-600 transition-colors shadow-2xs"
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

                                      {/* Direct Jump to Pan */}
                                      <a
                                        href={item.driveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        title="直接在新窗口打开网盘页面"
                                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors shrink-0"
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
