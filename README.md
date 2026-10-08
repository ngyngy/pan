# 网盘吧 (Wangpan8) - 网盘资源聚合与极速搜索平台 🚀

<div align="center">

[![Website](https://img.shields.io/badge/官网直达-www.wangpan8.com-0066FF?style=flat-square&logo=safari&logoColor=white)](https://www.wangpan8.com)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.1-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](./LICENSE)

**极简、轻量、响应迅速的跨平台网盘资源聚合检索站**  
汇聚夸克网盘、百度网盘、UC网盘、迅雷云盘、移动云盘等多渠道海量优质资源，内置自动化静态 SEO 生成引擎。

[在线演示](https://www.wangpan8.com) · [功能特性](#-核心特性) · [快速开始](#-快速开始) · [SEO与构建](#-seo-与自动化生成) · [项目结构](#-项目目录结构) · [免责声明](#-免责声明)

</div>

---

## 📖 项目简介

**网盘吧 (Wangpan8)** 是一个基于 **React 19 + TypeScript + Vite 6 + Tailwind CSS v4** 构建的高性能网盘资源搜索与分类索引门户。

针对日常网盘资源分散、搜索繁琐、提取码查找不便等痛点，本项目提供了**毫秒级客户端全文检索**、**网盘渠道精准筛选**、**仿云盘目录树层级浏览**以及**K12中小学全科体系化导航**。同时内置强大的预渲染构建脚本，支持自动生成**规范化 SEO 独立落地页**、**Canonical 主域名锚定**、**Schema.org 结构化微数据**与**XML/HTML 网站地图**，便于搜索引擎收录与收发分享。

---

## ✨ 核心特性

- ⚡ **毫秒级极速检索**：纯客户端响应式全文秒搜，支持资源标题、标签、格式属性、分类及提取码即时高亮匹配。
- 🗂️ **双模式浏览体验**：
  - **目录树视图 (Folder Directory View)**：模拟网盘树状结构，按影视短剧、书籍文献、学习课件、精选游戏、无损音乐等大类多级逐层钻取。
  - **表格/卡片展示 (Resource Table)**：紧凑且信息密度高的资源列表，一键排序、分类筛选与分页加载。
- 🎓 **中小学教育学科学段专区**：针对小学、初中、高中（K12）阶段定制化学科知识树导航，课件、真题试卷、名师录播一键触达。
- 📦 **多网盘生态覆盖**：全面支持夸克网盘、百度网盘、UC网盘、迅雷云盘、移动云盘等渠道筛选与标志识别。
- 📋 **一键提取与转存**：内置智能剪贴板交互，一键复制链接与提取码，支持快速直达官方云盘转存。
- 🌓 **现代感 UI & 深色模式**：遵循 Tailwind CSS v4 与现代微交互设计规范，自动适配系统深色外观并支持手动持久化切换。
- 🚀 **全自动 SEO / GEO 静态化流水线**：
  - 构建时通过 Node/tsx 自动为数千条资源生成独立 HTML 详情落地页；
  - 自动注入 `Canonical` 规范主域名标记（杜绝多域名镜像惩罚）；
  - 自动生成 Google/Bing 兼容的 `JSON-LD (BreadcrumbList & TechArticle)` 结构化微数据；
  - 自动输出 `sitemap.xml` 与用户友好的 `sitemap.html`。
- 💬 **互动与社群功能**：内置求资源反馈、失效报错、热门资源榜单弹窗、多站点聚合门户与官方交流群引导。
- 📱 **全终端响应式 & PWA 友好**：适配手机移动端（支持 Safe-Area 视口边距）、平板与桌面大屏。

---

## 🛠️ 技术选型

| 模块 | 技术方案 | 简述 |
| :--- | :--- | :--- |
| **前端核心** | React 19 + TypeScript 5.8 | 最新 React 特性与全链路强类型保障 |
| **构建工具** | Vite 6.2 | 极速冷启动、Rollup 优化打包与模块热重载 |
| **样式方案** | Tailwind CSS v4 + @tailwindcss/vite | 现代 CSS 变量引擎与工具类样式 |
| **图标与动效** | Lucide React + Motion | 矢量图标集与平滑过渡动画 |
| **SEO 预渲染** | Node.js + tsx + 自研生成器脚本 | 构建前自动化提取数据集并渲染静态 SEO 文件 |
| **代码规范** | TypeScript (`tsc --noEmit`) | 静态类型校验确保代码稳健 |

---

## 📂 项目目录结构

```text
wangpan8/
├── public/                       # 静态公共资源
│   ├── favicon.svg               # 站点 SVG 矢量图标
│   ├── logo-icon.svg             # 品牌 Logo 图标
│   ├── robots.txt                # 搜索引擎爬虫抓取规则
│   └── site.webmanifest          # PWA 清单配置
├── scripts/                      # 自动化构建与数据脚本
│   ├── generate-seo-pages.ts     # 静态 SEO 独立页及站点地图生成器
│   └── parse-bilibili.ts         # 课程数据解析与同步辅助脚本
├── src/
│   ├── components/               # UI 组件集合
│   │   ├── Header.tsx            # 顶部导航与品牌栏
│   │   ├── TopSearchBar.tsx      # 核心搜索框与快捷热词
│   │   ├── FilterToolbar.tsx     # 多网盘/排序/属性筛选工具条
│   │   ├── FolderDirectoryView.tsx # 树状多层级目录导航视图
│   │   ├── SchoolSubjectHierarchyView.tsx # K12学段学科层级专区
│   │   ├── ResourceTable.tsx     # 资源卡片/列表主体展示
│   │   ├── ResourceDetailModal.tsx # 资源详情与转存弹窗
│   │   ├── SubsitesBar.tsx       # 聚合子站横条与入口
│   │   ├── HotRankModal.tsx      # 热门资源排行榜弹窗
│   │   ├── RequestResourceModal.tsx # 求片与需求反馈模态框
│   │   ├── QQGroupModal.tsx      # 官方社群入群弹窗
│   │   ├── Footer.tsx            # 页面底部版权与友情链接
│   │   └── Toast.tsx             # 交互轻提示通知容器
│   ├── data/                     # 静态资源数据集
│   │   ├── resources.ts          # 资源汇总导出口
│   │   ├── categories.ts         # 栏目分类字典与目录层级树
│   │   ├── subsites.ts           # 推荐站点与友好链接数据
│   │   └── ...                   # 各主题分册数据 (影视/图书/游戏/课件)
│   ├── utils/                    # 实用工具函数
│   │   ├── canonical.ts          # 动态校准与同步 Canonical 标签
│   │   └── shareUtils.ts         # 社交分享文本与落地页 URL 格式化
│   ├── types.ts                  # 全局 TypeScript 接口定义
│   ├── App.tsx                   # 根应用主视图与状态中枢
│   ├── main.tsx                  # 应用入口点
│   └── index.css                 # 全局 Tailwind CSS 样式
├── index.html                    # 首页 HTML 模板与基础 Meta 信息
├── metadata.json                 # 项目平台元数据配置
├── package.json                  # 项目依赖与运行脚本
├── tsconfig.json                 # TypeScript 编译配置
└── vite.config.ts                # Vite 配置文件
```

---

## 🚀 快速开始

### 1. 环境准备

确保您的本地环境已安装：
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (或 `pnpm` / `yarn` / `bun`)

### 2. 克隆项目与安装依赖

```bash
# 克隆仓库
git clone https://github.com/your-username/wangpan8.git

# 进入项目目录
cd wangpan8

# 安装依赖
npm install
```

### 3. 本地开发调试

```bash
npm run dev
```

运行后，打开浏览器访问控制台提示的地址（默认: `http://localhost:3000`）。

### 4. 生产打包构建

```bash
# 执行自动化 SEO 生成并完成生产级打包
npm run build
```

打包完成后，输出产物位于 `dist/` 目录，可直接托管于任何静态服务器上。

---

## 🛠️ 可用脚本指令

在项目根目录下，您可以执行以下指令：

| 指令 | 说明 |
| :--- | :--- |
| `npm run dev` | 启动 Vite 本地开发服务器（默认端口 3000） |
| `npm run build` | 先运行 `build:seo` 生成静态落地页与 Sitemap，再执行 `vite build` 打包发布 |
| `npm run build:seo` | 单独触发执行 `scripts/generate-seo-pages.ts` 静态预渲染脚本 |
| `npm run preview` | 本地预览构建后的生产包效果 (`dist/`) |
| `npm run lint` | 运行 TypeScript 语法与类型无报错校验 (`tsc --noEmit`) |
| `npm run clean` | 清理打包缓存与临时生成文件 |

---

## 🌐 SEO 与自动化生成机制

本项目配备针对现代搜索引擎及 GEO (Generative Engine Optimization) 定制优化的静态生成流水线：

1. **执行方式**：  
   运行 `npm run build:seo` 或 `npm run build` 时，系统会自动读取 `src/data/resources.ts` 和分类数据。
2. **生成物**：
   - `public/resource/*.html`：每个资源的专属独立高质静态页面，内嵌 OpenGraph、Twitter Card、规范化 Canonical 链接及 JSON-LD 结构化标签。
   - `public/category/*.html`：各大分类归档列表静态页。
   - `public/sitemap.xml`：符合标准的 XML 格式网站地图，包含更新频率与权重。
   - `public/sitemap.html`：面向终端访客的网页版网站索引地图。
3. **主域名锚定 (Canonical)**：  
   通过 `canonical.ts` 与 HTML 模版自动将外部多解析域名规范指向 `https://www.wangpan8.com`，集中搜索权重，防范镜像降权风险。

---

## 📝 资源数据维护指南

若需添加、删除或修改网盘资源，可直接前往 `src/data/` 目录下的相关文件：

1. **新增资源项**：  
   打开对应模块文件（如 `src/data/featuredQuarkUpdates.ts` 或 `src/data/popularGamesResources.ts`），按 `ResourceItem` 格式添加：

   ```typescript
   {
     id: 'game-black-myth-wukong',
     title: '《黑神话：悟空》官方数字豪华版 全DLC免安装中文绿色版',
     description: '国产西游动作角色扮演大作，内置着色器优化补丁与多语言支持。',
     panUrl: 'https://pan.quark.cn/s/xxxxxx',
     extractCode: '', // 提取码，无提取码留空即可
     driveType: 'quark', // 可选 'quark' | 'baidu' | 'uc' | 'xunlei' | 'yidong' | 'other'
     driveName: '夸克网盘',
     mainCategoryId: 'games',
     subCategoryKey: 'pc-3a',
     category: '单机游戏',
     tags: ['动作冒险', '3A大作', '免安装版'],
     quality: '4K/HDR',
     size: '128.5GB',
     date: '2026-09-08',
     isFeatured: true
   }
   ```

2. **重新构建**：  
   执行 `npm run build`，新增加的资源将自动同步到前端交互列表并生成专属的 SEO 页面。

---

## 🚢 部署与托管

由于本项目为标准现代静态网页（SPA + 静态预渲染页面），可以极其轻量地部署在几乎所有现代化云托管平台：

### 推荐部署方案

- **Vercel / Netlify / Cloudflare Pages**：
  - 构建命令 (Build Command): `npm run build`
  - 输出目录 (Output Directory): `dist`
- **Nginx 经典配置**：
  ```nginx
  server {
      listen 80;
      server_name www.wangpan8.com wangpan8.com;
      root /path/to/wangpan8/dist;
      index index.html;

      # 静态落地页优先读取，其余路由兜底至 index.html
      location / {
          try_files $uri $uri/ /index.html;
      }

      # 静态资源缓存加速
      location ~* \.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff2)$ {
          expires 30d;
          add_header Cache-Control "public, no-transform";
      }
  }
  ```

---

## ⚠️ 免责声明

1. 本项目作为开源资源聚合与搜索前端模板，仅用于**学习交流、个人技术研究及静态建站实践**。
2. 项目中所展示的资源链接、提取码及内容索引均来源于网络第三方公开分享链接，本项目与本仓库**不存储、不上载、不制作、不修改任何实际网盘文件或实体数据**。
3. 任何通过本平台获取的信息及链接，请在下载后 24 小时内删除，请勿用于任何商业盈利活动。
4. 如相关权利人认为所链接的内容侵犯了其合法权益，请联系处理，平台将在核实后依法及时移除相应索引链接。

---

## 🤝 贡献与支持

欢迎提交 Issue 与 Pull Request！

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'feat: 增加全新网盘筛选支持'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

---

## 📄 开源许可证

本项目基于 [MIT 许可证](./LICENSE) 开源。欢迎自由使用、学习与二次创作。
