import { CONFIG } from '../config';
import './Home.css';

function Home({ onStart }) {
  return (
    <div className="home">
      <h1 className="home-title">🐴 馬年紅包雨 🧧</h1>
      <p className="home-subtitle">點擊紅包，收集財富！</p>
      <button className="start-button" onClick={onStart}>
        開始遊戲
      </button>
      <div className="home-instructions">
        <p>遊戲時間：{CONFIG.gameDurationSeconds} 秒</p>
        <p>每個紅包：{CONFIG.scorePerEnvelope} 元</p>
      </div>
    </div>
  );
}

export default Home;
