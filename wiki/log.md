# LLM Wiki 更新與編譯日誌 (Log)

本檔案採用追加寫入模式（Append-only），記錄每次 `ingest`（新資料吸收）與 `lint`（知識庫健康檢查）操作。

## [2026-11-17] lint | 首批真實店家匯入一致性檢查通過
- 檢查範圍：`raw-sources/batch-01-kaohsiung.md`、`wiki/index.md`、`wiki/xinxing.md`、`wiki/lingya.md` 與前端網頁 `index.html`、`districts/xinxing.html`、`districts/lingya.html`。
- 結果：新興區（2 間）與苓雅區（1 間）數量完全同步，所有 `data-tags` 與顯示標籤一致。

## [2026-11-17] ingest | 苓雅區 - 覓心手沖咖啡
- 依據 `raw-sources/batch-01-kaohsiung.md` 新增店家至 `wiki/lingya.md`，編譯至 `districts/lingya.html` 並更新首頁計數。

## [2026-11-17] ingest | 新興區 - 一盞咖啡
- 依據 `raw-sources/batch-01-kaohsiung.md` 新增店家至 `wiki/xinxing.md`，編譯至 `districts/xinxing.html` 並更新首頁計數。

## [2026-11-17] ingest | 新興區 - 鹿聊 Lu liao
- 依據 `raw-sources/batch-01-kaohsiung.md` 建立新興區知識頁 `wiki/xinxing.md` 與 `districts/xinxing.html`，同步新增首頁入口卡片。
