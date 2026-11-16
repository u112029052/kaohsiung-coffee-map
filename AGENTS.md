# AGENTS.md - 港都咖啡散策｜高雄地區咖啡廳分布指南開發規範

## 1. 專案概述與目的
本專案是一個結合 **LLM Wiki 知識庫模式** 與 **靜態網頁展示（GitHub Pages）** 的「高雄地區咖啡廳分布整理網站」。
本專案的核心目標不是單次生成網頁，而是建立一套**高度模組化、結構嚴謹且可持續擴充的自動化工作流**。AI 代理人在協助讀取原始資料、維護 Wiki 筆記或新增行政區與咖啡廳網頁時，必須嚴格遵守本文件的設計系統、檔案結構與資料格式，確保全站視覺與知識庫內容完全一致。

---

## 2. 系統三層架構 (LLM Wiki Architecture)
本專案採用三層式知識編譯架構，所有資料流動必須遵循單向編譯與雙向同步原則：

1. **原始資料層 (`raw-sources/`)**：
   - 存放未經加工的原始素材（如食記剪藏、IG 貼文文字、訪店隨筆 `.md` 或 `.txt`）。
   - **不可變原則**：AI 僅可讀取此目錄內容，**嚴禁修改或刪除**原始檔案。
2. **知識庫層 (`wiki/`)**：
   - 由 AI 負責建立與維護的結構化 Markdown 知識庫（可直接用 Obsidian 開啟瀏覽關聯圖）。
   - 包含各行政區知識頁（如 `wiki/xinxing.md`、`wiki/lingya.md`）、全站總目錄 `wiki/index.md` 以及時間軸日誌 `wiki/log.md`。
3. **前端展示層 (`index.html`, `districts/*.html`, `css/`, `js/`)**：
   - 將 `wiki/` 中的結構化咖啡廳資料編譯為「日系文青 / 暖調紙質感」靜態網頁，供使用者在瀏覽器篩選與查閱。

---

## 3. 視覺風格與設計系統 (Design System)
整體風格定位為**「日系文青 / 暖調紙質感」**，營造閱讀紙本咖啡誌的溫潤感受。所有樣式皆統一管理於 `css/style.css` 的 CSS 變數中，**嚴禁在 HTML 中使用 `style="..."` 行內樣式**。

### 色彩規範 (CSS Variables)
- `--bg-paper`: `#FAF7F2`（全站主背景：暖米白紙張色）
- `--bg-card`: `#FFFFFF`（卡片底色：純白）
- `--text-primary`: `#3E2F26`（主要文字：深焙咖啡色）
- `--text-secondary`: `#7A6A5E`（次要說明文字：淺褐灰）
- `--accent-caramel`: `#C87D55`（重點強調與按鈕：焦糖橘）
- `--accent-matcha`: `#7D8E74`（次要標籤與狀態：抹茶綠）
- `--border-warm`: `#E8DFD5`（卡片邊框與分隔線：暖沙色）

### 排版與元件規範
- **字體**：標題使用襯線體（`Noto Serif TC`, serif）帶出文藝感；內文與資訊標籤使用無襯線體（`Noto Sans TC`, sans-serif）確保易讀性。
- **卡片設計**：圓角 `12px`，具備 `1px solid var(--border-warm)` 細邊框與極柔和的暖色陰影（`0 4px 12px rgba(62, 47, 38, 0.05)`）。
- **響應式網格 (Grid)**：桌面版每列顯示 3 張卡片（`repeat(auto-fill, minmax(310px, 1fr))`），手機版自動轉為單欄。

---

## 4. 目錄結構與命名規則
所有檔案與資料夾命名一律採用 **全小寫英文與連字號 (`kebab-case`)**，嚴禁使用中文檔名或空格。

```text
kaohsiung-coffee-map/
├── AGENTS.md                  # 本專案核心規則書（AI 每次任務必讀）
├── README.md                  # GitHub 專案說明文件
├── index.html                 # 網站首頁：高雄行政區入口總覽
├── css/
│   └── style.css              # 全站共用樣式表
├── js/
│   └── filter.js              # 行政區頁面的特色標籤篩選腳本
├── districts/                 # 高雄各行政區專屬網頁
│   ├── xinxing.html           # 新興區
│   └── lingya.html            # 苓雅區（新增行政區請依此類推）
├── wiki/                      # LLM Wiki 知識庫（Markdown 格式）
│   ├── index.md               # Wiki 內容總目錄（按行政區分類）
│   ├── log.md                 # Wiki 與網頁更新日誌（按時間倒序或追加）
│   ├── xinxing.md             # 新興區咖啡廳知識筆記
│   └── lingya.md              # 苓雅區咖啡廳知識筆記
└── raw-sources/               # 原始未加工資料存放區
    └── batch-01-kaohsiung.md  # 第一批原始資料紀錄
```

---

## 5. 頁面結構與新增內容格式

### A. 首頁 (`index.html`)
1. **Header**：網站標題（《港都咖啡散策｜高雄地區咖啡廳分布誌》）與簡短副標。
2. **行政區卡片網格 (`.district-grid`)**：每個已建立的行政區對應一張 `.district-card`，包含：
   - 行政區名稱（如：新興區 Xinxing）
   - 區域氛圍一句話描述（限 20 字內）
   - 收錄店家數量徽章（格式固定為：`已收錄 X 間`）
   - 連結至 `districts/<district-name>.html`

### B. 行政區專頁 (`districts/<district-name>.html`)
1. **導覽列 (Breadcrumb)**：`首頁 > [行政區名稱]`，提供返回首頁的連結。
2. **區域簡介與篩選列 (`.filter-bar`)**：提供按鈕讓使用者依標籤即時篩選，固定包含以下 6 個篩選選項：
   `全部`、`適合唸書`、`不限時`、`有插座`、`老宅改造`、`深夜咖啡`
3. **咖啡廳卡片網格 (`.cafe-grid`)**：每新增一間咖啡廳，必須複製以下標準 HTML 結構（`.cafe-card`），**嚴格維持 4 項資訊欄位**，不可隨意增減：

```html
<article class="cafe-card" data-tags="適合唸書,不限時,有插座">
  <div>
    <div class="cafe-header">
      <h3 class="cafe-name">店家名稱</h3>
      <div class="cafe-tags">
        <span class="tag study-tag">適合唸書</span>
        <span class="tag">不限時</span>
        <span class="tag">有插座</span>
      </div>
    </div>
    <ul class="cafe-info">
      <li><strong>地址：</strong>高雄市某某區某某路123號</li>
      <li><strong>營業：</strong>10:00 - 18:00（週二公休）</li>
      <li><strong>特色餐點：</strong>手沖單品、焦糖布丁、巴斯克乳酪</li>
      <li><strong>適合唸書：</strong>推薦（座位寬敞、Wi-Fi 穩定、多數座位附插座）</li>
    </ul>
    <p class="cafe-note">
      （限 50～80 字的短評筆記，描述空間氛圍、採光或味覺體驗，維持卡片高度一致。）
    </p>
  </div>
  <a href="https://maps.google.com/?q=店家名稱+高雄" target="_blank" rel="noopener" class="btn-map">
    在 Google Maps 查看 →
  </a>
</article>
```

#### 欄位填寫統一標準
- **特色餐點**：列出 2～3 項招牌飲品或甜點，以頓號（`、`）分隔，總長度控制在 20 字以內。若原始資料未提及，標註為 `待訪店補充（可先參考店家菜單）`。
- **適合唸書**：開頭必須統一使用**「推薦」**、**「普通」**、**「不推薦」**或**「待實測」**四種狀態之一，後方以括號補充具體原因。若標註為「推薦」，則 `data-tags` 與 `<span class="tag">` 必須同步加上 `適合唸書` 標籤。

---

## 6. AI 標準作業程序與強制規則 (Operations & Guardrails)

### 操作一：Ingest（吸收新資料並更新全站）
當使用者提供新咖啡廳資訊或要求讀取 `raw-sources/` 中的新檔案時，AI 必須依序完成以下 5 個步驟：
1. **歸檔原始素材**：將使用者提供的新素材完整保存至 `raw-sources/`，嚴禁篡改原文。
2. **萃取結構化資訊**：依行政區分類，萃取出「店名、行政區、地址、營業時間、特色餐點、唸書友善度評價、標籤（最多 3 個）」與「50～80 字短評」。
3. **更新 Wiki 筆記、索引與日誌**：
   - 將該店寫入對應的 `wiki/<district>.md`（若為新行政區則建立新 `.md` 檔）。
   - 更新 `wiki/index.md` 中的目錄與收錄數量。
   - 在 `wiki/log.md` 頂部追加一筆紀錄，格式為：`## [YYYY-MM-DD] ingest | <行政區> - <店家名稱>`。
4. **編譯前端網頁**：將該店卡片加入 `districts/<district>.html`（若為新行政區，則複製既有行政區模板建立新頁面）。
5. **雙向同步更新首頁（關鍵！）**：
   - 若新增了行政區頁面，**必須同步在 `index.html` 的 `.district-grid` 新增對應入口卡片**。
   - 無論新增行政區或僅新增單一店家，**必須同步更新 `index.html` 該行政區卡片上的「已收錄 X 間」數字**。

### 操作二：Lint（知識庫與網頁健康檢查）
當使用者要求執行 `Lint` 時，AI 必須檢查：
1. `wiki/` 與 `districts/*.html` 的店家數量及內容是否一致。
2. `index.html` 顯示的「已收錄 X 間」是否與各區實際卡片數相符。
3. 每張 `.cafe-card` 的 `data-tags` 是否與內部 `<span class="tag">` 完全一致，且「適合唸書：推薦」的店家皆已掛上 `適合唸書` 標籤。
4. 所有連結路徑是否正確無死鏈，並將檢查結果寫入 `wiki/log.md`（格式：`## [YYYY-MM-DD] lint | 檢查摘要`）。

### 程式碼與樣式禁令
- **嚴禁修改 CSS 變數名稱或破壞現有響應式網格結構**。
- **嚴禁使用行內樣式 (`style="..."`)**，所有新元件必須沿用 `css/style.css` 定義的 class。
