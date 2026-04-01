import { useState, useEffect, useRef, useCallback } from 'react';
import TargetIcon from './TargetIcon';
import FloatingScore from './FloatingScore';

const GAME_DURATION = 30; // 30 seconds
const TARGET_TYPES = ['bug', 'search', 'gmail', 'calendar', 'drive'];
const PROB_BUG = 0.3; // 30% chance of being a bug, 70% chance of Google Icon

export default function Game({ score, setScore, onGameOver }) {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [targets, setTargets] = useState([]);
  const [floatingScores, setFloatingScores] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const timeoutRefs = useRef({});

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      onGameOver();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onGameOver]);

  // Handle Target disappearing automatically
  const removeTarget = useCallback((id) => {
    setTargets(prev => prev.filter(t => t.id !== id));
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id]);
      delete timeoutRefs.current[id];
    }
  }, []);

  // Spawn new targets
  useEffect(() => {
    if (timeLeft <= 0) return;

    // Faster spawning in last 10 seconds
    const isFrenzy = timeLeft <= 10;
    const minSpawnDelay = isFrenzy ? 200 : 350; // 25%+ faster before frenzy
    const maxSpawnDelay = isFrenzy ? 800 : 1100;
    
    const spawnDelay = Math.floor(Math.random() * (maxSpawnDelay - minSpawnDelay)) + minSpawnDelay;
    
    const spawnTimer = setTimeout(() => {
      const isBug = Math.random() < PROB_BUG;
      let targetType = 'bug';
      
      if (!isBug) {
        targetType = TARGET_TYPES[1 + Math.floor(Math.random() * (TARGET_TYPES.length - 1))];
      }

      const newTarget = {
        id: Date.now() + Math.random(),
        type: targetType,
        x: 10 + Math.random() * 80, // Safe padding (10% to 90%)
        y: 20 + Math.random() * 70, // Safe padding below header
      };
      
      setTargets(prev => [...prev, newTarget]);
      
      // Target disappears after 1-2 seconds
      const lifespan = 1000 + Math.random() * 1000;
      timeoutRefs.current[newTarget.id] = setTimeout(() => {
        removeTarget(newTarget.id);
      }, lifespan);
      
    }, spawnDelay);

    return () => clearTimeout(spawnTimer);
  }, [timeLeft, targets, removeTarget]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(clearTimeout);
    };
  }, []);

  const handleHit = useCallback((target) => {
    removeTarget(target.id);
    
    const isBug = target.type === 'bug';
    const points = isBug ? 100 : -50;
    
    setScore(prev => prev + points);
    
    setFloatingScores(prev => [...prev, {
      id: Date.now() + Math.random(),
      x: target.x,
      y: target.y,
      value: points
    }]);

    if (!isBug) {
      // Trigger camera shake
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  }, [removeTarget, setScore]);

  const removeFloatingScore = useCallback((id) => {
    setFloatingScores(prev => prev.filter(s => s.id !== id));
  }, []);

  return (
    <div className={`w-full h-full relative overflow-hidden bg-gray-50 flex flex-col ${isShaking ? 'animate-shake bg-red-50/50' : ''} transition-colors duration-150`}>
      {/* Header Info */}
      <div className="absolute top-0 w-full p-4 md:p-6 flex justify-between items-center z-10 pointer-events-none">
        <div className="bg-white/90 backdrop-blur px-5 py-3 md:px-8 md:py-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-1 md:gap-3">
          <span className="text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm">Time</span>
          <span className={`text-2xl md:text-4xl font-black tabular-nums ${timeLeft <= 10 ? 'text-google-red animate-pulse' : 'text-gray-900'}`}>
            0:{timeLeft.toString().padStart(2, '0')}
          </span>
        </div>
        <div className="bg-white/90 backdrop-blur px-5 py-3 md:px-8 md:py-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-1 md:gap-3">
          <span className="text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm">Score</span>
          <span className="text-2xl md:text-4xl font-black text-google-blue tabular-nums">{score}</span>
        </div>
      </div>

      {/* Play Area */}
      <div className="flex-1 relative w-full h-full">
        {targets.map(target => (
          <TargetIcon 
            key={target.id} 
            target={target} 
            onHit={handleHit} 
          />
        ))}
        {floatingScores.map(scoreAnim => (
          <FloatingScore 
            key={scoreAnim.id} 
            {...scoreAnim} 
            onComplete={removeFloatingScore} 
          />
        ))}
      </div>
    </div>
  );
}
