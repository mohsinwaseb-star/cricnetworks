const footerLinks = {
  Cricket: ['Live Scores', 'Fixtures', 'Results', 'Series', 'Rankings', 'Stats', 'Teams', 'Players'],
  News: ['Latest News', 'Match Reports', 'Analysis', 'Interviews', 'Videos', 'Opinion', 'Fantasy'],
  Formats: ['Test Cricket', 'ODI Cricket', 'T20 Cricket', 'IPL', 'The Hundred', 'BBL', 'PSL', 'CPL'],
  Company: ['About CricNetworks', 'Contact Us', 'Careers', 'Advertise', 'Privacy Policy', 'Terms of Use'],
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0F2D0F' }} className="text-white mt-12">
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        {/* Logo + tagline */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <div className="flex items-center leading-none">
              <span className="font-black text-2xl" style={{ color: '#A8E63D' }}>Cric</span>
              <span className="font-black text-2xl text-white">Networks</span>
            </div>
            <p className="text-white/40 text-xs mt-1 italic tracking-widest uppercase">Where every fan is in the game</p>
          </div>
          <div className="flex gap-3">
            {['Twitter', 'Facebook', 'Instagram', 'YouTube'].map((s) => (
              <a key={s} href="#" className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: '#A8E63D' }}>{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">© 2024 CricNetworks. All rights reserved.</p>
          <p className="text-white/20 text-xs">Powered by CricAPI · Live Cricket Data</p>
        </div>
      </div>
    </footer>
  );
}
