import { useEffect, useRef } from 'react';
import { CONFIG } from '../config';
import './RedEnvelope.css';

function RedEnvelope({ envelope, onClick, onLanded }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    // 拋物線動畫參數
    const startTime = Date.now();
    const startX = envelope.x; // 起始 x 位置（百分比）
    const startY = envelope.y; // 起始 y 位置（像素）
    const horizontalSpeed = envelope.horizontalSpeed || 0; // 水平速度 (px/s)
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // 重力加速度（像素/秒²）
    const gravity = 800;
    
    // 初始垂直速度（向上拋，根據角度計算）
    const throwAngle = envelope.throwAngle || 0;
    const initialVerticalSpeed = -Math.tan((throwAngle * Math.PI) / 180) * Math.abs(horizontalSpeed);
    
    // 隨機旋轉方向：順時針(1)或逆時針(-1)
    const rotationDirection = Math.random() < 0.5 ? 1 : -1;
    const rotationSpeed = 90; // 度/秒（降低旋轉速度，提升點擊準確度）
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000; // 轉換為秒
      
      if (ref.current) {
        // 水平位置：x = x0 + vx * t
        const horizontalDistance = (horizontalSpeed * elapsed) / windowWidth * 100; // 轉換為百分比
        const currentX = startX + horizontalDistance;
        
        // 垂直位置：y = y0 + vy * t + 0.5 * g * t²（拋物線）
        const currentY = startY + initialVerticalSpeed * elapsed + 0.5 * gravity * elapsed * elapsed;
        
        // 更新 DOM 位置
        ref.current.style.left = `${currentX}%`;
        ref.current.style.top = `${currentY}px`;
        
        // 加入旋轉效果（順時針或逆時針）
        const rotation = elapsed * rotationSpeed * rotationDirection;
        ref.current.style.transform = `rotate(${rotation}deg)`;
        
        // 檢查是否落地或超出邊界
        if (currentY >= windowHeight || currentX < -10 || currentX > 110) {
          onLanded(envelope.id);
          return;
        }
        
        // 繼續動畫
        requestAnimationFrame(animate);
      }
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [envelope, onLanded]);

  const handleClick = () => {
    onClick(envelope.id);
  };

  return (
    <div
      ref={ref}
      className="red-envelope"
      onClick={handleClick}
      style={{
        width: `${CONFIG.envelopeSize}px`,
        height: `${CONFIG.envelopeSize}px`,
      }}
    >
      <div className="envelope-hitbox">
        <img 
          src="/red_envelope.png" 
          alt="紅包" 
          className="envelope-image"
        />
      </div>
    </div>
  );
}

export default RedEnvelope;
