import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { currentSeries, upcomingSeries, recentSeries, seriesFixtures } from '../data/series';

const tabs = ['Current', 'Upcoming', 'Archive'];

export default function Series() {
  const [tab, setTab] = useState('Current');
  const [selectedSeries, setSelectedSeries] = useState(null);

  const data = tab === 'Current' ? currentSeries : tab === 'Upcoming' ? upcomingSeries : recentSeries;

  if (selectedSeries) {
    return <SeriesDetail series={selectedSeries} onBack={() => setSelectedSeries(null)} />;
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Series</h1>

      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${
              tab === t ? 'border-[#CC0000] text-[#CC0000]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((series) => (
          <button
            key={series.id}
            onClick={() => setSelectedSeries(series)}
            className="text-left bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                series.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                series.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {series.status === 'ongoing' ? 'LIVE SERIES' : series.status.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500">{series.type}</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              {series.flags.map((f, i) => <span key={i} className="text-2xl">{f}</span>)}
            </div>

            <h3 className="font-bold text-gray-900 text-sm mb-1">{series.name} {series.year}</h3>
            <p className="text-xs text-gray-500 mb-3">{series.format}</p>

            {series.score && (
              <p className="text-sm font-semibold text-[#CC0000]">{series.score}</p>
            )}
            {series.result && (
              <p className="text-sm font-semibold text-gray-700">{series.result}</p>
            )}

            <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
              <Calendar size={11} />
              {series.startDate && `${series.startDate}${series.endDate ? ` – ${series.endDate}` : ''}`}
            </div>

            {series.venue && (
              <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                <MapPin size={11} /> {series.venue}
              </div>
            )}
          </button>
        ))}
      </div>
    </main>
  );
}

function SeriesDetail({ series, onBack }) {
  const [activeTab, setActiveTab] = useState('Fixtures');
  const detailTabs = ['Fixtures', 'Standings', 'Stats', 'News'];

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      <button onClick={onBack} className="text-sm text-[#CC0000] hover:underline mb-4 flex items-center gap-1">
        ← Back to Series
      </button>

      <div className="bg-[#0d1b2a] text-white rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          {series.flags.map((f, i) => <span key={i} className="text-3xl">{f}</span>)}
          {series.status === 'ongoing' && (
            <span className="ml-2 flex items-center gap-1 text-xs font-bold text-red-400">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full live-dot"></span>
              ONGOING
            </span>
          )}
        </div>
        <h1 className="text-xl font-bold text-white">{series.name} {series.year}</h1>
        <p className="text-gray-400 text-sm mt-1">{series.format}</p>
        {series.score && <p className="text-yellow-300 font-semibold mt-2">{series.score}</p>}
        {series.startDate && (
          <p className="text-gray-400 text-xs mt-2 flex items-center gap-1">
            <Calendar size={12} /> {series.startDate} – {series.endDate}
          </p>
        )}
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        {detailTabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${
              activeTab === t ? 'border-[#CC0000] text-[#CC0000]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'Fixtures' && (
        <div className="space-y-3">
          {seriesFixtures.map((fixture, i) => (
            <div key={i} className={`bg-white rounded-xl border p-4 ${fixture.status === 'live' ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    fixture.status === 'live' ? 'bg-red-500 text-white' :
                    fixture.status === 'completed' ? 'bg-gray-200 text-gray-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>{fixture.matchNo}</span>
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                      {fixture.flags.map((f, j) => <span key={j}>{f}</span>)}
                      <span className="text-sm">{fixture.teams}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                      <MapPin size={10} /> {fixture.venue}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{fixture.date}</p>
                  {fixture.result && (
                    <p className={`text-sm font-semibold mt-0.5 ${fixture.status === 'live' ? 'text-red-600' : 'text-gray-800'}`}>
                      {fixture.result}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab !== 'Fixtures' && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">📊</p>
          <p className="font-medium">{activeTab} data coming soon</p>
        </div>
      )}
    </main>
  );
}
