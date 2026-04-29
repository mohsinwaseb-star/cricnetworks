import { tickerMatches } from '../data/matches';

export default function LiveScoresTicker() {
  const doubled = [...tickerMatches, ...tickerMatches];

  return (
    <div className="bg-gray-900 text-white border-b border-gray-700">
      <div className="max-w-screen-xl mx-auto flex items-center">
        <div className="flex-shrink-0 bg-[#CC0000] text-white text-xs font-bold px-3 py-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-white rounded-full live-dot"></span>
          LIVE
        </div>
        <div className="ticker-container flex-1 overflow-hidden">
          <div className="ticker-content">
            {doubled.map((match, i) => (
              <span key={i} className="inline-flex items-center gap-3 px-6 py-2 text-xs border-r border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors">
                {match.status === 'LIVE' && (
                  <span className="text-red-400 font-bold">{match.status}</span>
                )}
                {match.status === 'Result' && (
                  <span className="text-green-400 font-bold">{match.status}</span>
                )}
                <span className="text-gray-300 font-medium">{match.teams}</span>
                <span className="text-white">{match.score}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
