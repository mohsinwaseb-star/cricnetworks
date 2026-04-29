import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Play, TrendingUp, RefreshCw } from 'lucide-react';
import MatchCard from '../components/MatchCard';
import { FeaturedNewsCard, NewsCard } from '../components/NewsCard';
import RankingsWidget from '../components/RankingsWidget';
import { useMatches } from '../hooks/useMatches';
import { featuredNews, newsArticles, videos } from '../data/news';

export default function Home() {
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Featured article */}
          <FeaturedNewsCard article={featuredNews} />

          {/* Matches section */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-gray-900">Matches</h2>
              <Link to="/scores" className="text-xs text-[#A8E63D] hover:underline font-medium flex items-center gap-0.5">
                All Scores <ChevronRight size={13} />
              </Link>
            </div>

            {/* Series filter tabs */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden mb-4 bg-white">
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

            {/* Horizontal scrollable cards */}
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-12 text-gray-500">
                <RefreshCw size={16} className="animate-spin" />
                <span className="text-sm">Loading live scores...</span>
              </div>
            ) : error ? (
              <p className="text-xs text-[#A8E63D] py-4">Could not load live data: {error}</p>
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
          </section>

          {/* News grid */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">Latest News</h2>
              <Link to="/news" className="text-xs text-[#A8E63D] hover:underline font-medium flex items-center gap-0.5">
                All News <ChevronRight size={13} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {newsArticles.slice(0, 6).map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </section>

          {/* Videos */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">Videos</h2>
              <Link to="/videos" className="text-xs text-[#A8E63D] hover:underline font-medium flex items-center gap-0.5">
                More Videos <ChevronRight size={13} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {videos.map((video) => (
                <div key={video.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg h-28">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540747913346-19212a729db2?w=400&q=80'; }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <Play size={14} className="text-gray-900 ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-xs px-1 rounded">
                      {video.duration}
                    </span>
                    <span className="absolute top-1.5 left-1.5 bg-[#A8E63D] text-white text-xs px-1.5 py-0.5 rounded font-medium">
                      {video.category}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800 mt-2 line-clamp-2 leading-snug group-hover:text-[#A8E63D] transition-colors">
                    {video.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{video.views} views</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right sidebar */}
        <aside className="space-y-6">
          <RankingsWidget />

          {/* Trending */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <TrendingUp size={16} className="text-[#A8E63D]" />
              <h3 className="font-bold text-gray-900">Trending</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                'Jaiswal vs Root: Battle of the stars',
                'IPL 2024 Auction: Full spend list',
                'Bumrah breaks world record with 918 rating',
                "Stokes defends Bazball: 'We won't change'",
                'WTC Final 2025: Predicted XIs and prediction',
              ].map((item, i) => (
                <a key={i} href="#" className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group">
                  <span className="text-2xl font-black text-gray-200 leading-none mt-0.5 flex-shrink-0 w-7">
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium text-gray-800 group-hover:text-[#A8E63D] transition-colors leading-snug">
                    {item}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* More news sidebar */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">More Stories</h3>
              <Link to="/news" className="text-xs text-[#A8E63D] hover:underline">See all</Link>
            </div>
            <div className="p-4 space-y-3">
              {newsArticles.slice(6).map((article) => (
                <NewsCard key={article.id} article={article} horizontal />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
