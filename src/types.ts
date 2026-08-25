export type DriveType = 'all' | 'quark' | 'baidu' | 'uc' | 'aliyun' | 'xunlei' | 'yidong' | 'magnet' | '115';

export type SubSiteCategory = 'all' | 'tianya' | 'xuexi' | 'dy' | 'gxs' | 'btczy' | 'uc_nav' | 'yidong';

// 10 Core Main Folder Categories (including 00 特别福利, 09 移动云盘专区)
export type MainFolderCategoryKey = 'welfare' | 'video' | 'education' | 'software' | 'books' | 'games' | 'music' | 'crypto' | 'wallpaper' | 'yidong';

export interface SubFolderCategory {
  id: string;
  name: string;
  code: string;
  description: string;
  tags?: string[];
  iconName?: string;
}

export interface MainFolderCategory {
  id: MainFolderCategoryKey;
  num: string; // '01', '02', '03', '04', '05', '06'
  name: string;
  titleName: string;
  shortDesc: string;
  badge: string;
  colorClass: string;
  textColorClass: string;
  borderColorClass: string;
  bgLightClass: string;
  subFolders: SubFolderCategory[];
}

export interface SubSiteInfo {
  id: string;
  name: string;
  subdomain: string;
  url: string;
  category: SubSiteCategory;
  description: string;
  badge: string;
  iconName: string;
  color: string;
  totalResources: number;
  highlightTags: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  // 6 Major Folder Category Mapping
  mainCategoryId?: MainFolderCategoryKey;
  subCategoryId?: string;
  subCategoryName?: string;
  
  subsiteId: 'tianya' | 'xuexi' | 'dy' | 'gxs' | 'btczy' | 'uc' | 'yidong';
  subsiteName: string;
  subsiteUrl: string;
  category: SubSiteCategory;
  categoryName: string;
  driveType: 'quark' | 'baidu' | 'uc' | 'aliyun' | 'xunlei' | 'yidong' | 'magnet' | '115' | 'official';
  driveName: string;
  driveUrl: string;
  extractCode?: string;
  size?: string;
  sizeBytes?: number;
  quality?: string;
  rating?: number;
  year?: string;
  publishDate: string;
  relativeTime: string;
  isFeatured?: boolean;
  isLatest?: boolean;
  isCollection?: boolean;
  isPinned?: boolean;
  pinOrder?: number;
  isWelfare?: boolean;
  views: number;
  downloads: number;
  tags: string[];
  description?: string;
  fileList?: string[];
}

export interface FilterState {
  searchQuery: string;
  selectedDrive: DriveType;
  selectedSubsite: SubSiteCategory;
  sortBy: 'latest' | 'views' | 'size_desc' | 'size_asc';
  qualityFilter: string;
  hasExtractCode: 'all' | 'free' | 'with_code';
  onlyFeatured: boolean;
  onlyCollection: boolean;
  // Folder Navigation State
  activeMainFolder?: MainFolderCategoryKey | null;
  activeSubFolder?: string | null;
}

export interface ResourceRequestForm {
  resourceName: string;
  category: string;
  preferredDrive: string;
  note: string;
  contact: string;
}

export interface FeedbackForm {
  resourceId?: string;
  resourceTitle?: string;
  feedbackType: 'link_invalid' | 'need_code' | 'wrong_content' | 'other';
  comment: string;
  contact: string;
}
