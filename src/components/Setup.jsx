export default function Setup({ playerName, setPlayerName, onPlay, onBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      onPlay();
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full animate-in zoom-in-95 duration-300">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Enter Your Name</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="e.g. Jane Doe"
            maxLength={20}
            className="w-full text-center text-2xl px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-google-blue focus:ring-4 focus:ring-google-blue/20 outline-none transition-all"
            autoFocus
          />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors active:scale-95"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!playerName.trim()}
            className="flex-1 px-6 py-3 bg-google-green hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all active:scale-95 shadow-md disabled:shadow-none"
          >
            Play
          </button>
        </div>
      </form>
    </div>
  );
}
