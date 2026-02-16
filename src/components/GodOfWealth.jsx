import { useEffect, useRef } from 'react';
import { CONFIG } from '../config';
import './GodOfWealth.css';

function GodOfWealth({ isPlaying, onPositionChange }) {
  const godRef = useRef(null);
  const positionRef = useRef(50); // 初始位置在中間 (50%)
  const directionRef = useRef(1); // 1 = 向右, -1 = 向左
  const animationRef = useRef(null);
  const onPositionChangeRef = useRef(onPositionChange);

  // 更新 ref 以獲取最新的 callback
  useEffect(() => {
    onPositionChangeRef.current = onPositionChange;
  }, [onPositionChange]);

  useEffect(() => {
    if (!isPlaying) {
      // 停止移動
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    // 開始移動動畫
    let lastTime = Date.now();
    let speedMultiplier = 1.0; // 速度倍率
    let lastSpeedChangeTime = Date.now();
    
    // 隨機改變速度倍率（0.6 到 1.4 倍之間）
    const getRandomSpeedMultiplier = () => {
      return 0.6 + Math.random() * 0.8; // 0.6 ~ 1.4
    };
    
    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000; // 轉換為秒
      lastTime = currentTime;

      // 每隔 1.5 ~ 3 秒隨機改變速度
      if (currentTime - lastSpeedChangeTime > 1500 + Math.random() * 1500) {
        speedMultiplier = getRandomSpeedMultiplier();
        lastSpeedChangeTime = currentTime;
      }

      // 計算移動距離（百分比），加入隨機速度倍率
      const baseSpeed = (CONFIG.godOfWealthSpeed / window.innerWidth) * 100 * deltaTime;
      const moveDistance = baseSpeed * speedMultiplier;
      let newPos = positionRef.current + moveDistance * directionRef.current;

      // 檢查邊界並反轉方向
      const [leftBound, rightBound] = CONFIG.godOfWealthRange;
      if (newPos >= rightBound) {
        newPos = rightBound;
        directionRef.current = -1;
        // 碰到邊界時也改變速度，增加變化
        speedMultiplier = getRandomSpeedMultiplier();
        lastSpeedChangeTime = currentTime;
      } else if (newPos <= leftBound) {
        newPos = leftBound;
        directionRef.current = 1;
        // 碰到邊界時也改變速度，增加變化
        speedMultiplier = getRandomSpeedMultiplier();
        lastSpeedChangeTime = currentTime;
      }

      // 更新位置
      positionRef.current = newPos;

      // 直接更新 DOM（避免 React 重新渲染，更平滑）
      if (godRef.current) {
        godRef.current.style.left = `${newPos}%`;
        // 根據方向翻轉圖片：向右(1)不翻轉，向左(-1)翻轉
        const scaleX = directionRef.current === 1 ? 1 : -1;
        godRef.current.style.transform = `translateX(-50%) scaleX(${scaleX})`;
      }

      // 通知父元件位置變化（用於生成紅包）
      if (onPositionChangeRef.current) {
        onPositionChangeRef.current(newPos);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="god-of-wealth-container">
      <div
        ref={godRef}
        className="god-of-wealth"
        style={{
          left: '50%',
          width: `${CONFIG.godOfWealthSize}px`,
          height: `${CONFIG.godOfWealthSize}px`,
        }}
      >
        <img 
          src="/WealthGod.png" 
          alt="財神爺" 
          className="god-image"
        />
      </div>
    </div>
  );
}

export default GodOfWealth;
