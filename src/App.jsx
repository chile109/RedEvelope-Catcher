import { useState } from 'react';
import Home from './components/Home';
import Game from './components/Game';
import Result from './components/Result';
import './App.css';

function App() {
  const [phase, setPhase] = useState('home'); // 'home' | 'playing' | 'result'
  const [finalScore, setFinalScore] = useState(0);

  const handleStart = () => {
    setPhase('playing');
  };

  const handleGameEnd = (score) => {
    setFinalScore(score);
    setPhase('result');
  };

  const handleRestart = () => {
    setFinalScore(0);
    setPhase('home');
  };

  return (
    <div className="app">
      {phase === 'home' && <Home onStart={handleStart} />}
      {phase === 'playing' && <Game onGameEnd={handleGameEnd} />}
      {phase === 'result' && <Result score={finalScore} onRestart={handleRestart} />}
    </div>
  );
}

export default App;
