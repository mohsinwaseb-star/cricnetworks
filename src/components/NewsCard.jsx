import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';

export function FeaturedNewsCard({ article }) {
  return (
    <Link to={`/news/${article.id}`} className="block group">
      <div className="relative overflow-hidden rounded-xl h-80 sm:h-96">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540747913346-19212a729db2?w=800&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="inline-block bg-[#CC0000] text-white text-xs font-bold px-2 py-0.5 rounded mb-2 uppercase tracking-wide">
            {article.category}
          </span>
          <h2 className="text-white text-xl sm:text-2xl font-bold leading-snug mb-2 group-hover:text-gray-200 transition-colors">
            {article.title}
          </h2>
          <p className="text-gray-300 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <span className="flex items-center gap-1"><User size={11} /> {article.author}</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {article.time}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function NewsCard({ article, horizontal = false }) {
  if (horizontal) {
    return (
      <Link to={`/news/${article.id}`} className="flex gap-3 group hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
        <img
          src={article.image}
          alt={article.title}
          className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540747913346-19212a729db2?w=400&q=80'; }}
        />
        <div className="min-w-0 flex-1">
          <span className="text-xs text-[#CC0000] font-semibold uppercase tracking-wide">{article.category}</span>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#CC0000] transition-colors mt-0.5">
            {article.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{article.time}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/news/${article.id}`} className="block group">
      <div className="overflow-hidden rounded-lg">
        <div className="overflow-hidden rounded-lg h-44">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540747913346-19212a729db2?w=400&q=80'; }}
          />
        </div>
        <div className="pt-3">
          <span className="text-xs text-[#CC0000] font-semibold uppercase tracking-wide">{article.category}</span>
          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#CC0000] transition-colors mt-0.5 mb-1">
            {article.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.time}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
