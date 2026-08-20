export type DriveType = 'all' | 'quark' | 'baidu' | 'uc' | 'aliyun' | 'xunlei' | 'magnet' | '115';

export type SubSiteCategory = 'all' | 'tianya' | 'xuexi' | 'dy' | 'gxs' | 'btczy' | 'uc_nav';

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
  subsiteId: 'tianya' | 'xuexi' | 'dy' | 'gxs' | 'btczy' | 'uc';
  subsiteName: string;
  subsiteUrl: string;
  category: SubSiteCategory;
  categoryName: string;
  driveType: 'quark' | 'baidu' | 'uc' | 'aliyun' | 'xunlei' | 'magnet' | '115';
  driveName: string;
  driveUrl: string;
  extractCode?: string;
  size: string;
  sizeBytes: number;
  quality?: string;
  publishDate: string;
  relativeTime: string;
  isFeatured?: boolean;
  isLatest?: boolean;
  isCollection?: boolean;
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
