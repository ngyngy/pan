import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { TopSearchBar } from './components/TopSearchBar';
import { TopShowcase } from './components/TopShowcase';
import { SubsitesBar } from './components/SubsitesBar';
import { FolderDirectoryView } from './components/FolderDirectoryView';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { SubsitesPortalModal } from './components/SubsitesPortalModal';
import { QQGroupModal } from './components/QQGroupModal';
import { FeedbackModal } from './components/FeedbackModal';
import { HotRankModal } from './components/HotRankModal';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { INITIAL_RESOURCES } from './data/resources';
import { ResourceItem, FilterState, SubSiteCategory, DriveType, MainFolderCategoryKey } from './types';

export default function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ngy_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ngy_dark_mode', String(darkMode));
  }, [darkMode]);

  // Main data list
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);

  // Filter state with Folder Directory Navigation
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedDrive: 'all',
    selectedSubsite: 'all',
    sortBy: 'latest',
    qualityFilter: '',
    hasExtractCode: 'all',
    onlyFeatured: false,
    onlyCollection: false,
    activeMainFolder: null,
    activeSubFolder: null
  });

  // Modal states
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [showSubsitesModal, setShowSubsitesModal] = useState<boolean>(false);
  const [showQQGroupModal, setShowQQGroupModal] = useState<boolean>(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [targetFeedbackResource, setTargetFeedbackResource] = useState<ResourceItem | null>(null);
  const [showHotRankModal, setShowHotRankModal] = useState<boolean>(false);

  // Toast system
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const addToast = (type: 'success' | 'error' | 'info', text: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Subsite resource counts
  const resourceCounts = useMemo(() => {
    const counts: Record<string, number> = { all: resources.length };
    resources.forEach((r) => {
      counts[r.subsiteId] = (counts[r.subsiteId] || 0) + 1;
    });
    return counts;
  }, [resources]);

  // Filtered Count for TopSearchBar
  const filteredCount = useMemo(() => {
    let list = resources;
    if (filters.selectedDrive !== 'all') {
      list = list.filter((r) => r.driveType === filters.selectedDrive);
    }
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          (r.description && r.description.toLowerCase().includes(q)) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list.length;
  }, [resources, filters.selectedDrive, filters.searchQuery]);

  // Handlers
  const handleFilterChange = (partial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedDrive: 'all',
      selectedSubsite: 'all',
      sortBy: 'latest',
      qualityFilter: '',
      hasExtractCode: 'all',
      onlyFeatured: false,
      onlyCollection: false,
      activeMainFolder: null,
      activeSubFolder: null
    });
    addToast('info', '已重置全部筛选');
  };

  const handleNavigateFolder = (mainKey: MainFolderCategoryKey | null, subId: string | null) => {
    setFilters((prev) => ({
      ...prev,
      activeMainFolder: mainKey,
      activeSubFolder: subId
    }));
  };

  const handleSelectSubsite = (sub: SubSiteCategory) => {
    let targetMain: MainFolderCategoryKey | null = null;
    let targetSub: string | null = null;

    if (sub === 'dy') {
      targetMain = 'video';
    } else if (sub === 'xuexi') {
      targetMain = 'education';
    } else if (sub === 'tianya') {
      targetMain = 'books';
    } else if (sub === 'gxs') {
      targetMain = 'video';
      targetSub = 'variety_doc';
    } else if (sub === 'btczy') {
      targetMain = 'crypto';
      targetSub = 'btc_books';
    } else if (sub === 'yidong') {
      targetMain = 'yidong';
      targetSub = 'yidong_bundle';
    } else {
      targetMain = null;
      targetSub = null;
    }

    setFilters((prev) => ({
      ...prev,
      selectedSubsite: sub,
      activeMainFolder: targetMain,
      activeSubFolder: targetSub
    }));
  };

  const handleCopyLink = (resource: ResourceItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const text = resource.extractCode
      ? `【${resource.title}】\n链接：${resource.driveUrl}\n提取码：${resource.extractCode}`
      : `【${resource.title}】\n链接：${resource.driveUrl}`;
    
    navigator.clipboard.writeText(text);
    setCopiedId(resource.id);
    addToast('success', `已复制《${resource.title.slice(0, 18)}...》分享链接及提取码！`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReportIssue = (resource: ResourceItem) => {
    setTargetFeedbackResource(resource);
    setSelectedResource(null);
    setShowFeedbackModal(true);
  };

  const handleTopShowcaseViewMore = (type: 'featured' | 'latest' | 'collection') => {
    if (type === 'featured') {
      setFilters((prev) => ({ ...prev, activeMainFolder: null, activeSubFolder: null, onlyFeatured: true, onlyCollection: false, searchQuery: '' }));
    } else if (type === 'latest') {
      setFilters((prev) => ({ ...prev, activeMainFolder: null, activeSubFolder: null, sortBy: 'latest', onlyFeatured: false, onlyCollection: false, searchQuery: '' }));
    } else if (type === 'collection') {
      setFilters((prev) => ({ ...prev, activeMainFolder: null, activeSubFolder: null, onlyCollection: true, onlyFeatured: false, searchQuery: '' }));
    }
    document.getElementById('main-folder-directory')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors selection:bg-emerald-600 selection:text-white">
      {/* Top Navbar with Integrated Search Bar */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenHotRank={() => setShowHotRankModal(true)}
        onOpenSubsitesPortal={() => setShowSubsitesModal(true)}
        onOpenQQGroup={() => setShowQQGroupModal(true)}
        onResetToHome={handleResetFilters}
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
        selectedDrive={filters.selectedDrive}
        onSelectDrive={(d) => handleFilterChange({ selectedDrive: d })}
        totalCount={resources.length}
        filteredCount={filteredCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-4 sm:pb-6 space-y-4 sm:space-y-5">
        {/* 1. Top Sub-Sites Fast Portal Bar (点击整个卡片直达对应分站) */}
        <SubsitesBar
          resourceCounts={resourceCounts}
        />

        {/* 3. Core Main Feature: 6 Big Directory Tree with In-Page Expansion (用户指定六大类单列树形展示，直接本页展开) */}
        <div id="main-folder-directory" className="scroll-mt-4">
          <FolderDirectoryView
            resources={resources}
            onSelectResource={setSelectedResource}
            onCopyLink={handleCopyLink}
            copiedId={copiedId}
            activeMainFolder={filters.activeMainFolder || null}
            activeSubFolder={filters.activeSubFolder || null}
            onNavigateFolder={handleNavigateFolder}
            selectedDrive={filters.selectedDrive}
            onSelectDrive={(d) => handleFilterChange({ selectedDrive: d })}
            searchQuery={filters.searchQuery}
            onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
          />
        </div>

        {/* 4. Bottom Showcase Section: 精选优质网盘资源 / 最新收录上线 / 经典大合集精选 */}
        <div className="pt-5 border-t border-neutral-200/80 dark:border-neutral-800 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <span>🔥 精选合集与最新收录推荐</span>
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                实时聚合全网热门高分资源、4K原盘与名家大师课
              </p>
            </div>
          </div>

          <TopShowcase
            resources={resources}
            onSelectResource={setSelectedResource}
            onViewMore={handleTopShowcaseViewMore}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenSubsitesPortal={() => setShowSubsitesModal(true)}
        onOpenFeedback={() => {
          setTargetFeedbackResource(null);
          setShowFeedbackModal(true);
        }}
        onSearchKeyword={(kw) => {
          handleFilterChange({ searchQuery: kw, activeMainFolder: null, activeSubFolder: null });
        }}
      />

      {/* Modals */}
      <ResourceDetailModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        onCopyLink={handleCopyLink}
        onReportIssue={handleReportIssue}
      />

      <SubsitesPortalModal
        isOpen={showSubsitesModal}
        onClose={() => setShowSubsitesModal(false)}
        onFilterBySubsite={handleSelectSubsite}
      />

      <QQGroupModal
        isOpen={showQQGroupModal}
        onClose={() => setShowQQGroupModal(false)}
        onCopySuccess={(msg) => addToast('success', msg)}
      />

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        targetResource={targetFeedbackResource}
        onSubmitSuccess={(msg) => addToast('success', msg)}
      />

      <HotRankModal
        isOpen={showHotRankModal}
        onClose={() => setShowHotRankModal(false)}
        resources={resources}
        onSelectResource={setSelectedResource}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
