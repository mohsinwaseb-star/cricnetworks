import { useState } from 'react';

const formatTabs = ['Test', 'ODI', 'T20I'];
const statTabs = ['Batting', 'Bowling'];

const battingStats = [
  { rank: 1, player: 'Sachin Tendulkar', country: 'IND', flag: '🇮🇳', matches: 200, innings: 329, runs: 15921, avg: 53.78, sr: 54.04, hundreds: 51, fifties: 68 },
  { rank: 2, player: 'Ricky Ponting', country: 'AUS', flag: '🇦🇺', matches: 168, innings: 287, runs: 13378, avg: 51.85, sr: 58.07, hundreds: 41, fifties: 62 },
  { rank: 3, player: 'Jacques Kallis', country: 'SA', flag: '🇿🇦', matches: 166, innings: 280, runs: 13289, avg: 55.37, sr: 46.23, hundreds: 45, fifties: 58 },
  { rank: 4, player: 'Rahul Dravid', country: 'IND', flag: '🇮🇳', matches: 164, innings: 286, runs: 13288, avg: 52.31, sr: 42.54, hundreds: 36, fifties: 63 },
  { rank: 5, player: 'Kumar Sangakkara', country: 'SL', flag: '🇱🇰', matches: 134, innings: 233, runs: 12400, avg: 57.40, sr: 50.34, hundreds: 38, fifties: 52 },
  { rank: 6, player: 'Brian Lara', country: 'WI', flag: '🏳️', matches: 131, innings: 232, runs: 11953, avg: 52.88, sr: 56.72, hundreds: 34, fifties: 48 },
  { rank: 7, player: 'Alastair Cook', country: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', matches: 161, innings: 291, runs: 12472, avg: 45.35, sr: 46.70, hundreds: 33, fifties: 57 },
  { rank: 8, player: 'Steve Waugh', country: 'AUS', flag: '🇦🇺', matches: 168, innings: 260, runs: 10927, avg: 51.06, sr: 48.87, hundreds: 32, fifties: 50 },
  { rank: 9, player: 'Mahela Jayawardene', country: 'SL', flag: '🇱🇰', matches: 149, innings: 252, runs: 11814, avg: 49.84, sr: 52.25, hundreds: 34, fifties: 50 },
  { rank: 10, player: 'Joe Root', country: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', matches: 140, innings: 249, runs: 12146, avg: 50.19, sr: 55.70, hundreds: 34, fifties: 62 },
];

const bowlingStats = [
  { rank: 1, player: 'Muttiah Muralitharan', country: 'SL', flag: '🇱🇰', matches: 133, innings: 230, wickets: 800, avg: 22.72, econ: 2.47, sr: 55.0, fifers: 67 },
  { rank: 2, player: 'Shane Warne', country: 'AUS', flag: '🇦🇺', matches: 145, innings: 273, wickets: 708, avg: 25.41, econ: 2.65, sr: 57.4, fifers: 37 },
  { rank: 3, player: 'James Anderson', country: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', matches: 188, innings: 347, wickets: 700, avg: 26.45, econ: 2.88, sr: 55.1, fifers: 32 },
  { rank: 4, player: 'Anil Kumble', country: 'IND', flag: '🇮🇳', matches: 132, innings: 236, wickets: 619, avg: 29.65, econ: 2.69, sr: 66.0, fifers: 35 },
  { rank: 5, player: 'Glenn McGrath', country: 'AUS', flag: '🇦🇺', matches: 124, innings: 243, wickets: 563, avg: 21.64, econ: 2.49, sr: 51.9, fifers: 29 },
  { rank: 6, player: 'R Ashwin', country: 'IND', flag: '🇮🇳', matches: 101, innings: 189, wickets: 514, avg: 24.00, econ: 2.83, sr: 50.9, fifers: 37 },
  { rank: 7, player: 'Nathan Lyon', country: 'AUS', flag: '🇦🇺', matches: 127, innings: 239, wickets: 530, avg: 31.90, econ: 2.84, sr: 67.4, fifers: 22 },
  { rank: 8, player: 'Stuart Broad', country: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', matches: 167, innings: 309, wickets: 604, avg: 27.68, econ: 2.84, sr: 58.4, fifers: 20 },
  { rank: 9, player: 'Courtney Walsh', country: 'WI', flag: '🏳️', matches: 132, innings: 242, wickets: 519, avg: 24.44, econ: 2.50, sr: 58.5, fifers: 22 },
  { rank: 10, player: 'Wasim Akram', country: 'PAK', flag: '🇵🇰', matches: 104, innings: 181, wickets: 414, avg: 23.62, econ: 2.57, sr: 55.0, fifers: 25 },
];

export default function Stats() {
  const [format, setFormat] = useState('Test');
  const [statType, setStatType] = useState('Batting');
  const [filter, setFilter] = useState('Runs');

  const data = statType === 'Batting' ? battingStats : bowlingStats;

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cricket Statistics</h1>

      {/* Format tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {formatTabs.map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${
              format === f ? 'border-[#A8E63D] text-[#A8E63D]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Stat type */}
      <div className="flex gap-2 mb-6">
        {statTabs.map((s) => (
          <button
            key={s}
            onClick={() => setStatType(s)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all ${
              statType === s ? 'bg-[#A8E63D] text-white border-[#A8E63D]' : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          {statType === 'Batting' ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1B4D1B] text-white text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3">#</th>
                  <th className="text-left px-4 py-3"></th>
                  <th className="text-left px-4 py-3">Player</th>
                  <th className="text-right px-4 py-3">M</th>
                  <th className="text-right px-4 py-3">Inn</th>
                  <th className="text-right px-4 py-3">Runs</th>
                  <th className="text-right px-4 py-3">Avg</th>
                  <th className="text-right px-4 py-3">SR</th>
                  <th className="text-right px-4 py-3">100s</th>
                  <th className="text-right px-4 py-3">50s</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((row) => (
                  <tr key={row.rank} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-gray-500">{row.rank}</td>
                    <td className="px-4 py-3 text-lg">{row.flag}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{row.player}</p>
                      <p className="text-xs text-gray-500">{row.country}</p>
                    </td>
                    <td className="text-right px-4 py-3 text-gray-600">{row.matches}</td>
                    <td className="text-right px-4 py-3 text-gray-600">{row.innings}</td>
                    <td className="text-right px-4 py-3 font-bold text-gray-900">{row.runs?.toLocaleString()}</td>
                    <td className="text-right px-4 py-3 text-gray-600">{row.avg}</td>
                    <td className="text-right px-4 py-3 text-gray-600">{row.sr}</td>
                    <td className="text-right px-4 py-3 text-gray-600">{row.hundreds}</td>
                    <td className="text-right px-4 py-3 text-gray-600">{row.fifties}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1B4D1B] text-white text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3">#</th>
                  <th className="text-left px-4 py-3"></th>
                  <th className="text-left px-4 py-3">Player</th>
                  <th className="text-right px-4 py-3">M</th>
                  <th className="text-right px-4 py-3">Inn</th>
                  <th className="text-right px-4 py-3">Wkts</th>
                  <th className="text-right px-4 py-3">Avg</th>
                  <th className="text-right px-4 py-3">Econ</th>
                  <th className="text-right px-4 py-3">SR</th>
                  <th className="text-right px-4 py-3">5W</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((row) => (
                  <tr key={row.rank} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-gray-500">{row.rank}</td>
                    <td className="px-4 py-3 text-lg">{row.flag}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{row.player}</p>
                      <p className="text-xs text-gray-500">{row.country}</p>
                    </td>
                    <td className="text-right px-4 py-3 text-gray-600">{row.matches}</td>
                    <td className="text-right px-4 py-3 text-gray-600">{row.innings}</td>
                    <td className="text-right px-4 py-3 font-bold text-[#A8E63D]">{row.wickets}</td>
                    <td className="text-right px-4 py-3 text-gray-600">{row.avg}</td>
                    <td className="text-right px-4 py-3 text-gray-600">{row.econ}</td>
                    <td className="text-right px-4 py-3 text-gray-600">{row.sr}</td>
                    <td className="text-right px-4 py-3 text-gray-600">{row.fifers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
