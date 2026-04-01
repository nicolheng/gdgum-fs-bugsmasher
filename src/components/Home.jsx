import { FaBug } from 'react-icons/fa';

export default function Home({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
      <div className="relative">
        <FaBug className="text-google-green w-32 h-32 absolute -top-12 -left-12 -z-10 opacity-20 rotate-12" />
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-center">
          <span className="text-google-blue">Bug</span>
          <span className="text-google-red">Sma</span>
          <span className="text-google-yellow">sh</span>
          <span className="text-google-green">er</span>
        </h1>
      </div>
      <p className="text-xl text-gray-600 max-w-md text-center">
        Smash the bugs, avoid the apps! You have 30 seconds.
      </p>
      <button 
        onClick={onStart}
        className="px-10 py-4 bg-google-blue hover:bg-blue-600 active:scale-95 transition-all text-white rounded-full text-2xl font-bold shadow-lg flex items-center gap-2"
      >
        Start Game
      </button>
    </div>
  );
}
