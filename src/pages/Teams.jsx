import { useState } from 'react';
import { internationalTeams } from '../data/teams';

const formatTabs = ['International', 'IPL', 'BBL', 'PSL', 'The Hundred'];

const formColors = {
  W: 'bg-green-500 text-white',
  L: 'bg-red-500 text-white',
  D: 'bg-gray-400 text-white',
};

export default function Teams() {
  const [format, setFormat] = useState('International');
  const [selected, setSelected] = useState(null);

  if (selected) {
    return <TeamDetail team={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Teams</h1>

      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {formatTabs.map((t) => (
          <button
            key={t}
            onClick={() => setFormat(t)}
            className={`px-5 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all -mb-px ${
              format === t ? 'border-[#CC0000] text-[#CC0000]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {format === 'International' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {internationalTeams.map((team) => (
            <button
              key={team.id}
              onClick={() => setSelected(team)}
              className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md hover:border-gray-300 transition-all group"
            >
              <div className="text-5xl mb-3">{team.flag}</div>
              <h3 className="font-bold text-gray-900 group-hover:text-[#CC0000] transition-colors">{team.name}</h3>
              <p className="text-xs text-gray-500 mb-3">{team.shortName}</p>
              <div className="flex justify-center gap-0.5">
                {team.recentForm.map((r, i) => (
                  <span key={i} className={`w-5 h-5 rounded-sm text-xs flex items-center justify-center font-bold ${formColors[r] || 'bg-gray-200'}`}>
                    {r}
                  </span>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1 text-xs">
                <div className="bg-gray-50 rounded p-1.5">
                  <div className="font-bold text-gray-900">#{team.ranking.test}</div>
                  <div className="text-gray-500">Test</div>
                </div>
                <div className="bg-gray-50 rounded p-1.5">
                  <div className="font-bold text-gray-900">#{team.ranking.odi}</div>
                  <div className="text-gray-500">ODI</div>
                </div>
                <div className="bg-gray-50 rounded p-1.5">
                  <div className="font-bold text-gray-900">#{team.ranking.t20}</div>
                  <div className="text-gray-500">T20</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">🏏</p>
          <p className="font-medium">{format} teams coming soon</p>
        </div>
      )}
    </main>
  );
}

function TeamDetail({ team, onBack }) {
  const [tab, setTab] = useState('Overview');
  const tabs = ['Overview', 'Squad', 'Fixtures', 'Results', 'Stats'];

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      <button onClick={onBack} className="text-sm text-[#CC0000] hover:underline mb-4 flex items-center gap-1">
        ← Back to Teams
      </button>

      {/* Team header */}
      <div className="bg-[#0d1b2a] text-white rounded-xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="text-6xl">{team.flag}</div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold">{team.name}</h1>
            <p className="text-gray-400">{team.shortName} • International</p>
            <div className="flex gap-1 mt-3 justify-center sm:justify-start">
              {team.recentForm.map((r, i) => (
                <span key={i} className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold ${
                  r === 'W' ? 'bg-green-500' : r === 'L' ? 'bg-red-500' : 'bg-gray-500'
                }`}>{r}</span>
              ))}
              <span className="text-gray-400 text-xs ml-2 self-center">Last 5</span>
            </div>
          </div>
          <div className="sm:ml-auto grid grid-cols-3 gap-4 text-center">
            {[['Test', team.ranking.test], ['ODI', team.ranking.odi], ['T20I', team.ranking.t20]].map(([fmt, rank]) => (
              <div key={fmt} className="bg-white/10 rounded-lg p-3">
                <div className="text-xl font-black">#{rank}</div>
                <div className="text-gray-400 text-xs">{fmt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all -mb-px ${
              tab === t ? 'border-[#CC0000] text-[#CC0000]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Team Info</h3>
            <div className="space-y-3">
              {[
                { label: 'Captain', value: team.captain },
                { label: 'Head Coach', value: team.coach },
                { label: 'Test Ranking', value: `#${team.ranking.test}` },
                { label: 'ODI Ranking', value: `#${team.ranking.odi}` },
                { label: 'T20I Ranking', value: `#${team.ranking.t20}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Recent Form</h3>
            <div className="flex gap-2">
              {team.recentForm.map((r, i) => (
                <div key={i} className={`flex-1 rounded-lg p-3 text-center font-bold text-lg ${
                  r === 'W' ? 'bg-green-100 text-green-700' : r === 'L' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                }`}>{r}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'Squad' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {team.players.map((player) => (
            <div key={player} className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl mb-2">
                {team.flag}
              </div>
              <p className="text-sm font-semibold text-gray-900">{player}</p>
              <p className="text-xs text-gray-500">{team.shortName}</p>
            </div>
          ))}
        </div>
      )}

      {!['Overview', 'Squad'].includes(tab) && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">📊</p>
          <p className="font-medium">{tab} data coming soon</p>
        </div>
      )}
    </main>
  );
}
