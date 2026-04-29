import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown } from 'lucide-react';

const topNavLinks = [
  { label: 'Cricket', href: '/', active: true },
  { label: 'Football', href: '#' },
  { label: 'Tennis', href: '#' },
  { label: 'Golf', href: '#' },
  { label: 'Racing', href: '#' },
  { label: 'More Sports', href: '#' },
];

const mainNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Live Scores', href: '/scores' },
  { label: 'Series', href: '/series' },
  { label: 'Teams', href: '/teams' },
  { label: 'Rankings', href: '/rankings' },
  { label: 'Stats', href: '/stats' },
  { label: 'News', href: '/news' },
  { label: 'Videos', href: '/videos' },
  { label: 'Fantasy', href: '#' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#CC0000] text-white text-xs">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-8">
          <div className="flex items-center gap-4">
            {topNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`hover:text-white/80 transition-colors font-medium ${link.active ? 'font-bold underline underline-offset-2' : 'text-white/80'}`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <a href="#" className="hover:text-white">Sign In</a>
            <span>|</span>
            <a href="#" className="hover:text-white">Register</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-[#0d1b2a] text-white shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center">
              <span className="text-white font-black text-xl tracking-tight">Cric</span>
              <span className="text-[#CC0000] font-black text-xl tracking-tight">Networks</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 mx-6">
            {mainNavLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-150 whitespace-nowrap ${
                  location.pathname === link.href
                    ? 'text-white bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search & actions */}
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                <Search size={14} className="text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search players, teams, series..."
                  className="bg-transparent text-white text-sm outline-none w-48 placeholder-gray-400"
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X size={14} className="text-gray-400 hover:text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <Search size={18} />
              </button>
            )}

            <button className="hidden sm:block bg-[#CC0000] text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-red-700 transition-colors">
              SUBSCRIBE
            </button>

            <button
              className="lg:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0d1b2a] border-t border-white/10">
            <nav className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col gap-1">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                    location.pathname === link.href
                      ? 'text-white bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Sub nav */}
      <div className="bg-[#1a2d3d] text-white border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center gap-6 h-9 overflow-x-auto scrollbar-none">
          <a href="#" className="text-xs text-white/60 hover:text-white whitespace-nowrap">IND vs ENG</a>
          <a href="#" className="text-xs text-white/60 hover:text-white whitespace-nowrap">AUS vs SA</a>
          <a href="#" className="text-xs text-white/60 hover:text-white whitespace-nowrap">PAK vs NZ</a>
          <a href="#" className="text-xs text-white/60 hover:text-white whitespace-nowrap">WTC Final</a>
          <a href="#" className="text-xs text-white/60 hover:text-white whitespace-nowrap">IPL 2024</a>
          <a href="#" className="text-xs text-white/60 hover:text-white whitespace-nowrap">SA20</a>
          <a href="#" className="text-xs text-white/60 hover:text-white whitespace-nowrap">BBL</a>
          <a href="#" className="text-xs text-red-400 font-medium hover:text-red-300 whitespace-nowrap flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full live-dot"></span>
            3 Live Matches
          </a>
        </div>
      </div>
    </header>
  );
}
