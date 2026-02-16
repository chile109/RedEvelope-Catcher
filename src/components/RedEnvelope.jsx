import { useEffect, useRef } from 'react';
import { CONFIG } from '../config';
import './RedEnvelope.css';

function RedEnvelope({ envelope, onClick, onLanded, onAnimationEnd }) {
  const ref = useRef(null);
  const currentPosRef = useRef({ x: envelope.x, y: envelope.y });

  useEffect(() => {
    if (!ref.current) return;

    // 如果已被收集，執行原地放大後消失的動畫
    if (envelope.collected) {
      // 鎖定位置，停止移動
      const lockedX = currentPosRef.current.x;
      const lockedY = currentPosRef.current.y;
      
      if (ref.current) {
        ref.current.style.left = `${lockedX}%`;
        ref.current.style.top = `${lockedY}px`;
      }
      
      const startTime = Date.now();
      const animationDuration = 2000; // 總動畫時間 2 秒
      
      const collectAnimate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        if (ref.current) {
          // 確保位置不變
          ref.current.style.left = `${lockedX}%`;
          ref.current.style.top = `${lockedY}px`;
          
          // 第一階段：放大（0-0.3s）
          if (progress < 0.15) {
            const scaleProgress = progress / 0.15;
            const scale = 1 + scaleProgress * 0.5; // 放大到 1.5 倍
            ref.current.style.transform = `scale(${scale})`;
            ref.current.style.opacity = 1;
          } 
          // 第二階段：保持放大（0.3-1.5s）
          else if (progress < 0.75) {
            ref.current.style.transform = 'scale(1.5)';
            ref.current.style.opacity = 1;
          }
          // 第三階段：淡出（1.5-2s）
          else {
            const fadeProgress = (progress - 0.75) / 0.25;
            const opacity = 1 - fadeProgress;
            ref.current.style.transform = 'scale(1.5)';
            ref.current.style.opacity = opacity;
          }
          
          if (progress >= 1) {
            // 動畫完成，通知父元件移除
            onAnimationEnd(envelope.id);
            return;
          }
        }
        
        requestAnimationFrame(collectAnimate);
      };
      
      const animationFrame = requestAnimationFrame(collectAnimate);
      
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }

    // 正常的拋物線動畫（未被收集時）
    const startTime = Date.now();
    const startX = envelope.x;
    const startY = envelope.y;
    let currentHorizontalSpeed = envelope.horizontalSpeed || 0; // 使用 let，支持反彈時修改
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const gravity = 800;
    const throwAngle = envelope.throwAngle || 0;
    const initialVerticalSpeed = -Math.tan((throwAngle * Math.PI) / 180) * Math.abs(currentHorizontalSpeed);
    const rotationDirection = Math.random() < 0.5 ? 1 : -1;
    const rotationSpeed = 90;
    
    let animationStopped = false;
    let lastX = startX;
    let lastY = startY;
    let lastTime = startTime;
    let currentVerticalSpeed = initialVerticalSpeed;
    
    const animate = () => {
      // 如果已被收集，停止拋物線動畫
      if (envelope.collected || animationStopped) {
        return;
      }
      
      const currentTime = Date.now();
      const totalElapsed = (currentTime - startTime) / 1000;
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      if (ref.current) {
        // 更新垂直速度（受重力影響）
        currentVerticalSpeed += gravity * deltaTime;
        
        // 計算新位置
        const horizontalDistance = (currentHorizontalSpeed * deltaTime) / windowWidth * 100;
        let currentX = lastX + horizontalDistance;
        let currentY = lastY + (currentVerticalSpeed * deltaTime);
        
        // 檢查左右邊界反彈
        const leftBound = 0;
        const rightBound = 100;
        
        if (currentX < leftBound) {
          currentX = leftBound;
          currentHorizontalSpeed = Math.abs(currentHorizontalSpeed) * 0.8; // 反彈並減速 20%
        } else if (currentX > rightBound) {
          currentX = rightBound;
          currentHorizontalSpeed = -Math.abs(currentHorizontalSpeed) * 0.8; // 反彈並減速 20%
        }
        
        // 更新位置
        lastX = currentX;
        lastY = currentY;
        
        // 持續更新當前位置引用
        currentPosRef.current = { x: currentX, y: currentY };
        
        ref.current.style.left = `${currentX}%`;
        ref.current.style.top = `${currentY}px`;
        
        const rotation = totalElapsed * rotationSpeed * rotationDirection;
        ref.current.style.transform = `rotate(${rotation}deg)`;
        
        // 只有落地才消失（不會因為飛出左右而消失）
        if (currentY >= windowHeight) {
          onLanded(envelope.id);
          return;
        }
        
        requestAnimationFrame(animate);
      }
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => {
      animationStopped = true;
      cancelAnimationFrame(animationFrame);
    };
  }, [envelope, onLanded, onAnimationEnd]);

  const handleClick = () => {
    // 如果已被收集，不重複計分
    if (envelope.collected) return;
    onClick(envelope.id, envelope.type);
  };

  // 根據類型決定圖片和樣式
  const isGoldIngot = envelope.type === 'goldIngot';
  const imageSrc = isGoldIngot ? '/Yunbow.png' : '/red_envelope.png';
  const altText = isGoldIngot ? '金元寶' : '紅包';

  return (
    <div
      ref={ref}
      className={`red-envelope ${isGoldIngot ? 'gold-ingot' : ''} ${envelope.collected ? 'collected' : ''}`}
      onClick={handleClick}
      style={{
        width: `${CONFIG.envelopeSize}px`,
        height: `${CONFIG.envelopeSize}px`,
        pointerEvents: envelope.collected ? 'none' : 'auto', // 已收集的不能再點擊
      }}
    >
      <div className="envelope-hitbox">
        <img 
          src={imageSrc}
          alt={altText}
          className="envelope-image"
        />
      </div>
    </div>
  );
}

export default RedEnvelope;
