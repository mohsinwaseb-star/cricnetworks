import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play, TrendingUp } from 'lucide-react';
import MatchCard from '../components/MatchCard';
import { FeaturedNewsCard, NewsCard } from '../components/NewsCard';
import RankingsWidget from '../components/RankingsWidget';
import { liveMatches, upcomingMatches, recentResults } from '../data/matches';
import { featuredNews, newsArticles, videos } from '../data/news';

const matchTabs = ['Live', 'Upcoming', 'Results'];

export default function Home() {
  const [matchTab, setMatchTab] = useState('Live');

  const currentMatches =
    matchTab === 'Live' ? liveMatches :
    matchTab === 'Upcoming' ? upcomingMatches :
    recentResults;

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
              <h2 className="text-lg font-bold text-gray-900">Matches</h2>
              <Link to="/scores" className="text-xs text-[#CC0000] hover:underline font-medium flex items-center gap-0.5">
                All Scores <ChevronRight size={14} />
              </Link>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              {matchTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMatchTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-all -mb-px ${
                    matchTab === tab
                      ? 'border-[#CC0000] text-[#CC0000]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {tab === 'Live' && liveMatches.length > 0 && (
                    <span className="ml-1.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 inline-flex items-center justify-center font-bold">
                      {liveMatches.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>

          {/* News grid */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Latest News</h2>
              <Link to="/news" className="text-xs text-[#CC0000] hover:underline font-medium flex items-center gap-0.5">
                All News <ChevronRight size={14} />
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
              <h2 className="text-lg font-bold text-gray-900">Videos</h2>
              <Link to="/videos" className="text-xs text-[#CC0000] hover:underline font-medium flex items-center gap-0.5">
                More Videos <ChevronRight size={14} />
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
                    <span className="absolute top-1.5 left-1.5 bg-[#CC0000] text-white text-xs px-1.5 py-0.5 rounded font-medium">
                      {video.category}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800 mt-2 line-clamp-2 leading-snug group-hover:text-[#CC0000] transition-colors">
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
          {/* Rankings widget */}
          <RankingsWidget />

          {/* Trending */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <TrendingUp size={16} className="text-[#CC0000]" />
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
                  <p className="text-sm font-medium text-gray-800 group-hover:text-[#CC0000] transition-colors leading-snug">
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
              <Link to="/news" className="text-xs text-[#CC0000] hover:underline">See all</Link>
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
