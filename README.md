# 🐴 馬年紅包雨小遊戲 🧧

一個為長輩設計的直式手機紅包收集小遊戲，使用 React + Vite 開發。

## 🎮 遊戲特色

- **財神爺撒紅包**：畫面上方財神爺左右移動，持續撒紅包
- **點擊收集**：點擊紅包收集 100 元，累積金額顯示在下方寶箱
- **30 秒挑戰**：遊戲時間 30 秒，結束後顯示總金額與馬年祝福語
- **長輩友善**：大按鈕、清晰字體、簡單操作

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

### 建置生產版本

```bash
npm run build
```

## ⚙️ 遊戲參數調整

所有遊戲參數都集中在 `src/config.js`，可以調整：

- `envelopeSpawnIntervalMs`：紅包生成間隔（毫秒）
- `envelopeFallDurationMs`：紅包掉落速度（毫秒）
- `godOfWealthSpeed`：財神爺移動速度
- `godOfWealthRange`：財神爺移動範圍
- `gameDurationSeconds`：遊戲時長（秒）
- `scorePerEnvelope`：每個紅包分數

## 📱 使用建議

- 最佳體驗：在手機直式模式下遊玩
- 橫式模式會顯示提示訊息要求轉為直式
- 最大寬度 430px，自動置中

## 🎨 自訂圖片（可選）

目前遊戲使用 emoji 作為圖示：
- 財神爺：🤑
- 紅包：「福」字 + CSS 樣式
- 寶箱：💰

如果想使用自訂圖片，可以：

1. 準備圖片檔案：
   - `public/red-envelope.png`（紅包小圖）
   - `public/god-of-wealth.png`（財神爺圖）

2. 修改對應元件：
   - **紅包**：修改 `src/components/RedEnvelope.jsx`，將 `<div className="envelope-content">` 改為 `<img src="/red-envelope.png" alt="紅包" />`
   - **財神爺**：修改 `src/components/GodOfWealth.jsx`，將 `<div className="god-icon">🤑</div>` 改為 `<img src="/god-of-wealth.png" alt="財神爺" />`

## 📂 專案結構

```
src/
├── App.jsx                 # 主應用，控制遊戲階段
├── config.js               # 遊戲參數設定
├── components/
│   ├── Home.jsx           # 首頁
│   ├── Game.jsx           # 遊戲畫面
│   ├── GodOfWealth.jsx    # 財神爺元件
│   ├── RedEnvelope.jsx    # 紅包元件
│   └── Result.jsx         # 結果頁
└── data/
    └── blessings.js       # 馬年祝福語
```

## 🎯 遊戲玩法

1. 點擊「開始遊戲」
2. 畫面上方財神爺左右移動並撒紅包
3. 點擊紅包收集，每個 +100 元
4. 紅包落地會消失
5. 30 秒後顯示總金額與祝福語
6. 可點擊「再玩一次」重新開始

## 🧧 祝福語

根據分數不同，會顯示不同的馬年祝福：
- 3000+ 元：「馬年行大運，恭喜發財」
- 2000+ 元：「龍馬精神，萬事如意」
- 1000+ 元：「馬到成功，新年快樂」
- 500+ 元：「一馬當先，福氣滿滿」
- 100+ 元：「馬上有錢，心想事成」
- 其他：「馬年吉祥，財源廣進」

## 📄 授權

本專案供個人使用與學習。

---

祝您玩得開心，馬年大吉！🎊
