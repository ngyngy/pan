import { SubSiteInfo } from '../types';

export const SUB_SITES: SubSiteInfo[] = [
  {
    id: 'tianya',
    name: '天涯神贴分享站',
    subdomain: 'tianya.ngy123.com',
    url: 'http://tianya.ngy123.com',
    category: 'tianya',
    description: '收录天涯论坛经典预言帖、金庸/古龙全集、贾行家聊斋与武侠30讲、资治通鉴、乌合之众与深度纪实。',
    badge: '经典神帖',
    iconName: 'BookOpen',
    color: 'amber',
    totalResources: 34,
    highlightTags: ['金庸全集', '古龙全集', '贾行家说武侠', '资治通鉴', '乌合之众', '沙梨熊全集']
  },
  {
    id: 'xuexi',
    name: '中小学学习资料网',
    subdomain: 'xuexi.ngy123.com',
    url: 'http://xuexi.ngy123.com',
    category: 'xuexi',
    description: '涵盖得到2018年度全集、雅思备考超全合集、小学英语1-6年级全套、B站付费课1.4TB、AI扣子Coze。',
    badge: '教育备考',
    iconName: 'GraduationCap',
    color: 'emerald',
    totalResources: 28,
    highlightTags: ['得到2018全集', '小学英语1-6年级', '雅思全套真题', 'B站付费课1.4T', 'AI扣子Coze', '初中总库']
  },
  {
    id: 'dy',
    name: '影视短剧资源站',
    subdomain: 'dy.ngy123.com',
    url: 'http://dy.ngy123.com',
    category: 'dy',
    description: '大屁股老鼠三体/球状闪电有声剧、流浪地球广播剧、爆款短剧全集、4K HDR院线大片与动漫原盘。',
    badge: '4K超清',
    iconName: 'Film',
    color: 'rose',
    totalResources: 18,
    highlightTags: ['三体有声剧', '球状闪电', '流浪地球广播剧', '丧尸来袭五个兽夫', '全城皆是我裙下臣', '凡人修仙传4K']
  },
  {
    id: 'gxs',
    name: '高晓松资源下载',
    subdomain: 'gxs.ngy123.com',
    url: 'http://gxs.ngy123.com',
    category: 'gxs',
    description: '高晓松全套音视频与文学著作专区，及全本张广泰传统曲艺评书名家典藏实录。',
    badge: '文艺人文',
    iconName: 'Mic2',
    color: 'indigo',
    totalResources: 17,
    highlightTags: ['晓松奇谈全季', '全本张广泰', '鱼羊野史', '台湾被禁14期', '如丧', '晓年鉴']
  },
  {
    id: 'btczy',
    name: '比特币资源下载站',
    subdomain: 'btczy.ngy123.com',
    url: 'http://btczy.ngy123.com',
    category: 'btczy',
    description: '区块链与加密货币精选文献及《窥破天机：期货实战88问》等投资交易经典。',
    badge: '区块链/金融',
    iconName: 'Coins',
    color: 'orange',
    totalResources: 14,
    highlightTags: ['期货实战88问', '中本聪白皮书', 'AHR999九神', '精通比特币', 'Broken Money', '量化工具']
  },
  {
    id: 'uc',
    name: 'UC网盘资源站',
    subdomain: 'uc.ngy123.com',
    url: 'http://uc.ngy123.com',
    category: 'uc_nav',
    description: '490张无损音乐专辑、婚恋心理学、柏林之声车载音乐、百度福利图书正版入库、张爱玲/松下幸之助传记。',
    badge: 'UC资源',
    iconName: 'Compass',
    color: 'sky',
    totalResources: 9,
    highlightTags: ['婚恋心理学', '490张无损专辑', '柏林之声车载', '松下幸之助', '张爱玲传', '福利代码']
  }
];
