import { Link } from 'react-router-dom';

const footerLinks = {
  Cricket: ['Live Scores', 'Fixtures', 'Results', 'Series', 'Rankings', 'Stats', 'Teams', 'Players'],
  News: ['Latest News', 'Match Reports', 'Analysis', 'Interviews', 'Videos', 'Opinion', 'Fantasy'],
  Formats: ['Test Cricket', 'ODI Cricket', 'T20 Cricket', 'IPL', 'The Hundred', 'BBL', 'PSL', 'CPL'],
  Company: ['About ESPNcricinfo', 'Contact Us', 'Careers', 'Advertise', 'Privacy Policy', 'Terms of Use', 'Cookie Policy'],
};

export default function Footer() {
  return (
    <footer className="bg-[#0d1b2a] text-white mt-12">
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        {/* Logo + tagline */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[#CC0000] font-black text-2xl">ESPN</span>
              <span className="text-white font-bold text-lg">cricinfo</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">The home of cricket</p>
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
              <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
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
          <p className="text-gray-500 text-xs">
            © 2024 ESPN Digital Media (India) Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Powered by ESPN · A subsidiary of The Walt Disney Company
          </p>
        </div>
      </div>
    </footer>
  );
}
