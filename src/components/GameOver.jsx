import { useEffect, useState } from 'react';

const STORAGE_KEY = 'bugsmasher_leaderboard';

export default function GameOver({ score, playerName, onRestart }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [highlightId, setHighlightId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let currentLeaderboard = saved ? JSON.parse(saved) : [];
    
    const newEntryId = Date.now();
    const newEntry = {
      id: newEntryId,
      name: playerName || 'Anonymous',
      score: score
    };
    
    currentLeaderboard.push(newEntry);
    currentLeaderboard.sort((a, b) => b.score - a.score);
    currentLeaderboard = currentLeaderboard.slice(0, 5);
    
    setLeaderboard(currentLeaderboard);
    setHighlightId(newEntryId);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentLeaderboard));
  }, [score, playerName]);

  return (
    <div className="bg-white p-6 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full flex flex-col items-center animate-in slide-in-from-bottom-10 fade-in duration-500 m-4">
      <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-google-red to-google-yellow mb-2 text-center">
        Time's Up!
      </h2>
      
      <div className="flex flex-col items-center my-6 md:my-8">
        <span className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-1">Final Score</span>
        <span className="text-6xl md:text-7xl font-black text-google-blue tabular-nums">{score}</span>
      </div>

      <div className="w-full bg-gray-50 rounded-2xl p-5 md:p-6 mb-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-between">
          <span>🏆 Leaderboard</span>
          <span className="text-sm text-gray-400 font-normal">Top 5</span>
        </h3>
        <div className="space-y-3">
          {leaderboard.map((entry, idx) => {
            const isCurrent = entry.id === highlightId;
            return (
              <div 
                key={entry.id} 
                className={`flex justify-between items-center p-3 rounded-xl transition-all ${isCurrent ? 'bg-blue-50 border-2 border-google-blue shadow-sm scale-105 my-4' : 'bg-white border border-gray-100 shadow-sm'}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 text-center font-black ${idx === 0 ? 'text-google-yellow' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-orange-400' : 'text-gray-300'}`}>
                    #{idx + 1}
                  </span>
                  <span className={`font-bold truncate max-w-[120px] md:max-w-[150px] ${isCurrent ? 'text-google-blue' : 'text-gray-700'}`}>
                    {entry.name}
                  </span>
                </div>
                <span className={`font-black ${isCurrent ? 'text-google-blue' : 'text-gray-900'}`}>
                  {entry.score} pts
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full px-8 py-4 bg-google-blue hover:bg-blue-600 focus:ring-4 focus:ring-blue-100 text-white rounded-xl text-xl font-bold transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 outline-none"
      >
        Play Again
      </button>
    </div>
  );
}
