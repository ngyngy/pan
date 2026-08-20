import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { TopShowcase } from './components/TopShowcase';
import { SubsitesBar } from './components/SubsitesBar';
import { FilterToolbar } from './components/FilterToolbar';
import { ResourceTable } from './components/ResourceTable';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { SubsitesPortalModal } from './components/SubsitesPortalModal';
import { TVBoxModal } from './components/TVBoxModal';
import { RequestResourceModal } from './components/RequestResourceModal';
import { FeedbackModal } from './components/FeedbackModal';
import { HotRankModal } from './components/HotRankModal';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { INITIAL_RESOURCES } from './data/resources';
import { ResourceItem, FilterState, SubSiteCategory, DriveType } from './types';

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

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedDrive: 'all',
    selectedSubsite: 'all',
    sortBy: 'latest',
    qualityFilter: '',
    hasExtractCode: 'all',
    onlyFeatured: false,
    onlyCollection: false
  });

  // Modal states
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [showSubsitesModal, setShowSubsitesModal] = useState<boolean>(false);
  const [showTVBoxModal, setShowTVBoxModal] = useState<boolean>(false);
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
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

  // Filter & Search computation
  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchDesc = item.description?.toLowerCase().includes(q) || false;
        const matchDrive = item.driveName.toLowerCase().includes(q);
        const matchSubsite = item.subsiteName.toLowerCase().includes(q) || item.subsiteUrl.toLowerCase().includes(q);
        if (!matchTitle && !matchTags && !matchDesc && !matchDrive && !matchSubsite) {
          return false;
        }
      }

      // 2. Drive Type
      if (filters.selectedDrive !== 'all') {
        if (item.driveType !== filters.selectedDrive) return false;
      }

      // 3. Subsite Category
      if (filters.selectedSubsite !== 'all') {
        if (item.category !== filters.selectedSubsite && item.subsiteId !== filters.selectedSubsite) {
          return false;
        }
      }

      // 4. Quality
      if (filters.qualityFilter) {
        const qUpper = filters.qualityFilter.toUpperCase();
        const itemQual = (item.quality || '').toUpperCase();
        const itemTitle = item.title.toUpperCase();
        if (!itemQual.includes(qUpper) && !itemTitle.includes(qUpper)) {
          return false;
        }
      }

      // 5. Extract Code
      if (filters.hasExtractCode === 'free' && item.extractCode) return false;
      if (filters.hasExtractCode === 'with_code' && !item.extractCode) return false;

      // 6. Featured only
      if (filters.onlyFeatured && !item.isFeatured) return false;

      // 7. Collection only
      if (filters.onlyCollection && !item.isCollection) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'views') return b.views - a.views;
      if (filters.sortBy === 'size_desc') return b.sizeBytes - a.sizeBytes;
      if (filters.sortBy === 'size_asc') return a.sizeBytes - b.sizeBytes;
      // Default: latest by date
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });
  }, [resources, filters]);

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
      onlyCollection: false
    });
    addToast('info', '已重置全部筛选与搜索条件');
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
      setFilters((prev) => ({ ...prev, onlyFeatured: true, onlyCollection: false, searchQuery: '' }));
    } else if (type === 'latest') {
      setFilters((prev) => ({ ...prev, sortBy: 'latest', onlyFeatured: false, onlyCollection: false, searchQuery: '' }));
    } else if (type === 'collection') {
      setFilters((prev) => ({ ...prev, onlyCollection: true, onlyFeatured: false, searchQuery: '' }));
    }
    // Scroll to table smoothly
    document.getElementById('resource-list-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900">
      {/* Top Navbar */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenTVBox={() => setShowTVBoxModal(true)}
        onOpenHotRank={() => setShowHotRankModal(true)}
        onOpenSubsitesPortal={() => setShowSubsitesModal(true)}
        onOpenRequestResource={() => setShowRequestModal(true)}
        onOpenFeedback={() => {
          setTargetFeedbackResource(null);
          setShowFeedbackModal(true);
        }}
        onResetToHome={handleResetFilters}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        {/* Top 3-column Showcase Board (精选 / 最新 / 合集) matching user's screenshot */}
        <TopShowcase
          resources={resources}
          onSelectResource={setSelectedResource}
          onViewMore={handleTopShowcaseViewMore}
        />

        {/* 6 Sub-Sites Fast Portal Bar (tianya, xuexi, dy, gxs, btczy, uc) */}
        <SubsitesBar
          selectedSubsite={filters.selectedSubsite}
          onSelectSubsite={(sub) => handleFilterChange({ selectedSubsite: sub })}
          resourceCounts={resourceCounts}
        />

        {/* Filter and Instant Search Toolbar */}
        <div id="resource-list-section">
          <FilterToolbar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalFilteredCount={filteredResources.length}
            totalAllCount={resources.length}
          />
        </div>

        {/* Resource Table / List (matches kkpans.com clean style) */}
        <ResourceTable
          resources={filteredResources}
          searchQuery={filters.searchQuery}
          totalFilteredCount={filteredResources.length}
          totalAllCount={resources.length}
          onSelectResource={setSelectedResource}
          onCopyLink={handleCopyLink}
          copiedId={copiedId}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenSubsitesPortal={() => setShowSubsitesModal(true)}
        onOpenFeedback={() => {
          setTargetFeedbackResource(null);
          setShowFeedbackModal(true);
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
        onFilterBySubsite={(subCategory) => handleFilterChange({ selectedSubsite: subCategory })}
      />

      <TVBoxModal
        isOpen={showTVBoxModal}
        onClose={() => setShowTVBoxModal(false)}
      />

      <RequestResourceModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        onSubmitSuccess={(msg) => addToast('success', msg)}
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
