import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, Minus } from 'lucide-react';
import { testBattingRankings, odiBattingRankings, t20BattingRankings, testBowlingRankings } from '../data/rankings';

const tabs = ['Test Batting', 'ODI Batting', 'T20 Batting', 'Test Bowling'];

const dataMap = {
  'Test Batting': testBattingRankings,
  'ODI Batting': odiBattingRankings,
  'T20 Batting': t20BattingRankings,
  'Test Bowling': testBowlingRankings,
};

function RankMovement({ rank, prev }) {
  const diff = prev - rank;
  if (diff > 0) return <ChevronUp size={12} className="text-green-500" />;
  if (diff < 0) return <ChevronDown size={12} className="text-red-500" />;
  return <Minus size={12} className="text-gray-400" />;
}

export default function RankingsWidget() {
  const [activeTab, setActiveTab] = useState('Test Batting');
  const data = dataMap[activeTab].slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-gray-900">ICC Rankings</h3>
        <Link to="/rankings" className="text-xs text-[#CC0000] hover:underline font-medium">
          Full Rankings
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-3 py-2 text-xs font-medium transition-all border-b-2 ${
              activeTab === tab
                ? 'border-[#CC0000] text-[#CC0000]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Rankings list */}
      <div className="divide-y divide-gray-50">
        {data.map((item) => (
          <div key={item.rank} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-5 flex items-center justify-center">
              <span className={`text-sm font-bold ${item.rank <= 3 ? 'text-[#CC0000]' : 'text-gray-500'}`}>
                {item.rank}
              </span>
            </div>
            <RankMovement rank={item.rank} prev={item.prev} />
            <span className="text-lg leading-none">{item.flag}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{item.player}</p>
              <p className="text-xs text-gray-500">{item.country}</p>
            </div>
            <span className="text-sm font-bold text-gray-700">{item.rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
