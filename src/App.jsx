import { useState } from 'react';
import Home from './components/Home';
import Setup from './components/Setup';
import Game from './components/Game';
import GameOver from './components/GameOver';

function App() {
  const [currentScreen, setCurrentScreen] = useState('HOME'); // 'HOME', 'SETUP', 'PLAY', 'GAMEOVER'
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);

  const startGame = () => {
    setScore(0);
    setCurrentScreen('PLAY');
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-50 overflow-hidden relative font-sans text-gray-900">
      {currentScreen === 'HOME' && <Home onStart={() => setCurrentScreen('SETUP')} />}
      {currentScreen === 'SETUP' && (
        <Setup 
          playerName={playerName} 
          setPlayerName={setPlayerName} 
          onPlay={startGame} 
          onBack={() => setCurrentScreen('HOME')}
        />
      )}
      {currentScreen === 'PLAY' && (
        <Game 
          score={score} 
          setScore={setScore} 
          onGameOver={() => setCurrentScreen('GAMEOVER')} 
        />
      )}
      {currentScreen === 'GAMEOVER' && (
        <GameOver 
          score={score} 
          playerName={playerName} 
          onRestart={() => setCurrentScreen('HOME')} 
        />
      )}
    </div>
  );
}

export default App;
