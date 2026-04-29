import { useState } from 'react';
import { FeaturedNewsCard, NewsCard } from '../components/NewsCard';
import { featuredNews, newsArticles } from '../data/news';

const categories = ['All', 'Match Reports', 'News', 'Analysis', 'Interviews', 'IPL', 'Preview'];

export default function News() {
  const [category, setCategory] = useState('All');

  const filtered = category === 'All'
    ? newsArticles
    : newsArticles.filter((a) => a.category.toLowerCase().includes(category.toLowerCase()) || a.tags.some((t) => t.toLowerCase().includes(category.toLowerCase())));

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cricket News</h1>

      {/* Featured */}
      <div className="mb-8">
        <FeaturedNewsCard article={featuredNews} />
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all ${
              category === c ? 'bg-[#A8E63D] text-white border-[#A8E63D]' : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">📰</p>
          <p className="font-medium">No articles found for "{category}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </main>
  );
}
