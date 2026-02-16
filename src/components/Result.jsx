import { getBlessingByScore } from '../data/blessings';
import './Result.css';

function Result({ score, onRestart }) {
  const blessing = getBlessingByScore(score);

  return (
    <div className="result">
      <div className="result-content">
        <h1 className="result-title">🎉 遊戲結束 🎉</h1>
        
        <div className="score-display">
          <div className="score-label">總金額</div>
          <div className="score-value">{score} 元</div>
        </div>

        <div className="blessing">
          <p className="blessing-text">{blessing}</p>
        </div>

        <button className="restart-button" onClick={onRestart}>
          再玩一次
        </button>
      </div>
    </div>
  );
}

export default Result;
