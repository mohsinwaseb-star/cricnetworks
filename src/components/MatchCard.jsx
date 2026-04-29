import { Link } from 'react-router-dom';

const statusLabel = {
  live: { text: 'LIVE', cls: 'text-[#A8E63D] font-bold' },
  result: { text: 'RESULT', cls: 'text-gray-500 font-semibold' },
  upcoming: { text: 'UPCOMING', cls: 'text-blue-600 font-semibold' },
  abandoned: { text: 'ABANDONED', cls: 'text-gray-500 font-semibold' },
};

export default function MatchCard({ match }) {
  const label = statusLabel[match.status] || statusLabel.result;
  const isLive = match.status === 'live';

  return (
    <div className="flex-shrink-0 w-72 bg-white border border-gray-200 rounded-lg flex flex-col">
      {/* Card header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <span className={`text-xs uppercase tracking-wide ${label.cls} flex items-center gap-1`}>
          {isLive && <span className="w-1.5 h-1.5 bg-[#A8E63D] rounded-full live-dot" />}
          {label.text}
        </span>
        <span className="text-xs text-gray-400 text-right">
          {match.type} • {match.venue}
        </span>
      </div>

      {/* Teams */}
      <div className="px-3 pb-2 space-y-1.5 flex-1">
        <TeamRow match={match} team={match.team1} />
        <TeamRow match={match} team={match.team2} />
      </div>

      {/* Result / status */}
      <div className="px-3 pb-2">
        {(match.result || match.currentStatus) && (
          <p className={`text-xs leading-snug ${isLive ? 'text-gray-700 font-medium' : 'text-[#1a6eb5] font-medium'} line-clamp-2`}>
            {match.result || match.currentStatus}
          </p>
        )}
        {match.status === 'upcoming' && match.startTime && (
          <p className="text-xs text-gray-500">{match.startTime}</p>
        )}
      </div>

      {/* Footer links */}
      <div className="border-t border-gray-100 px-3 py-2 flex items-center gap-3">
        <a href="#" className="text-xs text-gray-600 hover:text-[#A8E63D] font-medium transition-colors">
          Schedule
        </a>
        {match.hasTable && (
          <a href="#" className="text-xs text-gray-600 hover:text-[#A8E63D] font-medium transition-colors">
            Table
          </a>
        )}
      </div>
    </div>
  );
}

function TeamRow({ match, team }) {
  const isBatting = team.batting;
  const hasScore = Boolean(team.score);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-base leading-none w-5 text-center">{team.flag}</span>
        <span className={`text-sm truncate ${isBatting ? 'font-bold text-gray-900' : hasScore ? 'text-gray-700' : 'text-gray-500'}`}>
          {team.shortName}
        </span>
      </div>
      {hasScore && (
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className={`text-sm ${isBatting ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
            {team.score}
          </span>
          {team.overs && match.status !== 'result' && (
            <span className="text-xs text-gray-400">({team.overs})</span>
          )}
          {team.target && match.status === 'result' && (
            <span className="text-xs text-gray-400">(T:{team.target})</span>
          )}
        </div>
      )}
      {!hasScore && match.status === 'upcoming' && (
        <span className="text-xs text-gray-400">Yet to bat</span>
      )}
    </div>
  );
}
