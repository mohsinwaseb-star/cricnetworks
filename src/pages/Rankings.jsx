import { useState } from 'react';
import { ChevronUp, ChevronDown, Minus } from 'lucide-react';
import {
  testBattingRankings, testBowlingRankings,
  odiBattingRankings, t20BattingRankings,
  teamRankings
} from '../data/rankings';

const formatTabs = ['Test', 'ODI', 'T20I'];
const categoryTabs = ['Teams', 'Batting', 'Bowling', 'All-rounders'];

const playerData = {
  Test: { Batting: testBattingRankings, Bowling: testBowlingRankings },
  ODI: { Batting: odiBattingRankings, Bowling: testBowlingRankings },
  T20I: { Batting: t20BattingRankings, Bowling: testBowlingRankings },
};

function RankChange({ rank, prev }) {
  const diff = prev - rank;
  if (diff > 0) return <span className="flex items-center text-green-500 text-xs"><ChevronUp size={12} />{diff}</span>;
  if (diff < 0) return <span className="flex items-center text-red-500 text-xs"><ChevronDown size={12} />{Math.abs(diff)}</span>;
  return <Minus size={12} className="text-gray-400" />;
}

export default function Rankings() {
  const [format, setFormat] = useState('Test');
  const [category, setCategory] = useState('Teams');

  const teamData = teamRankings[format.toLowerCase()] || teamRankings.test;
  const playerList = playerData[format]?.[category] || testBattingRankings;

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">ICC Rankings</h1>

      {/* Format tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {formatTabs.map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${
              format === f ? 'border-[#CC0000] text-[#CC0000]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categoryTabs.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all ${
              category === c ? 'bg-[#CC0000] text-white border-[#CC0000]' : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {category === 'Teams' ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0d1b2a] text-white text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-semibold">Pos</th>
                  <th className="text-left px-4 py-3 font-semibold"></th>
                  <th className="text-left px-4 py-3 font-semibold">Team</th>
                  <th className="text-right px-4 py-3 font-semibold">Rating</th>
                  <th className="text-right px-4 py-3 font-semibold">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {teamData.map((team, i) => (
                  <tr key={team.rank} className={`hover:bg-gray-50 transition-colors ${i < 3 ? 'font-medium' : ''}`}>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${team.rank <= 3 ? 'text-[#CC0000]' : 'text-gray-500'}`}>
                        {team.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xl">{team.flag}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{team.team}</td>
                    <td className="text-right px-4 py-3 text-sm font-bold text-gray-900">{team.rating}</td>
                    <td className="text-right px-4 py-3 text-sm text-gray-600">{team.points.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : category === 'All-rounders' ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">🏏</p>
          <p className="font-medium">All-rounders rankings coming soon</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0d1b2a] text-white text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-semibold">Pos</th>
                  <th className="text-left px-4 py-3 font-semibold">+/-</th>
                  <th className="text-left px-4 py-3 font-semibold"></th>
                  <th className="text-left px-4 py-3 font-semibold">Player</th>
                  <th className="text-left px-4 py-3 font-semibold">Country</th>
                  <th className="text-right px-4 py-3 font-semibold">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {playerList.map((player) => (
                  <tr key={player.rank} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${player.rank <= 3 ? 'text-[#CC0000]' : 'text-gray-500'}`}>
                        {player.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <RankChange rank={player.rank} prev={player.prev} />
                    </td>
                    <td className="px-4 py-3 text-lg">{player.flag}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900">{player.player}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{player.country}</td>
                    <td className="text-right px-4 py-3 text-sm font-bold text-gray-900">{player.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
