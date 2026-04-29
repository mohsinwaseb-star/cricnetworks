import { useState } from 'react';
import MatchCard from '../components/MatchCard';
import { liveMatches, upcomingMatches, recentResults } from '../data/matches';

const tabs = ['Live', 'Upcoming', 'Results'];
const formats = ['All', 'Test', 'ODI', 'T20I', 'T20'];

export default function LiveScores() {
  const [tab, setTab] = useState('Live');
  const [format, setFormat] = useState('All');

  const allMatches = tab === 'Live' ? liveMatches : tab === 'Upcoming' ? upcomingMatches : recentResults;
  const filtered = format === 'All' ? allMatches : allMatches.filter((m) => m.type === format);

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cricket Scores</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${
              tab === t ? 'border-[#CC0000] text-[#CC0000]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
            {t === 'Live' && liveMatches.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                {liveMatches.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Format filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {formats.map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              format === f
                ? 'bg-[#CC0000] text-white border-[#CC0000]'
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">🏏</p>
          <p className="font-medium">No {tab.toLowerCase()} {format !== 'All' ? format : ''} matches</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </main>
  );
}
