

# AI Market - 应用市场建设方案

## 概述
构建一个名为 "AI Market" 的网页应用市场，支持 PC Web 和手机 H5 响应式布局。用户可以浏览、分类筛选、下载和在线使用 AI 应用。

## 技术决策
- **数据**: 先用静态模拟数据，快速展示页面效果
- **用户系统**: 暂不需要，所有人可直接浏览使用
- **在线使用**: 支持 iframe 内嵌和外链跳转两种方式
- **设计风格**: 科技感深色主题，契合 AI 产品定位

## 页面结构

```text
/                 → 首页（推荐应用 + 分类入口）
/category/:id     → 分类页（按类别筛选应用列表）
/app/:id          → 应用详情页（介绍 + 下载 + 在线使用）
/app/:id/use      → 在线使用页（iframe 嵌入应用）
```

## 要构建的内容

### 1. 全局布局与主题
- 深色科技风配色（深蓝/紫色渐变背景）
- PC 端顶部导航栏 + 手机端底部 Tab 栏
- 搜索栏组件

### 2. 首页
- Hero 横幅展示精选应用
- 分类卡片网格（文本生成、图像处理、数据分析、智能助手等）
- 热门应用列表（卡片形式，显示图标、名称、评分、标签）

### 3. 分类页
- 分类标签筛选栏
- 应用卡片网格，响应式列数（PC 4列，平板 2列，手机 1列）

### 4. 应用详情页
- 应用图标、名称、描述、截图轮播
- 「在线使用」和「下载」按钮
- 应用信息（版本、大小、开发者）

### 5. 在线使用页
- 顶部返回栏
- 全屏 iframe 嵌入应用（或提示跳转外链）

### 6. 模拟数据
- 创建 `src/data/apps.ts`，包含 12+ 个模拟 AI 应用数据
- 包含分类、图标、描述、评分、使用方式等字段

## 文件计划
- `src/data/apps.ts` — 模拟数据
- `src/components/Layout.tsx` — 响应式布局（PC导航/移动底栏）
- `src/components/AppCard.tsx` — 应用卡片组件
- `src/components/CategoryCard.tsx` — 分类卡片
- `src/components/SearchBar.tsx` — 搜索栏
- `src/components/HeroBanner.tsx` — 首页横幅
- `src/pages/Index.tsx` — 首页
- `src/pages/CategoryPage.tsx` — 分类页
- `src/pages/AppDetail.tsx` — 应用详情
- `src/pages/AppUse.tsx` — 在线使用
- `src/index.css` — 深色主题变量更新

