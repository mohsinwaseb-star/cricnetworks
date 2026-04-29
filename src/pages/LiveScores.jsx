import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import MatchCard from '../components/MatchCard';
import { useMatches } from '../hooks/useMatches';

export default function LiveScores() {
  const [activeFilter, setActiveFilter] = useState('All');
  const scrollRef = useRef(null);
  const { matches, filters, loading } = useMatches();

  const filtered = activeFilter === 'All'
    ? matches
    : matches.filter((m) => m.seriesKey === activeFilter);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cricket Scores</h1>

      {/* Series filter tabs */}
      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden mb-6 bg-white">
        <div className="flex overflow-x-auto scrollbar-none">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`flex-shrink-0 px-3 py-2 text-xs font-medium whitespace-nowrap border-r border-gray-200 transition-all ${
                activeFilter === f.key
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-gray-500">
          <RefreshCw size={18} className="animate-spin" />
          <span className="text-sm">Loading live scores...</span>
        </div>
      ) : error ? (
        <p className="text-sm text-[#A8E63D] py-8 text-center">Could not load scores: {error}</p>
      ) : (
        <div className="relative group/scroll">
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-7 h-7 bg-white border border-gray-300 rounded-full shadow flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity"
          >
            <ChevronLeft size={14} />
          </button>

          <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {filtered.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>

          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-7 h-7 bg-white border border-gray-300 rounded-full shadow flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </main>
  );
}
