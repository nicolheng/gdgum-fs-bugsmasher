import { useEffect, useState, useMemo } from 'react';
import { FaBug } from 'react-icons/fa';
import { SiGoogle, SiGmail, SiGooglecalendar, SiGoogledrive } from 'react-icons/si';

const BUG_BGS = [
  'bg-gray-800',
  'bg-red-600',
  'bg-purple-600',
  'bg-green-600',
  'bg-yellow-600',
  'bg-pink-600',
  'bg-indigo-600',
  'bg-orange-500',
  'bg-teal-600'
];

const ICONS = {
  bug: { Icon: FaBug, color: 'text-gray-800', size: 'w-16 h-16 md:w-20 md:h-20' },
  search: { Icon: SiGoogle, color: 'text-google-blue', size: 'w-14 h-14 md:w-16 md:h-16' },
  gmail: { Icon: SiGmail, color: 'text-google-red', size: 'w-14 h-14 md:w-16 md:h-16' },
  calendar: { Icon: SiGooglecalendar, color: 'text-google-blue', size: 'w-14 h-14 md:w-16 md:h-16' },
  drive: { Icon: SiGoogledrive, color: 'text-google-green', size: 'w-14 h-14 md:w-16 md:h-16' },
};

export default function TargetIcon({ target, onHit }) {
  const [scale, setScale] = useState(0);
  const data = ICONS[target.type] || ICONS.bug;
  const { Icon, color: defaultColor, size } = data;

  const finalBg = useMemo(() => {
    if (target.type === 'bug') {
      return BUG_BGS[Math.floor(Math.random() * BUG_BGS.length)];
    }
    return 'bg-white';
  }, [target.type]);

  const finalIconColor = target.type === 'bug' ? 'text-white' : defaultColor;

  useEffect(() => {
    // Small delay to allow CSS transition to happen
    const t = setTimeout(() => setScale(1), 10);
    return () => clearTimeout(t);
  }, []);

  const handlePointerDown = (e) => {
    e.preventDefault();
    
    // Scale down before disappearing
    setScale(0);
    // Let the animation play slightly before removing
    setTimeout(() => {
      onHit(target);
    }, 150);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      className={`absolute flex items-center justify-center transition-transform duration-200 ease-out cursor-pointer hover:scale-105 active:opacity-50 drop-shadow-xl`}
      style={{
        left: `${target.x}%`,
        top: `${target.y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        touchAction: 'none' // Crucial for responsive touch
      }}
    >
      <div className={`p-4 rounded-2xl shadow-md border-2 border-transparent ${finalBg} group-hover:border-gray-200`}>
        <Icon className={`${finalIconColor} ${size}`} />
      </div>
    </div>
  );
}
