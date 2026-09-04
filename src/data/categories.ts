import { MainFolderCategory } from '../types';

/**
 * 六大核心分类体系（黄色文件夹层级视图）
 * 严格按照用户需求与设计样式定制：
 * 01 影视娱乐类 (电影、电视剧、动漫、短剧、综艺/纪录片)
 * 02 学习/教育资料类 (考试资料、中小学/大学、学科资料、技能教程、AI教程)
 * 03 软件工具类 (电脑/手机软件、设计剪辑配套、系统安装工具)
 * 04 电子书 / 小说 / Kindle书库类 (Kindle万册书库、电子书/有声书、网络小说/名著、天涯神帖)
 * 05 游戏资源类 (游戏安装包+DLC、联机补丁/模拟器、手游独立游戏)
 * 06 音乐类 (无损音乐、演唱会现场、经典专辑合集)
 */
export const MAIN_FOLDERS: MainFolderCategory[] = [
  {
    id: 'welfare',
    num: '00',
    name: '特别福利',
    titleName: '限时免费领取 / 独家激活码 / 游戏BT平台 / 会员兑换',
    shortDesc: '长期更新专属免费福利、热门游戏礼包、平台VIP会员与实用兑换码',
    badge: '限时必领',
    colorClass: 'rose',
    textColorClass: 'text-rose-700 dark:text-rose-400',
    borderColorClass: 'border-rose-200 dark:border-rose-800',
    bgLightClass: 'bg-rose-50/60 dark:bg-rose-950/30',
    subFolders: []
  },
  {
    id: 'video',
    num: '01',
    name: '影视娱乐类',
    titleName: '影视 / 动漫 / 短剧 / 纪录片',
    shortDesc: '电影、电视剧、动漫、爆款AI/爽文短剧、综艺与纪录片',
    badge: '海量热门',
    colorClass: 'emerald',
    textColorClass: 'text-emerald-700 dark:text-emerald-400',
    borderColorClass: 'border-emerald-200 dark:border-emerald-800',
    bgLightClass: 'bg-emerald-50/60 dark:bg-emerald-950/30',
    subFolders: [
      {
        id: 'movie',
        name: '电影',
        code: '01-1',
        description: '含高清/4K、经典电影大合集、最新院线大片与流媒体原盘',
        tags: ['4K超清', '院线大片', '经典合集', '流媒体']
      },
      {
        id: 'tv',
        name: '电视剧',
        code: '01-2',
        description: '大明王朝1566（4K HQ高码率全集/250G）、国产经典高分神剧、历史权谋与热播连续剧',
        tags: ['大明王朝1566', '4K HQ高码', '历史正剧巅峰', '经典电视剧']
      },
      {
        id: 'us_drama',
        name: '美剧',
        code: '01-3',
        description: '经典高分美剧、HBO/Netflix流媒体热播剧、权力的游戏/绝命毒师/黄石等4K全季合集',
        tags: ['高分美剧', 'HBO神作', 'Netflix', '4K美剧', '全季打包']
      },
      {
        id: 'anime',
        name: '动漫',
        code: '01-4',
        description: '国漫顶流年番、热门日本新番、4K高码率动漫与剧场版',
        tags: ['凡人修仙传', '日本新番', '4K重置', '剧场版']
      },
      {
        id: 'short_drama',
        name: '短剧',
        code: '01-5',
        description: '热门爆款短剧全集、J-检察官的提案、AI前沿短剧、逆袭爽文微短剧每日实时连载',
        tags: ['爆款短剧', '检察官的提案', 'AI短剧', '爽文短剧', '全集完结']
      },
      {
        id: 'variety_doc',
        name: '综艺 / 纪录片',
        code: '01-6',
        description: '深度社会人文纪实、高晓松晓说奇谈、自然历史人文纪录片',
        tags: ['深度纪实', '晓松奇谈', '自然科学', '人文探索']
      },
      {
        id: 'finance_movies',
        name: '搞钱人必看的10部神级金融电影',
        code: '01-7',
        description: '《华尔街之狼》《大空头》《商海通牒》《颠倒乾坤》《监守自盗》等搞钱必看金融经典电影合集',
        tags: ['金融电影', '搞钱必看', '神级金融电影', '商业思维', '财富认知', '夸克网盘']
      }
    ]
  },
  {
    id: 'education',
    num: '02',
    name: '学习 / 教育资料类',
    titleName: '中小学辅导 / 得到资源 / B站付费课程 / 雅思备考 / 考研资料',
    shortDesc: '中小学培优全套、得到2018大师课、B站付费课1.4TB、雅思超全备考、2027考研专区',
    badge: '刚需精选',
    colorClass: 'emerald',
    textColorClass: 'text-emerald-700 dark:text-emerald-400',
    borderColorClass: 'border-emerald-200 dark:border-emerald-800',
    bgLightClass: 'bg-emerald-50/60 dark:bg-emerald-950/30',
    subFolders: [
      {
        id: 'school',
        name: '中小学辅导',
        code: '02-1',
        description: '涵盖语文、数学、英语三大科目（小学/初中/高中全学段），名师网课体系、必刷题库与中高考冲刺提分讲义',
        tags: ['中小学辅导', '语文', '数学', '英语', '小学', '初中', '高中', '学而思', '黄保余', '必刷题']
      },
      {
        id: 'dedao',
        name: '得到资源',
        code: '02-2',
        description: '得到App年度大师课全集、薛兆丰经济学、宁向东管理学、万维钢精英日课、香帅金融学等大师专栏全套音频图文讲义',
        tags: ['得到App', '薛兆丰', '宁向东', '万维钢', '香帅', '梁宁', '大师课全集']
      },
      {
        id: 'bilibili_paid',
        name: 'B站付费课程大合集',
        code: '02-3',
        description: 'B站付费精品课程大合集（第1-260套全收录·1.4TB豪华典藏），涵盖编程开发、设计剪辑、商业认知、影视后期与名师系统课',
        tags: ['B站付费课程', '1-260套全集', '1.4TB典藏', '名师系统课', '编程设计', '夸克网盘']
      },
      {
        id: 'ielts',
        name: '雅思超全备考资源合集',
        code: '02-4',
        description: '雅思超全备考资源合集：剑桥雅思全套高清PDF+音频、口语/听力/阅读/写作名师高分网课、独家机经预测与历年真题精析',
        tags: ['雅思备考', '剑桥雅思', '雅思口语', '雅思听力', '雅思写作', '雅思阅读', '高分网课']
      },
      {
        id: 'kaoyan',
        name: '考研资料',
        code: '02-5',
        description: '2027考研全科备考资料、2027考研英语自动更新合集、考研政治/数学/专业课名师网课及历年真题讲义',
        tags: ['2027考研', '考研英语', '自动更新', '考研资料', '考研政治', '考研数学', '名师网课', '夸克网盘']
      }
    ]
  },
  {
    id: 'software',
    num: '03',
    name: '软件工具教程类',
    titleName: '电脑 / 手机软件 / 各种经典教程 / 系统工具',
    shortDesc: '电脑/手机软件合集、各种经典实用教程、设计剪辑工具、系统装机镜像',
    badge: '装机必备',
    colorClass: 'emerald',
    textColorClass: 'text-emerald-700 dark:text-emerald-400',
    borderColorClass: 'border-emerald-200 dark:border-emerald-800',
    bgLightClass: 'bg-emerald-50/60 dark:bg-emerald-950/30',
    subFolders: [
      {
        id: 'apps',
        name: '电脑 / 手机软件合集',
        code: '03-1',
        description: '办公效率神器、全功能PDF工具箱、AI扣子Coze自动化工作流、Seedance 2.0实操教程与实用软件合集',
        tags: ['办公软件', 'AI扣子Coze', 'Seedance2.0', '安卓精选App', '效率神器', '便携版']
      },
      {
        id: 'design_tools',
        name: '各种经典教程',
        code: '03-2',
        description: 'B站冯默风PS零基础摄影后期调色、设计剪辑实战网课、Adobe全家桶与剪辑配套教程',
        tags: ['各种经典教程', '冯默风PS调色', '摄影后期', '设计剪辑', 'Adobe教程']
      },
      {
        id: 'system_tools',
        name: '系统安装包 / 实用工具',
        code: '03-3',
        description: 'Windows 11纯净镜像、PE装机微PE工具箱、磁盘分区与数据恢复神器',
        tags: ['Win11纯净版', '微PE装机', '数据恢复', '驱动大师']
      }
    ]
  },
  {
    id: 'books',
    num: '04',
    name: '电子书 / 小说 / Kindle书库类',
    titleName: 'Kindle万册书库 / 电子书 / 网络小说 / 天涯神帖',
    shortDesc: 'Kindle 4万+册经典书库（小说/商业/历史/工具书）、三体有声剧、金庸古龙与天涯神帖',
    badge: '书香典藏',
    colorClass: 'emerald',
    textColorClass: 'text-emerald-700 dark:text-emerald-400',
    borderColorClass: 'border-emerald-200 dark:border-emerald-800',
    bgLightClass: 'bg-emerald-50/60 dark:bg-emerald-950/30',
    subFolders: [
      {
        id: 'kindle_library',
        name: 'Kindle万册书库合集',
        code: '04-1',
        description: 'Kindle书库合集（4万+册），全网超全典藏，覆盖小说、商业、历史、工具书、文学哲学等',
        tags: ['Kindle书库', '4万+册', '小说文学', '商业历史', '工具书大全', '夸克网盘']
      },
      {
        id: 'ebooks',
        name: '经典电子书 / 社科名著',
        code: '04-2',
        description: '埃米尔·涂尔干《自杀论》、津巴多普通心理学第8版、《聪明人的个人成长》等社科通识与经典电子书',
        tags: ['自杀论', '津巴多心理学', '社科名著', '经典电子书', 'PDF/EPUB', '夸克网盘']
      },
      {
        id: 'audiobooks',
        name: '有声书 / 广播剧 / 经典演播',
        code: '04-3',
        description: '大屁股老鼠《三体》全三部曲有声剧、《球状闪电》有声小说、得到名师年度音频讲座',
        tags: ['三体有声剧', '球状闪电', '大屁股老鼠', '广播剧', '名师演播', '百度网盘']
      },
      {
        id: 'rare_books',
        name: '珍藏书 / 绝版古籍 / 史料文献',
        code: '04-4',
        description: '绝版典藏文献、古籍善本整理、民俗风情史料研究与珍本文献',
        tags: ['珍藏书', '绝版文献', '古籍善本', '学术研究', '夸克网盘']
      },
      {
        id: 'novels',
        name: '网络小说 / 武侠名著',
        code: '04-5',
        description: '金庸武侠小说全集、古龙全集精校版、贾行家说聊斋/武侠30讲、天涯经典神贴',
        tags: ['金庸全集', '古龙全集', '贾行家说聊斋', '天涯神贴合集']
      },
      {
        id: 'tianya_posts',
        name: '天涯神帖',
        code: '04-6',
        description: '天涯论坛经典神帖全集汇编、沙梨熊文集、地缘看世界、战争史实、红楼密码与历史深度解析',
        tags: ['天涯神帖', '沙梨熊', '地缘看世界', '二战秘史', '绝版汇编', '历史深度解析']
      },
      {
        id: 'baidu_welfare',
        name: '百度福利资源',
        code: '04-7',
        description: '百度网盘正版图书福利专区，复制代码打开百度网盘加入书架阅读5分钟即可永久入库',
        tags: ['百度福利', '正版图书', '神秘代码', '免费永久入库', '加入书架阅读5分钟']
      }
    ]
  },
  {
    id: 'games',
    num: '05',
    name: '游戏资源',
    titleName: 'PC单机大作 / 完整版+DLC / 模拟器 / 补丁 / 小容量高分神作',
    shortDesc: '3A单机游戏安装包、DLC全整合、联机补丁、修改器与5G以下小容量高分神作',
    badge: '畅快畅玩',
    colorClass: 'emerald',
    textColorClass: 'text-emerald-700 dark:text-emerald-400',
    borderColorClass: 'border-emerald-200 dark:border-emerald-800',
    bgLightClass: 'bg-emerald-50/60 dark:bg-emerald-950/30',
    subFolders: [
      {
        id: 'pc_games',
        name: '各类游戏安装包 / 完整版+DLC',
        code: '05-1',
        description: '3A动作冒险、RPG角色扮演、开放世界沙盒单机大作绿色免安装解压即玩',
        tags: ['3A大作', '免安装版', '全DLC整合', '中文配音']
      },
      {
        id: 'patch_tools',
        name: '联机补丁 / 模拟器 / 修改工具',
        code: '05-2',
        description: 'GBA/PSP/PS2/Switch全平台模拟器全套ROM整合、风灵月影修改器',
        tags: ['风灵月影修改器', 'Switch模拟器', '经典掌机主机ROM', '联机补丁']
      },
      {
        id: 'mobile_indie',
        name: 'iOS精品游戏 / 热门手游与独立神作',
        code: '05-3',
        description: '几百款iOS精选游戏大合集、IPA脱壳直装包、Steam爆款移植与手机单机神作',
        tags: ['几百款iOS游戏', 'iOS游戏合集', 'IPA安装包', '手机单机', '独立神作', '像素肉鸽', '夸克网盘']
      },
      {
        id: 'small_indie_masterpieces',
        name: '小容量高分神作',
        code: '05-4',
        description: '涵盖近10-20年高口碑获奖神作（奥日全集、死亡细胞、挺进地牢、以撒、潜水员戴夫、饥荒、这是我的战争、去月球、传送门、逆转裁判、请出示文件、空洞骑士、哈迪斯、星露谷物语等60款神作）',
        tags: ['小容量高分神作', '奥日', '死亡细胞', '以撒的结合', '潜水员戴夫', '饥荒', '这是我的战争', '传送门', '逆转裁判', '请出示文件', '空洞骑士', '哈迪斯', '星露谷物语', '夸克网盘']
      }
    ]
  },
  {
    id: 'music',
    num: '06',
    name: '音乐类',
    titleName: '无损音乐 / 4K演唱会 / 华语经典专辑合集',
    shortDesc: '母带级无损FLAC/APE音频、高清演唱会现场视频、巨星全专辑打包',
    badge: '发烧无损',
    colorClass: 'emerald',
    textColorClass: 'text-emerald-700 dark:text-emerald-400',
    borderColorClass: 'border-emerald-200 dark:border-emerald-800',
    bgLightClass: 'bg-emerald-50/60 dark:bg-emerald-950/30',
    subFolders: [
      {
        id: 'lossless',
        name: '无损音乐 (FLAC / APE / Hi-Res)',
        code: '06-1',
        description: '490张发烧车载无损CD、24bit/96kHz母带无损音乐、欧美流行发烧榜单',
        tags: ['490张无损CD', 'Hi-Res母带', '车载发烧音乐', 'FLAC无损']
      },
      {
        id: 'concert',
        name: '演唱会 / 现场实录',
        code: '06-2',
        description: '张学友/周杰伦/陈奕迅/Beyond 4K 60帧蓝光演唱会现场超清原盘',
        tags: ['4K现场演唱会', '蓝光原盘', '经典Live', '现场万人合唱']
      },
      {
        id: 'albums',
        name: '专辑大合集',
        code: '06-3',
        description: '华语流行乐坛黄金三十年经典歌手全专辑打包（周杰伦/林俊杰/王菲等）',
        tags: ['周杰伦全专辑', '华语经典合辑', '天王天后', '黑胶抓轨']
      },
      {
        id: 'music_tools',
        name: '音乐工具 / 播放器 / 搜歌神器',
        code: '06-4',
        description: 'FuoEvolve多平台音源聚合神器、无损音乐下载器、本地高保真播放器',
        tags: ['FuoEvolve', '搜歌神器', '多平台音源', '无损下载', '本地播放器']
      }
    ]
  },
  {
    id: 'crypto',
    num: '07',
    name: '比特币金融类',
    titleName: '比特币 / 区块链 / 白皮书典藏 / 量化与囤币理论',
    shortDesc: '中本聪原版白皮书、九神囤币理论全集、精通比特币、区块链经济学与量化脚本工具包',
    badge: '数字金融',
    colorClass: 'amber',
    textColorClass: 'text-amber-700 dark:text-amber-400',
    borderColorClass: 'border-amber-200 dark:border-amber-800',
    bgLightClass: 'bg-amber-50/60 dark:bg-amber-950/30',
    subFolders: [
      {
        id: 'btc_books',
        name: '比特币核心经典 / 白皮书与文集',
        code: '07-1',
        description: '中本聪英文原版与精译白皮书、中本聪文集、九神囤币理论汇编、胡翌林文集',
        tags: ['中本聪白皮书', '九神囤币', 'ahr999', '中本聪文集', '胡翌林']
      },
      {
        id: 'btc_theory',
        name: '区块链经济学 / 英文原版名著',
        code: '07-2',
        description: '《精通比特币第三版》、Broken Money、货币未来、创世之书等重磅专著',
        tags: ['Mastering Bitcoin', 'Broken Money', '货币未来', '创世之书', '区块链']
      },
      {
        id: 'btc_tools',
        name: '量化工具 / 资源下载库',
        code: '07-3',
        description: '比特币资源下载库全集大包、币安广场同步助手自动化脚本与量化工具',
        tags: ['比特币资源库', '量化工具', '币安助手', 'UC网盘', '自动化脚本']
      }
    ]
  },
  {
    id: 'wallpaper',
    num: '08',
    name: '美女壁纸视频类',
    titleName: '4K超清壁纸 / 动态壁纸 / 舞台热舞 / 瑜伽形体',
    shortDesc: '美女壁纸大全10万张、80套动态壁纸、女团舞台热舞与美女瑜伽教练形体教学视频',
    badge: '视觉盛宴',
    colorClass: 'pink',
    textColorClass: 'text-pink-700 dark:text-pink-400',
    borderColorClass: 'border-pink-200 dark:border-pink-800',
    bgLightClass: 'bg-pink-50/60 dark:bg-pink-950/30',
    subFolders: [
      {
        id: 'wallpapers',
        name: '高清壁纸大全 / 静态图库',
        code: '08-1',
        description: '美女壁纸大全10万张合集、宋雨琦22P高清明星写真美图、壁纸资源大合集、4K/8K电脑手机超清壁纸',
        tags: ['美女壁纸大全', '宋雨琦', '明星写真', '10万张壁纸', '壁纸资源合集', '4K壁纸', '夸克网盘']
      },
      {
        id: 'live_wallpapers',
        name: '动态壁纸 / 桌面美化',
        code: '08-2',
        description: '美女动态壁纸80张高清精选包、支持Wallpaper Engine与手机动态锁屏',
        tags: ['动态壁纸', '美女动态壁纸80张', '桌面美化', '高帧率动效', '夸克网盘']
      },
      {
        id: 'visual_videos',
        name: '舞台热舞 / 视觉视频',
        code: '08-3',
        description: '韩国女团高清热舞现场与车展车模精选合集、超清音画视听盛宴',
        tags: ['韩国女团热舞', '车展车模', '高清现场', '视觉视频', '夸克网盘']
      },
      {
        id: 'fitness_yoga',
        name: '瑜伽形体 / 健美塑形教程',
        code: '08-4',
        description: '美女瑜伽教练全套实操教学视频课程、全身柔韧拉伸与气质塑形',
        tags: ['美女瑜伽教练', '瑜伽全套课程', '形体塑形', '健美教学', '夸克网盘']
      }
    ]
  },
  {
    id: 'yidong',
    num: '09',
    name: '移动云盘资源',
    titleName: '139 移动云盘 / 免流不限速 / 全部资源打包 / 免费4T空间 / 百部热门有声书 / 动漫影视',
    shortDesc: '全部资源一键打包（提取码4ura）、免费领4T空间（提取码z3rv）、110+部精品有声书与4K动漫影视',
    badge: '免流不限速',
    colorClass: 'teal',
    textColorClass: 'text-teal-700 dark:text-teal-400',
    borderColorClass: 'border-teal-200 dark:border-teal-800',
    bgLightClass: 'bg-teal-50/60 dark:bg-teal-950/30',
    subFolders: [
      {
        id: 'yidong_bundle',
        name: '全部资源打包 & 4T空间福利',
        code: '09-1',
        description: '移动云盘全部资源一键打包链接（提取码:4ura）、免费领取4T空间福利（提取码:z3rv）、139官网直达',
        tags: ['全部资源打包', '4T空间福利', '4ura', 'z3rv', '139.wangpan8.com', '移动云盘']
      },
      {
        id: 'yidong_audiobooks',
        name: '热门有声书 / 小说名篇合集',
        code: '09-2',
        description: '师兄啊师兄、苟在妖界加点修行、苟在武道世界成圣、鸣龙、斩神2、横刀夺爱、宋时行等百部完结连载有声大作',
        tags: ['师兄啊师兄', '苟在妖界加点修行', '苟在武道世界成圣', '鸣龙', '斩神2', '横刀夺爱', '宋时行', '有声小说']
      },
      {
        id: 'yidong_anime_video',
        name: '经典动漫 / 影视动画原盘',
        code: '09-3',
        description: '诛仙、仙逆、凡人修仙传、遮天、时光代理人、斗罗大陆Ⅱ、吞噬星空、茶啊二中、6月日漫60部等精品动画',
        tags: ['诛仙', '仙逆', '凡人修仙传', '遮天', '时光代理人', '斗罗大陆', '吞噬星空', '日漫60部']
      },
      {
        id: 'yidong_study_tools',
        name: '备考学习 / 实用工具 / 区块链',
        code: '09-4',
        description: '长沙小升初试卷合集、区块链启示录中本聪文集、精通区块链、货币未来、AI工具箱',
        tags: ['长沙小升初试卷', '区块链启示录', '精通区块链', '货币未来', 'AI工具箱']
      }
    ]
  }
];
