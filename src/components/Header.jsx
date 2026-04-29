import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

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

function CricNetworksLogo({ size = 'md' }) {
  const scale = size === 'sm' ? 0.55 : size === 'lg' ? 1 : 0.72;
  return (
    <svg
      viewBox="0 0 320 130"
      style={{ width: 180 * scale, height: 72 * scale }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cricket ball top-left inside C */}
      <circle cx="44" cy="42" r="20" fill="#e8e8e8" />
      <ellipse cx="44" cy="42" rx="20" ry="20" stroke="#ccc" strokeWidth="1" />
      {/* Seam lines on ball */}
      <path d="M28 34 Q44 44 60 34" stroke="#bbb" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M28 50 Q44 40 60 50" stroke="#bbb" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Speed lines */}
      <line x1="8" y1="38" x2="25" y2="40" stroke="#ccc" strokeWidth="2" strokeLinecap="round"/>
      <line x1="5" y1="44" x2="24" y2="44" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="50" x2="25" y2="48" stroke="#ccc" strokeWidth="1" strokeLinecap="round"/>

      {/* CRIC - lime green with dark green shadow */}
      {/* Shadow layer */}
      <text x="32" y="78" fontFamily="Impact, Arial Black, sans-serif" fontWeight="900"
        fontSize="68" fill="#1B4D1B" letterSpacing="-2">CRIC</text>
      {/* Main lime layer */}
      <text x="30" y="75" fontFamily="Impact, Arial Black, sans-serif" fontWeight="900"
        fontSize="68" fill="#A8E63D" letterSpacing="-2">CRIC</text>

      {/* NETWORKS - light gray with dark green shadow */}
      <text x="32" y="115" fontFamily="Impact, Arial Black, sans-serif" fontWeight="900"
        fontSize="42" fill="#1B4D1B" letterSpacing="1">NETWORKS</text>
      <text x="30" y="113" fontFamily="Impact, Arial Black, sans-serif" fontWeight="900"
        fontSize="42" fill="#d8d8d8" letterSpacing="1">NETWORKS</text>

      {/* Cricket ball inside the O of NETWORKS */}
      <circle cx="189" cy="96" r="9" fill="#A8E63D" />
      <path d="M183 92 Q189 97 195 92" stroke="#1B4D1B" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M183 100 Q189 95 195 100" stroke="#1B4D1B" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar - dark green */}
      <div style={{ backgroundColor: '#0F2D0F' }} className="text-white text-xs border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-8">
          <div className="flex items-center gap-4 text-white/70">
            <span className="font-bold" style={{ color: '#A8E63D' }}>Cricket</span>
            {['Football', 'Tennis', 'Golf', 'More Sports'].map((s) => (
              <a key={s} href="#" className="hover:text-white transition-colors">{s}</a>
            ))}
          </div>
          <div className="flex items-center gap-3 text-white/60">
            <a href="#" className="hover:text-white">Sign In</a>
            <span>|</span>
            <a href="#" className="hover:text-white">Register</a>
          </div>
        </div>
      </div>

      {/* Main header - dark green */}
      <div style={{ backgroundColor: '#1B4D1B' }} className="text-white shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <CricNetworksLogo size="md" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 mx-4">
            {mainNavLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-150 whitespace-nowrap ${
                  location.pathname === link.href
                    ? 'text-[#0F2D0F] bg-[#A8E63D] font-bold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
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
                <Search size={14} className="text-gray-300" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search players, teams..."
                  className="bg-transparent text-white text-sm outline-none w-44 placeholder-gray-400"
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X size={14} className="text-gray-300 hover:text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <Search size={18} />
              </button>
            )}

            <button
              className="hidden sm:block text-[#1B4D1B] text-xs font-bold px-3 py-1.5 rounded hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#A8E63D' }}
            >
              SUBSCRIBE
            </button>

            <button
              className="lg:hidden p-2 text-white/80 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ backgroundColor: '#1B4D1B' }} className="lg:hidden border-t border-white/10">
            <nav className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col gap-1">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                    location.pathname === link.href
                      ? 'text-[#0F2D0F] bg-[#A8E63D] font-bold'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Sub nav - slightly lighter green */}
      <div style={{ backgroundColor: '#2A6B2A' }} className="text-white border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center gap-6 h-9 overflow-x-auto scrollbar-none">
          {['IND vs ENG', 'AUS vs SA', 'PAK vs NZ', 'WTC Final', 'IPL 2024', 'SA20', 'BBL'].map((label) => (
            <a key={label} href="#" className="text-xs text-white/60 hover:text-white whitespace-nowrap transition-colors">
              {label}
            </a>
          ))}
          <a href="#" className="text-xs font-medium hover:opacity-80 whitespace-nowrap flex items-center gap-1 ml-auto"
            style={{ color: '#A8E63D' }}>
            <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ backgroundColor: '#A8E63D' }}></span>
            Live Matches
          </a>
        </div>
      </div>
    </header>
  );
}
