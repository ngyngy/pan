import fs from 'fs';
import path from 'path';

const rawInput = `- [01.新手理财通关攻略——简七的13堂极简理财课（完结）](https://pan.quark.cn/s/53d54cda74d4)
- [02.SPSS问卷数据统计分析基础课程（完结）](https://pan.quark.cn/s/7380ed5a7cce)
- [03.SPSS数据分析零基础实战课程（完结）](https://pan.quark.cn/s/44bcfe696e6a)
- [04.6个万能公式搞定职场PPT（完结）](https://pan.quark.cn/s/5139b220af50)
- [05.零基础入门学唱歌（完结）](https://pan.quark.cn/s/bfa9fe8fdfc2)
- [06.16堂宇宙课：北师大物理系赵峥教授（完结）](https://pan.quark.cn/s/2da593cbac93)
- [07.人人都能唱出好歌声（完结）](https://pan.quark.cn/s/55e8b9375aed)
- [08.12堂教你学唱歌（完结）](https://pan.quark.cn/s/97036eb6d658)
- [09.Java从入门到实战（完结）](https://pan.quark.cn/s/cef12c94e0fc)
- [10.Python零基础30天速通（小白定制版）（完结）](https://pan.quark.cn/s/62e63141bc93)
- [11.Python小白也能听懂的入门课（完结）](https://pan.quark.cn/s/8e319e76374e)
- [12.KO大魔王：英语语法通关计划-[B站]（完结）](https://pan.quark.cn/s/03fb96ae3a1e)
- [13.白宫里的主角们（完结）](https://pan.quark.cn/s/4a46fb675f3c)
- [14.摆脱内耗的12个行动指南（完结）](https://pan.quark.cn/s/c855812d0a6b)
- [15.林超：给年轻人的跨学科工具箱（完结）](https://pan.quark.cn/s/1fc2fb8b7429)
- [16.【第一感受】影像创作社区-王建章的摄影课（完结）](https://pan.quark.cn/s/a6759c76db6e)
- [17.「城市行者」旅行摄影实战课程 - 系统学习摄影从实战练习开始（完结）](https://pan.quark.cn/s/aa8cbd8077f7)
- [18. 顶级互联网工程师的计算机思维课(完结)](https://pan.quark.cn/s/5a4e7cdd4ef0)
- [19. 戴锦华大师电影课：性别与凝视（完结）](https://pan.quark.cn/s/2a57fe59ef31)
- [20.Web前端入门：从零开始做网站（完结）](https://pan.quark.cn/s/cb4c8cea7b92)
- [21.互联网职业通识20讲（完结）](https://pan.quark.cn/s/41a823bdfdce)
- [22. 提纲挈领读《红楼梦》(完结)](https://pan.quark.cn/s/22b1f884363a)
- [23. 剪辑思维训练营（完结）](https://pan.quark.cn/s/23f1724c9884)
- [24. 王昱珩：环球博物馆中的自然科学（完结）](https://pan.quark.cn/s/852bbc879159)
- [25. 马皑教授的社会学：人类的越轨行为研究（完结）](https://pan.quark.cn/s/0ac79bb950b5)
- [26. 李兴兴：剪辑实战训练营（完结）](https://pan.quark.cn/s/b535b0ef007a)
- [27. 傅佩荣教授 拨开迷雾读国学(完结)](https://pan.quark.cn/s/015a1fa2c372)
- [28.王骁Albert：美国背面研究报告（完结）](https://pan.quark.cn/s/f1a933a1cf3e)
- [29.张绍忠 战忽知道五季合集（完结）](https://pan.quark.cn/s/e18e09451baf)
- [30.微表情心理课（完结）](https://pan.quark.cn/s/0d8c280327af)
- [31.第四次工业革命来了-局座（完结）](https://pan.quark.cn/s/4117742ef737)
- [32.吴金闪教授：量子力学无基础入门（完结）](https://pan.quark.cn/s/c45a5184ad80)
- [33.B站·北大钱理群教授讲鲁迅（完结）](https://pan.quark.cn/s/9426891c4177)
- [34. 梨核财经：金融通识与商业分析法（完结）](https://pan.quark.cn/s/222dd0c8826c)
- [35. 金灿荣-进击的中国外交（完结）](https://pan.quark.cn/s/ca617e91a091)
- [36.小白也能听懂的人工智能原理（完结）](https://pan.quark.cn/s/eb230699f7f7)
- [37. 人类文明的地理密码（完结）](https://pan.quark.cn/s/efec8c8d1d7f)
- [38.西方哲学课（完结）](https://pan.quark.cn/s/900d6222c4b6)
- [39.福尔摩斯的推理笔记（完结）](https://pan.quark.cn/s/e87591967633)
- [40. 范勇鹏：美国的诞生--制度的起源与本质（完结）](https://pan.quark.cn/s/ffbcd5950586)
- [41. 北大陈连山教授解读宝藏《山海经》（完结）](https://pan.quark.cn/s/3a4dc1fd8da8)
- [42. 暴走漫画：讲故事也是一种超能力（完结）](https://pan.quark.cn/s/0222aae7a5bf)
- [43.全能音乐人入门训练营：零基础学写歌（完结）](https://pan.quark.cn/s/ca788d8f91e8)
- [44.次世代必备黑科技：创意编程指南（完结）](https://pan.quark.cn/s/37032d364029)
- [45. 方志远教授讲明史：明朝之亡（完结）](https://pan.quark.cn/s/23ecac97a0c1)
- [46.孙志立简明音标50讲（完结）](https://pan.quark.cn/s/eea8433307dd)
- [47. 随风说：金融的黑色现场（完结）](https://pan.quark.cn/s/b4a76e8cb6f0)
- [48.Tiger谭秋娟的吉他弹唱入门课（完结）](https://pan.quark.cn/s/e9b7ae4ff84d)
- [49.宋浩数学：2022专升本数学全程班（完结）](https://pan.quark.cn/s/6e559755bea7)
- [50.C4D大作战：百万UP的光之教程（完结）](https://pan.quark.cn/s/3e91ef5cf788)
- [51. 北大杨立华教授讲庄子哲学（完结）](https://pan.quark.cn/s/14929df67af6)
- [52.CBA10冠王训练师教你从0学篮球（完结）](https://pan.quark.cn/s/4d445542369d)
- [53.野路子特效课：像P图一样“P”视频（完结）](https://pan.quark.cn/s/f2a6fb40861f)
- [54.上海交大陆铭教授的经济学思维课（完结）](https://pan.quark.cn/s/6365b905d648)
- [55.李淼：三体中的物理学（完结）](https://pan.quark.cn/s/6bea320e8cbe)
- [56.ps+ai双专业，设计师的第一门必修课（完结）](https://pan.quark.cn/s/eddeef1e928d)
- [57. 北大教授韩茂莉讲中国历史地理（完结）](https://pan.quark.cn/s/34fe689cef15)
- [58.包爱民教授：脑科学新知20讲（完结）](https://pan.quark.cn/s/f757e29776c2)
- [59.李国平教授：财务通识二十讲（完结）](https://pan.quark.cn/s/e13decd3cfd7)
- [60.苑举正教授：哲学透镜看世界（完结）](https://pan.quark.cn/s/1bdbbfc0d6ed)
- [61.于赓哲：了不起的大唐文明史（完结）](https://pan.quark.cn/s/ba5e8f4d5a98)
- [62.戴锦华大师电影课：性别与凝视（完结）](https://pan.quark.cn/s/4412e74afaea)
- [63.打工人的法律必修课（完结）](https://pan.quark.cn/s/f83282ef822c)
- [64.轻松玩转Linux（完结）](https://pan.quark.cn/s/3fb8177321a2)
- [65.潘妮妮-经典日漫的政治学分析（完结）](https://pan.quark.cn/s/5196ef625bad)
- [66.北大陈平原：晚清画报中的近代中国（完结）](https://pan.quark.cn/s/4d0fb61cb07d)
- [67.UI设计师的动效入门指南（完结）](https://pan.quark.cn/s/b61981847e9c)
- [68.百万后期的进阶课（完结）](https://pan.quark.cn/s/8fcc0ec6efb6)
- [69.PR秘传技：进阶剪辑的全方位攻略（完结）](https://pan.quark.cn/s/77443f8add4c)
- [70.程龙老师：尤克里里基础入门课（完结）](https://pan.quark.cn/s/208e4e8a9468)
- [71.流行唱法6讲（完结）](https://pan.quark.cn/s/cde9974c0828)
- [72.北宋之美：苏东坡的奇遇人生（完结）](https://pan.quark.cn/s/bfeed4d504b3)
- [73.杜素娟的西方文学课：欧美经典名著解读（完结）](https://pan.quark.cn/s/bc70d1f777f1)
- [74.同济陈家琪讲西方哲学：从康德到黑格尔（完结）](https://pan.quark.cn/s/c375113ccae1)
- [75.许倬云讲世界历史：五百年大变局（完结）](https://pan.quark.cn/s/f3e4f73fc460)
- [76.刘海龙教授：传播理论通识课（完结）](https://pan.quark.cn/s/fc2132280290)
- [77.于赓哲：历史上的利益分配（完结）](https://pan.quark.cn/s/f3ea6cf43750)
- [78.中国制造：一场未来十年的大博弈（完结）](https://pan.quark.cn/s/28bbd38a9044)
- [79.考古大师课：文明、记忆与历史现场（完结）](https://pan.quark.cn/s/f8ff27cefd58)
- [80.翟东升：人民币汇率与人民币国际化（完结）](https://pan.quark.cn/s/01b001c562fb)
- [81.王受之教授：世界现代设计通识课（完结）](https://pan.quark.cn/s/a7243bc6c751)
- [82.马红漫博士：用得上的行为经济学（完结）](https://pan.quark.cn/s/721ed255332e)
- [83.中国政法大学刘建清教授：犯罪心理课（完结）](https://pan.quark.cn/s/f67b3890808f)
- [84.历史学者张宏杰：中西文明对比15讲（完结）](https://pan.quark.cn/s/3073a01936b8)
- [85.从量子到宇宙：北师大赵峥教授的物理课（完结）](https://pan.quark.cn/s/80842307b3a1)
- [86.柳肃教授讲中西建筑文化（完结）](https://pan.quark.cn/s/40745246bb90)
- [87.黄江南教授讲世界经济变局：观念经济学（完结）](https://pan.quark.cn/s/ca201ebfacb5)
- [88.人人都需要的自我管理课（完结）](https://pan.quark.cn/s/dc4c409fbb2d)
- [89.零基础上手Procreate（完结）](https://pan.quark.cn/s/5698d1df891c)
- [90.人体绘画：从0开始角色创作（完结）](https://pan.quark.cn/s/9f980bd01059)
- [91.人物速写：风格化角色创作实战（完结）](https://pan.quark.cn/s/5478b5acda76)
- [92.人类文明闪耀时：郦波教授的最美唐诗12讲（完结）](https://pan.quark.cn/s/1779dd66e3b1)
- [93.孙绍振教授：文学阅读审美课（完结）](https://pan.quark.cn/s/3f2bfeedb401)
- [94.汪诘：科幻世界漫游指南（第一季）（完结）](https://pan.quark.cn/s/4048989a4060)
- [95.黄金时代的摄影50讲：如何理解大师之作（完结）](https://pan.quark.cn/s/1478aba65906)
- [96.陈平的跨学科思维课（完结）](https://pan.quark.cn/s/f762dae73fd7)
- [97.B站课程·关键对话20讲：如何成为沟通高手（完结）](https://pan.quark.cn/s/4a3e420ed370)
- [98.陈嘉映教授：从哲学到人生（完结）](https://pan.quark.cn/s/909403ccbfe0)
- [99.孟晖讲宋朝美学：看得见的大宋文明（完结）](https://pan.quark.cn/s/5bf446aeb3da)
- [a100.白金游戏工作室：爆款游戏 创作心法（完结）](https://pan.quark.cn/s/b772144679df)
- [a101.超硬核沟通课：关于说话的一切（完结）](https://pan.quark.cn/s/8d827cc030a3)
- [a102.人像摄影后期系统化入门（完结）](https://pan.quark.cn/s/aea92398ad73)
- [a103.范李猿：14天体态矫正计划｜上身篇（完结）](https://pan.quark.cn/s/afa894a773cc)
- [a104.中国文学的妖怪宇宙：马瑞芳讲志怪神魔小说（完结）](https://pan.quark.cn/s/8b5f06823865)
- [a105.戴建业的古典文学课：从曹操到陶渊明（完结）](https://pan.quark.cn/s/fb9e63e6aa9e)
- [a106.心理学通识与新知（完结）](https://pan.quark.cn/s/bef225756250)
- [a107.Python实战精讲：萌新系统入门（完结）](https://pan.quark.cn/s/a6de05808101)
- [a108.姜振宇主讲MBTI性格分析（完结）](https://pan.quark.cn/s/226a4ae992d2)
- [a109.小说写作必修课：零基础打造写作IP（完结）](https://pan.quark.cn/s/573c5c28efe6)
- [a110.零基础减脂塑性·男女适用（完结）](https://pan.quark.cn/s/dfe76657baab)
- [a111.偏见看政治：李筠教授的政治学课（完结）](https://pan.quark.cn/s/e6cfd3c1f2fb)
- [a112.黄朴民教授：《孙子兵法》与兵家智慧（完结）](https://pan.quark.cn/s/7d244e918b29)
- [a113.戴建业高能诗词课（完结）](https://pan.quark.cn/s/e1929323bd61)
- [a114.黄执中：成为懂情绪的高效沟通者（完结）](https://pan.quark.cn/s/432b0eaf4c8c)
- [a115.戴建业精讲世说新语（完结）](https://pan.quark.cn/s/6eb5473da20a)
- [a116.刁克利教授：莎士比亚戏剧10讲（完结）](https://pan.quark.cn/s/04315fc2bf20)
- [a117.黎叔家常川菜私教课（完结）](https://pan.quark.cn/s/7a997430677f)
- [a118.多风格头像板绘入门（完结）](https://pan.quark.cn/s/5bb03aa6322a)
- [a119.于赓哲教授：大唐风华人物30讲（完结）](https://pan.quark.cn/s/750a702be107)
- [a120.社交必备：幽默感养成课（完结）](https://pan.quark.cn/s/cee85714b031)
- [a121.毛戈平美妆学院：生活妆容课（完结）](https://pan.quark.cn/s/cedfa0f834e1)
- [a122.卓叔增重：增肌饮食营养课（完结）](https://pan.quark.cn/s/d9ecdfa6ecb1)
- [a123.今天开始画漫画：零基础入门到创作（完结）](https://pan.quark.cn/s/a735a54aa28f)
- [a124.毛戈平美妆学院：小白零基础入门课（完结）](https://pan.quark.cn/s/ea1f68da26f8)
- [a125.方锦龙国乐通识课（完结）](https://pan.quark.cn/s/47ee6712a3a1)
- [a127.年轻人的金融和商业分析课（完结）](https://pan.quark.cn/s/9fcc616bed00)
- [a128. 大神同款定格动画保姆级教学（完结）](https://pan.quark.cn/s/7efe938a9418)
- [a129. AE超能力学院 - 小莫入门到精通（完结）](https://pan.quark.cn/s/d1b000b556d1)
- [a130.北师大曾祥龙：情绪自救课(含训练营)（完结）](https://pan.quark.cn/s/675b36809909)
- [a131.高盛元精读唐诗宋词（完结）](https://pan.quark.cn/s/e956eb853e3e)
- [a132.海洋饼干：21天纤细腰腹训练课（完结）](https://pan.quark.cn/s/24b6ebbb3207)
- [a133.洪兰脑科学课堂：大脑与生活（完结）](https://pan.quark.cn/s/613861564fda)
- [a134.胡sir吉他综合教程：入门到即兴（完结）](https://pan.quark.cn/s/e3cfa2da5741)
- [a135.互联网职业通识20讲（完结）](https://pan.quark.cn/s/4cd27cbab89d)
- [a136.V叔的钢琴基础入门课（完结）](https://pan.quark.cn/s/489c0cb700fa)
- [a137.极速时代的个人竞争力（完结）](https://pan.quark.cn/s/42711b1e0b31)
- [a138.姜振宇：微表情心里应用课（完结）](https://pan.quark.cn/s/6c96c0c5a288)
- [a139.金融学家王巍教授：金融可以创造历史（完结）](https://pan.quark.cn/s/e7caeca56242)
- [a140.精准表达30讲：能成事儿的表达课（完结）](https://pan.quark.cn/s/7ce99ee22c35)
- [a141.李凯教授精读《史记》（完结）](https://pan.quark.cn/s/dd5ccd7bf2eb)
- [a142.李永乐老师：从一到无穷大（完结）](https://pan.quark.cn/s/f0e48f308fd7)
- [a143.六层楼先生：女性健康通识课（完结）](https://pan.quark.cn/s/e8e3067172f1)
- [a144.罗翔：刑法悖论十讲（完结）](https://pan.quark.cn/s/5d074a3c9dae)
- [a145.孟庆延：经典社会学思想20讲（完结）](https://pan.quark.cn/s/edc103046128)
- [a146.胖雪人的声音魔法课（完结）](https://pan.quark.cn/s/44ec5795c94e)
- [a147.彭弘Red摄影零基础相机入门课程（完结）](https://pan.quark.cn/s/921d99e99f96)
- [a148.千秋兴亡：葛剑雄讲中国史（上下）（完结）](https://pan.quark.cn/s/01c2308a8a8a)
- [a149.人大吴征宇教授：现代国际秩序的变迁（完结）](https://pan.quark.cn/s/a53ac4212919)
- [a150.人像摄影实战训练营（完结）](https://pan.quark.cn/s/326c8080462c)
- [a151.申古博：中国传统壁画课25讲（完结）](https://pan.quark.cn/s/6f4d57afb178)
- [a152.算法面试通关40讲（完结）](https://pan.quark.cn/s/d30c50a8119a)
- [a153.台湾大学孙中兴教授讲经典社会学（完结）](https://pan.quark.cn/s/581c88632840)
- [a154.台湾大学苑举正教授的财经哲学课（完结）](https://pan.quark.cn/s/a8d0d7431f9d)
- [a155.杨宁老师的文学启示课（完结）](https://pan.quark.cn/s/127cd19cb148)
- [a156.一站式手绘色彩指南（完结）](https://pan.quark.cn/s/b5ff9065eabe)
- [a157.张策的短视频创作课（完结）](https://pan.quark.cn/s/ed6d1f34764b)
- [a158.卓叔增重：增肌入门教学课（完结）](https://pan.quark.cn/s/f48536040568)
- [a159.欧阳春晓：28天根本性减脂课程（完结）](https://pan.quark.cn/s/9382f05117f3)
- [a160.28天增肌减脂，居家打造黄金比例身材（完结）](https://pan.quark.cn/s/835a5809603f)
- [a161.王者荣耀：萌新射手如何冲击传奇王者（完结）](https://pan.quark.cn/s/cf2fe73ae819)
- [a162.中国美术学院吕澎：中国现代艺术史](https://pan.quark.cn/s/c2853c98cf12)
- [a163.闫帅奇·28天极速减脂计划（完结）](https://pan.quark.cn/s/d2b7a6da5abb)
- [a164.陈老师 手机影像创作实战课程：从入门到精通（完结）](https://pan.quark.cn/s/eb37372a98d1)
- [a165.从0开始的PPT高手修神记（完结）](https://pan.quark.cn/s/dc242dd6fe69)
- [a166.大神教你玩转手机摄影，随手拍出好照片（完结）](https://pan.quark.cn/s/e8c1dbbe5c14)
- [a167.街舞（爵士舞）基本功打卡课_谭老师（完结）](https://pan.quark.cn/s/ffdaa11c2b9d)
- [a168.六斗米短视频脚本文案策划十三式（完结）](https://pan.quark.cn/s/3c8c64299b31)
- [a169.旁门左道八合一PPT一站式系统课程（完结）](https://pan.quark.cn/s/212989eb3013)
- [a170.邵彦：中国古代绘画通识课（完结）](https://pan.quark.cn/s/82a5552c41c4)
- [a171.申一帆：学科提分攻略（完结）](https://pan.quark.cn/s/9fb526e9edbb)
- [a172.宋浩普林斯顿微积分读本(修订版)224节（完结）](https://pan.quark.cn/s/01cf9842ab3a)
- [a173.乔伯伯：5500词汇系统课（完结）](https://pan.quark.cn/s/cbf5a410c884)
- [a173.野川社：平面基础视觉设计课（完结）](https://pan.quark.cn/s/2051b1c0ea7b)
- [a174.Mai  2022说唱音乐大师课（完结）](https://pan.quark.cn/s/7f2d73aebf27)
- [a175.Pro Shot：15天三分完全指南（完结）](https://pan.quark.cn/s/2017e22928d6)
- [a176.CoachFui：篮球核心力量技巧训练課程](https://pan.quark.cn/s/cc9b91ec1495)
- [a177.CoachFui：第二季篮球核心力量技巧训练課程](https://pan.quark.cn/s/de7065d2ee1a)
- [a178.CoachFui：第二季新单动投篮训练课程](https://pan.quark.cn/s/aa3fc178630e)
- [a179.CoachFui：第三季新单动投篮课【库里系列】](https://pan.quark.cn/s/558b2727b630)
- [a200.现代社会秩序背后的科技商业史（更新中）](https://pan.quark.cn/s/d4bb8092c52a)
- [a201. 上外顾悦教授：终极英语口语课（完结）](https://pan.quark.cn/s/c86c24177e0f)
- [a202.一门给年轻人的恋爱成长课（完结）](https://pan.quark.cn/s/7efd62e58d09)
- [a203.南开大学张俊山教授讲《资本论》【完结】](https://pan.quark.cn/s/7b75c5d34432)
- [a204.浙江大学蒋文华老师讲博弈论（完结）](https://pan.quark.cn/s/2416e29dae7f)
- [a205.度阴山讲阳明心学：教你修炼强大内心【完结】](https://pan.quark.cn/s/4cc6012ad0e8)
- [a206.不刷题的吴姥姥：牛顿爱因斯坦的时空观（完结）](https://pan.quark.cn/s/53d2871badb9)
- [a207.卓叔增重：12周家庭增肌循环计划【完结】](https://pan.quark.cn/s/02e5b16b0704)
- [a208.图灵的猫：人人都能听懂的AI通识课-[B站]](https://pan.quark.cn/s/51a6c6f71e51)
- [a209.地下王朝：古猫讲中国墓葬史-[B站]【完结】](https://pan.quark.cn/s/ac91e4524dbc)
- [a210.苑举正：从东西方文化冲突，看大国博弈](https://pan.quark.cn/s/8d2ac04ad300)
- [a211.奇妙流行声乐课堂：从零开始学唱歌](https://pan.quark.cn/s/92b86071ddef)
- [a212.被低估的王朝：隋朝改革的成与败（完结）](https://pan.quark.cn/s/1f8d3baef675)
- [a213.智慧与谋略：精讲《鬼谷子》](https://pan.quark.cn/s/643c2bea7e94)
- [a214.清华大学靳卫萍老师：看懂宏观经济大势（完结）](https://pan.quark.cn/s/b5435e3fb2f5)
- [a215.理性的惊悚：张志浩解读悬疑推理小说](https://pan.quark.cn/s/1a24f8765df0)
- [a216.人大毛立平教授：纵观清史二十讲（完结）](https://pan.quark.cn/s/2b356d2ab803)
- [a217.鬼谷的生物演化课-[B站]](https://pan.quark.cn/s/9d67d1d5e9bc)
- [a218.刘擎哲学大师课（完结）](https://pan.quark.cn/s/eb7eb4c9d588)
- [a219.中美未来十年经济大博弈之20大推演-[B站]](https://pan.quark.cn/s/01310df62383)
- [a220.拓展三倍人生：庆澄的电影权谋赏析课-[B站]](https://pan.quark.cn/s/0a7537c6c00b)
- [a221.许倬云讲中国通史：五千年大格局-[B站]](https://pan.quark.cn/s/ea52adf977a6)
- [a222.刘谦第一课！零基础魔术教学(完结)](https://pan.quark.cn/s/7ec640a844c2)
- [a223.古典文学大师课：从《三国演义》到《金瓶梅》-[B站]](https://pan.quark.cn/s/1e2c3a410245)
- [a224.王受之教授：世界建筑史（现代篇）完结36集](https://pan.quark.cn/s/230918db097a)
- [a225.王受之教授：世界建筑文明史（古典篇）完结37集](https://pan.quark.cn/s/5d06f4358d6c)
- [a226.陈传席教授讲中国艺术史：从上古到南宋(完结)](https://pan.quark.cn/s/402979473a84)
- [a227.珍大户认知世界的经济学155节【完结】](https://pan.quark.cn/s/2c26c37b1b24)
- [a228.松明：玩转压力：积极情绪养成课【完结】](https://pan.quark.cn/s/2b0931263d03)
- [a229.聂辉华教授：基层中国的运行逻辑-[B站]](https://pan.quark.cn/s/142ed6972abf)
- [a230.北大彭吉象教授：中国传统美学（完结）](https://pan.quark.cn/s/e276375b8e93)
- [a231.六神磊磊：跟着金庸学说话（完结）](https://pan.quark.cn/s/746141d81579)
- [a232.费勇讲《金刚经》《心经》：教你断离一切烦恼更新中](https://pan.quark.cn/s/d689c09dee81)
- [a233.珍大户认知世界的经济学155节（完结）](https://pan.quark.cn/s/8176d5b34fcb)
- [a234.央美叶剑青教授：中西方艺术的黄金时代(完结)](https://pan.quark.cn/s/cb0e225d7c23)
- [a235.当代经典摄影20讲：如何理解大师之作（完结）](https://pan.quark.cn/s/37416838dff8)
- [a236.许准的政治经济学课：21世纪重读《资本论》](https://pan.quark.cn/s/b3eacd060c90)
- [a237.莫梦醒零基础也能学：多风格人像摄影系统课（完结）](https://pan.quark.cn/s/acdc0dd718fc)
- [a238.英语名师赖世雄的学习方法论（完结）](https://pan.quark.cn/s/73f233bcb622)
- [a239.柳行长：金融保险通识课-[B站]](https://pan.quark.cn/s/fa4ddede6697)
- [a240.朱老丝：让说话有“逻辑”（完结）](https://pan.quark.cn/s/9723f79ba1ad)
- [a241.温铁军：去西方中心主义的话语建构-[B站]](https://pan.quark.cn/s/b573e4f47942)
- [a242.王一快：简单有趣的自我成长课堂](https://pan.quark.cn/s/5f303a3d6f3c)
- [a243.熊伟零基础书法入门课（完结）](https://pan.quark.cn/s/6e306913f503)
- [a244.周邦琴英语思维训练营（完结）](https://pan.quark.cn/s/0832a437e6d7)
- [a245.熊浩：论文求生12节（完结）](https://pan.quark.cn/s/f41e59027bc2)
- [a246.武汉大学赵林教授的西方哲学课 （完结）](https://pan.quark.cn/s/b844d270f01c)
- [a247.生命的真相：王一方的北大医学人文课-[B站]](https://pan.quark.cn/s/d3773cd3afd1)
- [a248.北师大侯树栋教授：欧洲中世纪史-[B站]](https://pan.quark.cn/s/509746b3b5c9)
- [a249.耿直哥–深度学习必修课：进击算法工程师100节](https://pan.quark.cn/s/4345e26a5163)
- [a250.洪兰识人的艺术(混沌大学)](https://pan.quark.cn/s/09fad6ad4cb4)
- [a251.清华大学靳卫萍老师：中国经济趋势分析](https://pan.quark.cn/s/1806ac89ff69)
- [a252.摄影后期调色：给摄影爱好者的色彩课](https://pan.quark.cn/s/0238758d9080)
- [a253.欧阳春晓：18天体态矫正·腰臀比雕刻（完结）](https://pan.quark.cn/s/7e27e7d9709a)
- [a254.闫帅奇女性马甲线打造减脂瘦肚子方案（完结）](https://pan.quark.cn/s/e336bfd0a4f5)
- [a255.闫帅奇：男性腹肌打造瘦肚子全方案（完结）](https://pan.quark.cn/s/444ca4edaf66)
- [a256.范李猿：14天体态矫正计划【下身篇】（完结）](https://pan.quark.cn/s/1a28ff1c224c)
- [a257.李银河的爱情课：中国青年的情感与婚姻（完结）](https://pan.quark.cn/s/c2c1e08aa4a3)
- [a258.焦雄屏的电影课：世界电影20大名作赏析（完结）](https://pan.quark.cn/s/1f7a0e1e28ce)
- [a259.费俊峰教授：变态心理学20讲](https://pan.quark.cn/s/7155791f49d9)
- [a260.复旦徐英瑾教授：认知世界的20个哲学命题](https://pan.quark.cn/s/878f891a738a)
- [欧阳春晓：30天维密普拉提居家瘦身课](https://pan.quark.cn/s/5cbdad539270)
- [清华大学靳卫萍老师：经济学思维30讲-[B站]](https://pan.quark.cn/s/17be2667d669)`;

const lines = rawInput.split('\n').filter(l => l.trim().length > 0);

const itemsCode: string[] = [];
const seenIds = new Map<string, number>();

lines.forEach((line, idx) => {
  const match = line.match(/^-\s*\[(.*?)\]\((https:\/\/pan\.quark\.cn\/s\/[a-zA-Z0-9]+)\)/);
  if (!match) return;

  const rawTitle = match[1].trim();
  const driveUrl = match[2].trim();

  // 基础 ID
  const codeMatch = rawTitle.match(/^([a-zA-Z0-9]+)\./);
  let baseCode = codeMatch ? codeMatch[1].toLowerCase() : `item${idx + 1}`;
  
  // 处理重复 ID
  const count = (seenIds.get(baseCode) || 0) + 1;
  seenIds.set(baseCode, count);
  const id = count > 1 ? `bilibili-paid-${baseCode}-${count}` : `bilibili-paid-${baseCode}`;

  const cleanTitle = rawTitle.replace(/（完结）|\(完结\)|\(更新中\)|\【完结\】|\[B站\]|-/g, ' ').replace(/\s+/g, ' ').trim();

  // 提炼关键标签
  const tags = ['B站付费课', '名师精品课', '夸克网盘'];
  if (rawTitle.includes('理财') || rawTitle.includes('金融') || rawTitle.includes('经济') || rawTitle.includes('商业') || rawTitle.includes('汇率') || rawTitle.includes('财经')) {
    tags.push('商业金融', '财经通识');
  }
  if (rawTitle.includes('Python') || rawTitle.includes('Java') || rawTitle.includes('Web前端') || rawTitle.includes('编程') || rawTitle.includes('Linux') || rawTitle.includes('算法') || rawTitle.includes('深度学习') || rawTitle.includes('AI') || rawTitle.includes('计算机')) {
    tags.push('IT编程', '计算机技术');
  }
  if (rawTitle.includes('摄影') || rawTitle.includes('剪辑') || rawTitle.includes('PR') || rawTitle.includes('C4D') || rawTitle.includes('PS') || rawTitle.includes('AE') || rawTitle.includes('特效') || rawTitle.includes('后期') || rawTitle.includes('设计') || rawTitle.includes('动效')) {
    tags.push('影音剪辑', '视觉设计');
  }
  if (rawTitle.includes('哲学') || rawTitle.includes('史') || rawTitle.includes('历史') || rawTitle.includes('鲁迅') || rawTitle.includes('红楼梦') || rawTitle.includes('唐诗') || rawTitle.includes('文学') || rawTitle.includes('国学') || rawTitle.includes('庄子') || rawTitle.includes('山海经') || rawTitle.includes('诗词')) {
    tags.push('人文社科', '名家通识');
  }
  if (rawTitle.includes('英语') || rawTitle.includes('音标') || rawTitle.includes('口语') || rawTitle.includes('词汇') || rawTitle.includes('语法')) {
    tags.push('英语进阶', '语言学习');
  }
  if (rawTitle.includes('减脂') || rawTitle.includes('塑性') || rawTitle.includes('瘦身') || rawTitle.includes('篮球') || rawTitle.includes('增肌') || rawTitle.includes('体态') || rawTitle.includes('唱歌') || rawTitle.includes('声乐') || rawTitle.includes('吉他') || rawTitle.includes('音乐')) {
    tags.push('个人成长', '生活才艺');
  }

  const teachers = ['简七', '赵峥', '戴锦华', '林超', '王建章', '李兴兴', '傅佩荣', '王骁', '张绍忠', '吴金闪', '钱理群', '金灿荣', '范勇鹏', '陈连山', '方志远', '孙志立', '宋浩', '杨立华', '陆铭', '李淼', '韩茂莉', '包爱民', '于赓哲', '陈平原', '杜素娟', '陈家琪', '许倬云', '刘海龙', '翟东升', '王受之', '马红漫', '刘建清', '张宏杰', '柳肃', '黄江南', '郦波', '陈平', '陈嘉映', '孟晖', '马瑞芳', '戴建业', '姜振宇', '李筠', '黄朴民', '黄执中', '毛戈平', '曾祥龙', '洪兰', '李永乐', '罗翔', '孟庆延', '葛剑雄', '吴征宇', '孙中兴', '苑举正', '杨宁', '张策', '欧阳春晓', '闫帅奇', '范李猿', '赖世雄', '温铁军', '熊浩', '赵林', '靳卫萍', '李银河', '焦雄屏', '费俊峰', '徐英瑾', '六神磊磊', '珍大户', '刘谦', '刘擎', '度阴山', '张俊山', '蒋文华'];
  for (const t of teachers) {
    if (rawTitle.includes(t)) {
      tags.push(t);
      break;
    }
  }

  const sizes = ['1.85 GB', '2.40 GB', '3.15 GB', '4.20 GB', '5.60 GB', '2.80 GB', '6.10 GB', '3.75 GB', '4.80 GB'];
  const chosenSize = sizes[idx % sizes.length];
  const sizeBytes = Math.floor(parseFloat(chosenSize) * 1024 * 1024 * 1024);

  const views = 15000 + (idx * 137) % 35000;
  const downloads = Math.floor(views * 0.62);

  const titleWithPrefix = `[B站付费课] ${rawTitle}`;

  itemsCode.push(`  {
    id: ${JSON.stringify(id)},
    title: ${JSON.stringify(titleWithPrefix)},
    mainCategoryId: 'education',
    subCategoryId: 'bilibili_paid',
    subCategoryName: 'B站付费课程大合集',
    subsiteId: 'xuexi',
    subsiteName: '名师精品课与通识认知',
    subsiteUrl: 'http://xuexi.ngy123.com',
    category: 'xuexi',
    categoryName: 'B站精选/名师付费课',
    driveType: 'quark',
    driveName: '夸克网盘',
    driveUrl: ${JSON.stringify(driveUrl)},
    size: ${JSON.stringify(chosenSize)},
    sizeBytes: ${sizeBytes},
    quality: '1080P超清原画/完整讲义课件/完结版',
    publishDate: '2026-09-07 18:00',
    relativeTime: '今日最新',
    isFeatured: ${idx < 15},
    views: ${views},
    downloads: ${downloads},
    tags: ${JSON.stringify(Array.from(new Set(tags)))},
    description: ${JSON.stringify(`【B站付费精品名师课】《${cleanTitle}》完整版视频与配套讲义课件！夸克网盘免密极速转存，涵盖名师系统讲解、案例实战与高阶进阶技巧，支持手机/PC端随时随地流畅学习。`)}
  }`);
});

const fileContent = `import { ResourceItem } from '../types';

/**
 * B站付费精品课程大合集单项资源明细库
 * 归属于：教育与学习类 (education) -> B站付费课程大合集 (bilibili_paid, 编号 02-3)
 * 共收录 ${itemsCode.length} 套完整名师付费课程，全套配备夸克网盘直链
 */
export const BILIBILI_PAID_COURSES: ResourceItem[] = [
${itemsCode.join(',\n')}
];
`;

fs.writeFileSync(path.resolve('src/data/bilibiliCourses.ts'), fileContent, 'utf8');
console.log(`Successfully generated src/data/bilibiliCourses.ts with ${itemsCode.length} courses.`);
