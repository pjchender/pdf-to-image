# PDF to Image

- 將要轉換的 PDF 檔放到 `/src/inputs` 中
- 需要根據 PDF 的解析度調整輸出的圖檔尺寸（在 `index.ts` 中的 `dimension` 參數），需要的話亦可改變圖檔格式（例如，png、jpg）
- 執行 `npm run dev`
- 解析完的檔案會保存在 `/src/outputs` 中
