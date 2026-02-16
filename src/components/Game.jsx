import { useState, useEffect, useCallback, useRef } from 'react';
import { CONFIG } from '../config';
import GodOfWealth from './GodOfWealth';
import RedEnvelope from './RedEnvelope';
import './Game.css';

function Game({ onGameEnd }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(CONFIG.gameDurationSeconds);
  const [envelopes, setEnvelopes] = useState([]);
  const [godPosition, setGodPosition] = useState(50);
  const envelopeIdRef = useRef(0);
  const spawnIntervalRef = useRef(null);
  
  // 音效 refs
  const bgmRef = useRef(null);
  const coinSoundRef = useRef(null);

  const godPositionRef = useRef(godPosition);

  // 更新財神爺位置的 ref
  useEffect(() => {
    godPositionRef.current = godPosition;
  }, [godPosition]);

  // 生成紅包（有機率一次拋兩個）
  const spawnEnvelope = useCallback(() => {
    const throwCount = Math.random() < 0.3 ? 2 : 1; // 30% 機率拋兩個
    const newEnvelopes = [];
    
    for (let i = 0; i < throwCount; i++) {
      // 拋物線參數
      let throwDirection;
      let startOffset;
      
      if (throwCount === 2) {
        // 拋兩個時：第一個往左，第二個往右
        throwDirection = i === 0 ? -1 : 1;
        startOffset = i === 0 ? -3 : 3; // 起始位置稍微分開
      } else {
        // 拋一個時：隨機方向
        throwDirection = Math.random() < 0.5 ? -1 : 1;
        startOffset = 0;
      }
      
      const horizontalSpeed = (50 + Math.random() * 100) * throwDirection; // 水平速度 (px/s)
      const throwAngle = 30 + Math.random() * 30; // 拋射角度 30-60度
      
      // 隨機決定是普通紅包還是金元寶
      const isGoldIngot = Math.random() < CONFIG.goldIngotSpawnRate;
      
      const newEnvelope = {
        id: envelopeIdRef.current++,
        x: godPositionRef.current + startOffset,
        y: 80, // 從財神爺位置開始（約100px高度處）
        horizontalSpeed, // 水平速度
        throwAngle, // 拋射角度
        type: isGoldIngot ? 'goldIngot' : 'normal', // 紅包類型
      };
      newEnvelopes.push(newEnvelope);
    }
    
    setEnvelopes(prev => [...prev, ...newEnvelopes]);
  }, []);

  // 點擊紅包
  const handleEnvelopeClick = useCallback((id, type) => {
    setEnvelopes(prev => prev.filter(env => env.id !== id));
    
    // 根據類型給予不同分數
    const scoreToAdd = type === 'goldIngot' ? CONFIG.scorePerGoldIngot : CONFIG.scorePerEnvelope;
    setScore(prev => prev + scoreToAdd);
    
    // 播放金幣音效
    if (coinSoundRef.current) {
      coinSoundRef.current.currentTime = 0; // 重置到開始，支持快速連擊
      coinSoundRef.current.play().catch(err => console.log('音效播放失败:', err));
    }
  }, []);

  // 紅包落地
  const handleEnvelopeLanded = useCallback((id) => {
    setEnvelopes(prev => prev.filter(env => env.id !== id));
  }, []);

  // 財神爺位置更新
  const handleGodPositionChange = useCallback((newPos) => {
    setGodPosition(newPos);
  }, []);

  // 計時器
  useEffect(() => {
    if (timeLeft <= 0) {
      onGameEnd(score);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, onGameEnd]);

  // 紅包生成器（帶隨機間隔）
  useEffect(() => {
    let timeoutId;
    
    const scheduleNextSpawn = () => {
      // 基礎間隔 ± 500ms 的隨機變化
      const randomOffset = (Math.random() - 0.5) * 1000; // -500ms ~ +500ms
      const nextInterval = CONFIG.envelopeSpawnIntervalMs + randomOffset;
      
      timeoutId = setTimeout(() => {
        spawnEnvelope();
        scheduleNextSpawn(); // 遞迴安排下一次生成
      }, Math.max(300, nextInterval)); // 最短間隔 300ms，避免太密集
    };

    scheduleNextSpawn();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [spawnEnvelope]);

  // 背景音樂管理
  useEffect(() => {
    // 播放背景音樂
    if (bgmRef.current) {
      bgmRef.current.volume = 0.3; // 設定音量 30%
      bgmRef.current.play().catch(err => console.log('背景音樂播放失败:', err));
    }

    // 組件卸載時停止音樂
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="game">
      {/* 音效 */}
      <audio ref={bgmRef} src="/bgm.mp3" loop />
      <audio ref={coinSoundRef} src="/coin.mp3" />

      {/* 財神爺 */}
      <GodOfWealth isPlaying={true} onPositionChange={handleGodPositionChange} />

      {/* 遊戲資訊 */}
      <div className="game-info">
        <div className="info-card timer-card">
          <span className="info-icon">⏱️</span>
          <div className="info-content">
            <div className="info-label">剩餘時間</div>
            <div className="info-value">{timeLeft} 秒</div>
          </div>
        </div>
      </div>

      {/* 紅包區域 */}
      <div className="envelope-container">
        {envelopes.map(envelope => (
          <RedEnvelope
            key={envelope.id}
            envelope={envelope}
            onClick={handleEnvelopeClick}
            onLanded={handleEnvelopeLanded}
          />
        ))}
      </div>

      {/* 寶箱與分數 */}
      <div className="score-info">
        <div className="info-card score-card">
          <span className="info-icon">💰</span>
          <div className="info-content">
            <div className="info-label">累積金額</div>
            <div className="info-value">{score} 元</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
