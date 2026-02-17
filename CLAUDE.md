# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 常用指令

```bash
pnpm install          # 安裝依賴
pnpm run dev          # 啟動開發伺服器 (localhost:4321)
pnpm run build        # 正式環境建置
pnpm run preview      # 預覽建置結果
```

套件管理器為 pnpm（版本 10.8.0）。無測試或 lint 指令。

## 架構

基於 Astro 4 的個人作品集與部落格網站，使用 Astrofy 模板。靜態網站生成（非 SSR），部署至 GitHub Pages。

### 技術棧

- **Astro 4** + MDX — 靜態網站框架與內容撰寫
- **TailwindCSS 3** + **DaisyUI 4** — 樣式與元件（主題：lofi，於 `BaseLayout.astro` 的 `data-theme` 設定）
- **dayjs** — 日期處理
- **sharp** — 圖片最佳化

### 佈局系統

採用側邊欄抽屜式佈局：手機端以漢堡選單觸發，桌面端常駐顯示。

- `BaseLayout.astro` — 所有頁面的根佈局，透過 `sideBarActiveItemID` prop 控制側邊欄目前選中項目
- `PostLayout.astro` — 部落格文章頁佈局
- `StoreItemLayout.astro` — 商品詳細頁佈局

新增頁面時需同步在 `SideBarMenu.astro` 加入導覽連結，並在頁面的 `BaseLayout` 設定對應的 `sideBarActiveItemID`。

### 內容集合

使用 Astro Content Collections，schema 定義於 `src/content/config.ts`：

- **blog/**（`.md`）— 必填：title、description、pubDate；可選：heroImage、badge、tags（需唯一）
- **store/**（`.md`）— 必填：title、description、custom_link_label、updatedDate

### 路由與分頁

- `/blog/[...page].astro` — 部落格列表，每頁 10 篇
- `/blog/[slug].astro` — 單篇文章
- `/blog/tag/[tag]/[...page].astro` — 依標籤篩選
- `/store/[...page].astro` 與 `/store/[slug].astro` — 商品列表與詳細頁

### Slug 生成

`src/config.ts` 中 `GENERATE_SLUG_FROM_TITLE = true` 時，slug 由文章標題透過 `src/lib/createSlug.ts` 產生（小寫、空格轉連字號、移除特殊字元）。設為 `false` 則使用檔名。

### TypeScript 路徑別名

```
@components/* → src/components/*
@layouts/*    → src/layouts/*
```

### 全域設定

`src/config.ts` 管理 SITE_TITLE、SITE_DESCRIPTION、GENERATE_SLUG_FROM_TITLE、TRANSITION_API。

### 部署

GitHub Actions（`.github/workflows/deploy.yml`）於 push 至 `main` 時自動建置並部署至 GitHub Pages。站點 URL：`https://waynetsou85.github.io/`。