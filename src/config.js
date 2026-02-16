// 遊戲參數設定
export const CONFIG = {
  // 紅包生成間隔（毫秒）- 愈小紅包愈密集
  envelopeSpawnIntervalMs: 1000,
  
  // 紅包從頂落到底的耗時（毫秒）- 愈小落得愈快
  envelopeFallDurationMs: 3500,
  
  // 財神爺左右移動速度（像素/秒）
  godOfWealthSpeed: 200,
  
  // 財神爺左右移動範圍（百分比）[left%, right%]
  godOfWealthRange: [10, 90],
  
  // 單局秒數
  gameDurationSeconds: 30,
  
  // 每個紅包的分數
  scorePerEnvelope: 300,
  
  // 紅包大小（像素）
  envelopeSize: 150,
  
  // 財神爺大小（像素）
  godOfWealthSize: 200,
};
