import { Play } from 'lucide-react';
import { videos, newsArticles } from '../data/news';

const extraVideos = [
  ...videos,
  { id: 5, title: 'Top 10 catches of 2024 season - Best fielding moments', duration: '5:22', category: 'Compilation', thumbnail: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=400&q=80', views: '4.2M' },
  { id: 6, title: 'Pakistan vs New Zealand T20I Highlights | 1st T20I 2024', duration: '9:15', category: 'Day Highlights', thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80', views: '1.8M' },
  { id: 7, title: "SA20 Final Highlights - Sunrisers Eastern Cape vs Paarl Royals", duration: '11:30', category: 'Highlights', thumbnail: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400&q=80', views: '2.7M' },
  { id: 8, title: 'Jaiswal vs Root: The battle that defined the series', duration: '4:45', category: 'Feature', thumbnail: 'https://images.unsplash.com/photo-1540747913346-19212a729db2?w=400&q=80', views: '986K' },
];

const categories = ['All', 'Highlights', 'Wickets', 'Day Highlights', 'Compilation', 'Feature'];

export default function Videos() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Videos</h1>

      {/* Featured video */}
      <div className="mb-8 relative overflow-hidden rounded-xl h-64 sm:h-80 group cursor-pointer">
        <img
          src={extraVideos[2].thumbnail}
          alt={extraVideos[2].title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540747913346-19212a729db2?w=800&q=80'; }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-16 h-16 bg-[#CC0000] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play size={24} className="text-white ml-1" fill="white" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
          <span className="text-xs bg-[#CC0000] text-white px-2 py-0.5 rounded font-bold mb-2 inline-block">
            {extraVideos[2].category}
          </span>
          <h2 className="text-white text-xl font-bold">{extraVideos[2].title}</h2>
          <p className="text-gray-300 text-sm mt-1">{extraVideos[2].views} views • {extraVideos[2].duration}</p>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            className="px-4 py-1.5 text-sm font-medium rounded-full border border-gray-300 text-gray-600 hover:border-gray-400 first:bg-[#CC0000] first:text-white first:border-[#CC0000] transition-all"
          >
            {c}
          </button>
        ))}
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {extraVideos.map((video) => (
          <div key={video.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl h-36">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540747913346-19212a729db2?w=400&q=80'; }}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 bg-[#CC0000] rounded-full flex items-center justify-center">
                  <Play size={16} className="text-white ml-0.5" fill="white" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">
                {video.duration}
              </span>
              <span className="absolute top-2 left-2 bg-[#CC0000]/90 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                {video.category}
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#CC0000] transition-colors">
                {video.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{video.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
