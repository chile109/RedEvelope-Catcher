// 馬年祝福語
export const BLESSINGS = [
  '馬年行大運，恭喜發財',
  '龍馬精神，萬事如意',
  '馬到成功，新年快樂',
  '一馬當先，福氣滿滿',
  '馬上有錢，心想事成',
  '馬年吉祥，財源廣進',
];

// 根據分數獲取不同的祝福語
export const getBlessingByScore = (score) => {
  if (score >= 3000) {
    return BLESSINGS[0]; // 馬年行大運，恭喜發財
  } else if (score >= 2000) {
    return BLESSINGS[1]; // 龍馬精神，萬事如意
  } else if (score >= 1000) {
    return BLESSINGS[2]; // 馬到成功，新年快樂
  } else if (score >= 500) {
    return BLESSINGS[3]; // 一馬當先，福氣滿滿
  } else if (score >= 100) {
    return BLESSINGS[4]; // 馬上有錢，心想事成
  } else {
    return BLESSINGS[5]; // 馬年吉祥，財源廣進
  }
};
