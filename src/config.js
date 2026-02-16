// 遊戲參數設定
export const CONFIG = {
  // 紅包生成間隔（毫秒）- 愈小紅包愈密集
  envelopeSpawnIntervalMs: 1500,
  
  // 紅包從頂落到底的耗時（毫秒）- 愈小落得愈快
  envelopeFallDurationMs: 6000,
  
  // 財神爺左右移動速度（像素/秒）
  godOfWealthSpeed: 150,
  
  // 財神爺左右移動範圍（百分比）[left%, right%]
  godOfWealthRange: [10, 90],
  
  // 單局秒數
  gameDurationSeconds: 30,
  
  // 普通紅包的分數
  scorePerEnvelope: 600,
  
  // 金元寶的分數（稀有獎勵）
  scorePerGoldIngot: 1200,
  
  // 金元寶出現機率（0-1，例如 0.15 = 15%）
  goldIngotSpawnRate: 0.1,
  
  // 紅包大小（像素）
  envelopeSize: 150,
  
  // 財神爺大小（像素）
  godOfWealthSize: 200,
};
