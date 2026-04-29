import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Clock } from 'lucide-react';
import { liveMatches, matchScorecard } from '../data/matches';

const tabs = ['Scorecard', 'Commentary', 'Overs', 'Squads', 'Info'];

export default function MatchDetail() {
  const { id } = useParams();
  const [tab, setTab] = useState('Scorecard');
  const [inningsIdx, setInningsIdx] = useState(1);

  const match = liveMatches.find((m) => m.id === Number(id)) || liveMatches[0];
  const innings = matchScorecard.innings[inningsIdx];

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Link to="/scores" className="flex items-center gap-1 text-sm text-[#CC0000] hover:underline mb-4">
        <ChevronLeft size={16} /> Back to Scores
      </Link>

      {/* Match header card */}
      <div className="bg-[#0d1b2a] text-white rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
            match.type === 'Test' ? 'bg-emerald-600' :
            match.type === 'ODI' ? 'bg-blue-600' : 'bg-purple-600'
          }`}>{match.type}</span>
          <span className="flex items-center gap-1 text-xs font-bold text-red-400">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full live-dot"></span>
            LIVE
          </span>
          <span className="text-xs text-gray-400">{match.matchDay}</span>
        </div>
        <p className="text-gray-400 text-xs mb-4">{match.series}</p>

        {/* Teams & scores */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 justify-center text-center">
          <TeamScore flag={match.team1.flag} name={match.team1.name} score={match.team1.score} overs={match.team1.overs} batting={match.team1.batting} />
          <span className="text-gray-500 font-bold text-lg hidden sm:block">vs</span>
          <TeamScore flag={match.team2.flag} name={match.team2.name} score={match.team2.score} overs={match.team2.overs} batting={match.team2.batting} />
        </div>

        <div className="mt-4 text-center">
          <p className="text-yellow-300 font-semibold text-sm">{match.currentStatus}</p>
          <p className="text-gray-400 text-xs mt-1">{match.lastOver}</p>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1 text-gray-500 text-xs">
          <MapPin size={11} /> {match.venue}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all -mb-px ${
              tab === t ? 'border-[#CC0000] text-[#CC0000]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Scorecard' && (
        <div>
          {/* Innings selector */}
          <div className="flex gap-2 mb-4">
            {matchScorecard.innings.map((inn, i) => (
              <button
                key={i}
                onClick={() => setInningsIdx(i)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all ${
                  inningsIdx === i ? 'bg-[#CC0000] text-white border-[#CC0000]' : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                {inn.flag} {inn.team} {i + 1}st Innings
              </button>
            ))}
          </div>

          {/* Batting scorecard */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 border-b flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <span>{innings.flag}</span> {innings.team} {innings.total}
                <span className="text-sm text-gray-500 font-normal">({innings.overs} ov)</span>
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                    <th className="text-left px-4 py-2 font-medium">Batter</th>
                    <th className="text-right px-3 py-2 font-medium">R</th>
                    <th className="text-right px-3 py-2 font-medium">B</th>
                    <th className="text-right px-3 py-2 font-medium">4s</th>
                    <th className="text-right px-3 py-2 font-medium">6s</th>
                    <th className="text-right px-3 py-2 font-medium">SR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {innings.batters.map((b) => (
                    <tr key={b.name} className={`hover:bg-gray-50 ${b.batting ? 'bg-yellow-50' : ''}`}>
                      <td className="px-4 py-2.5">
                        <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                          {b.name}
                          {b.batting && <span className="text-xs bg-yellow-200 text-yellow-800 px-1 rounded font-medium">*</span>}
                        </p>
                        <p className="text-xs text-gray-500">{b.dismissal}</p>
                      </td>
                      <td className="text-right px-3 py-2.5 font-bold">{b.runs}</td>
                      <td className="text-right px-3 py-2.5 text-gray-600">{b.balls}</td>
                      <td className="text-right px-3 py-2.5 text-gray-600">{b.fours}</td>
                      <td className="text-right px-3 py-2.5 text-gray-600">{b.sixes}</td>
                      <td className="text-right px-3 py-2.5 text-gray-600">{b.sr}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 text-xs text-gray-500" colSpan={6}>
                      Extras: {innings.extras}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Bowling scorecard */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b">
              <h3 className="font-bold text-gray-900">Bowling</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                    <th className="text-left px-4 py-2 font-medium">Bowler</th>
                    <th className="text-right px-3 py-2 font-medium">O</th>
                    <th className="text-right px-3 py-2 font-medium">M</th>
                    <th className="text-right px-3 py-2 font-medium">R</th>
                    <th className="text-right px-3 py-2 font-medium">W</th>
                    <th className="text-right px-3 py-2 font-medium">Econ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {innings.bowlers.map((b) => (
                    <tr key={b.name} className="hover:bg-gray-50">
                      <td className="px-4 py-2.5 font-semibold text-gray-900">{b.name}</td>
                      <td className="text-right px-3 py-2.5 text-gray-600">{b.overs}</td>
                      <td className="text-right px-3 py-2.5 text-gray-600">{b.maidens}</td>
                      <td className="text-right px-3 py-2.5 text-gray-600">{b.runs}</td>
                      <td className="text-right px-3 py-2.5 font-bold text-[#CC0000]">{b.wickets}</td>
                      <td className="text-right px-3 py-2.5 text-gray-600">{b.econ}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'Commentary' && <CommentaryTab />}
      {tab === 'Overs' && <OversTab />}
      {tab === 'Squads' && <div className="text-center py-16 text-gray-500 text-sm">Squad information loading...</div>}
      {tab === 'Info' && <InfoTab match={match} />}
    </main>
  );
}

function TeamScore({ flag, name, score, overs, batting }) {
  return (
    <div className={`text-center ${batting ? '' : 'opacity-70'}`}>
      <div className="text-4xl mb-1">{flag}</div>
      <p className="font-bold text-white text-lg">{name}</p>
      {score ? (
        <>
          <p className="text-2xl font-black text-white">{score}</p>
          <p className="text-gray-400 text-xs">({overs} ov)</p>
        </>
      ) : (
        <p className="text-gray-500 text-sm">Yet to bat</p>
      )}
      {batting && <p className="text-yellow-400 text-xs font-bold mt-1">BATTING</p>}
    </div>
  );
}

function CommentaryTab() {
  const commentary = [
    { over: '82.3', bowler: 'J Anderson', batter: 'R Ashwin', text: 'Full delivery outside off, Ashwin drives firmly through cover for 4! India look comfortable.', runs: 4 },
    { over: '82.2', bowler: 'J Anderson', batter: 'S Iyer', text: 'Short of length, Iyer pulls hard but straight to square leg fielder. Dot ball.', runs: 0 },
    { over: '82.1', bowler: 'J Anderson', batter: 'S Iyer', text: 'Excellent line and length, shapes away late, Iyer beaten outside off. Dot.', runs: 0 },
    { over: '81.6', bowler: 'R Hartley', batter: 'R Ashwin', text: 'Tossed up, Ashwin reads it early and sweeps for a single to keep the strike.', runs: 1 },
    { over: '81.5', bowler: 'R Hartley', batter: 'R Ashwin', text: 'Full, Ashwin comes down the track and lofts over mid-on for SIX! Magnificent!', runs: 6 },
    { over: '81.4', bowler: 'R Hartley', batter: 'S Iyer', text: 'Quicker delivery, Iyer dabs to third man for a single.', runs: 1 },
    { over: '81.3', bowler: 'R Hartley', batter: 'S Iyer', text: 'Iyer sweeps hard, bottom edge goes to fine leg for two.', runs: 2 },
    { over: '81.2', bowler: 'R Hartley', batter: 'S Iyer', text: 'Good length delivery, Iyer pushes to mid-off. Dot.', runs: 0 },
    { over: '81.1', bowler: 'R Hartley', batter: 'S Iyer', text: 'Tossed up outside off, Iyer drives elegantly for four through covers!', runs: 4 },
  ];

  return (
    <div className="space-y-3">
      {commentary.map((c, i) => (
        <div key={i} className={`flex gap-3 p-3 rounded-lg ${c.runs === 6 ? 'bg-purple-50 border border-purple-100' : c.runs === 4 ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}>
          <div className="flex-shrink-0 text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              c.runs === 6 ? 'bg-purple-500 text-white' :
              c.runs === 4 ? 'bg-blue-500 text-white' :
              c.runs === 0 ? 'bg-gray-300 text-gray-700' :
              'bg-green-500 text-white'
            }`}>
              {c.runs === 0 ? '•' : c.runs}
            </div>
            <p className="text-xs text-gray-500 mt-1">{c.over}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">{c.bowler} to {c.batter}</p>
            <p className="text-sm text-gray-800">{c.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function OversTab() {
  const overs = [
    { over: 82, runs: 12, wickets: 0, balls: ['1', '0', '0', '4', '6', '1'] },
    { over: 81, runs: 11, wickets: 0, balls: ['4', '2', '1', '0', '4', '0'] },
    { over: 80, runs: 6, wickets: 0, balls: ['0', '1', '2', '0', '2', '1'] },
    { over: 79, runs: 3, wickets: 1, balls: ['W', '0', '1', '0', '1', '1'] },
    { over: 78, runs: 8, wickets: 0, balls: ['1', '1', '2', '0', '4', '0'] },
    { over: 77, runs: 5, wickets: 0, balls: ['0', '1', '0', '2', '1', '1'] },
  ];

  return (
    <div className="space-y-2">
      {overs.map((over) => (
        <div key={over.over} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-4">
          <div className="text-sm font-bold text-gray-500 w-12">Ov {over.over}</div>
          <div className="flex gap-1.5">
            {over.balls.map((ball, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  ball === 'W' ? 'bg-red-500 text-white' :
                  ball === '6' ? 'bg-purple-500 text-white' :
                  ball === '4' ? 'bg-blue-500 text-white' :
                  ball === '0' ? 'bg-gray-100 text-gray-500' :
                  'bg-green-100 text-green-700'
                }`}
              >
                {ball}
              </div>
            ))}
          </div>
          <div className="ml-auto text-sm">
            <span className="font-bold">{over.runs}</span>
            {over.wickets > 0 && <span className="text-red-500 font-bold"> ({over.wickets}W)</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function InfoTab({ match }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="divide-y divide-gray-100">
        {[
          { label: 'Series', value: match.series },
          { label: 'Match', value: `${match.type} - Match 3` },
          { label: 'Venue', value: match.venue },
          { label: 'Toss', value: 'India won the toss and elected to field' },
          { label: 'Match Day', value: match.matchDay },
          { label: 'Umpires', value: 'Nitin Menon, Paul Reiffel' },
          { label: 'TV Umpire', value: 'Rod Tucker' },
          { label: 'Match Referee', value: 'Richie Richardson' },
        ].map(({ label, value }) => (
          <div key={label} className="flex px-4 py-3">
            <span className="text-sm text-gray-500 w-32 flex-shrink-0">{label}</span>
            <span className="text-sm text-gray-900 font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
