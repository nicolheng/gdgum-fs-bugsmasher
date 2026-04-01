import { useEffect, useState } from 'react';

export default function FloatingScore({ id, x, y, value, onComplete }) {
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    // Start floating up and fading out
    const anim = requestAnimationFrame(() => {
      setTranslateY(-60);
      setOpacity(0);
    });
    
    // Remove after animation finishes
    const timer = setTimeout(() => {
      onComplete(id);
    }, 800);

    return () => {
      cancelAnimationFrame(anim);
      clearTimeout(timer);
    };
  }, [id, onComplete]);

  const textColor = value > 0 ? 'text-google-green' : 'text-google-red';
  const displayValue = value > 0 ? `+${value}` : `${value}`;

  return (
    <div
      className={`absolute font-black text-4xl pointer-events-none z-50 ${textColor}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        transform: `translate(-50%, calc(-50% + ${translateY}px))`,
        transition: 'all 0.8s ease-out',
        textShadow: '0px 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      {displayValue}
    </div>
  );
}
