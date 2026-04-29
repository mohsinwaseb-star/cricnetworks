import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';

export default function MatchCard({ match, compact = false }) {
  const isLive = match.status === 'live';
  const isCompleted = match.status === 'completed';
  const isUpcoming = match.status === 'upcoming';

  return (
    <Link
      to={isLive || isCompleted ? `/match/${match.id}` : '#'}
      className="block score-card hover:no-underline"
    >
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
              match.type === 'Test' ? 'bg-emerald-100 text-emerald-700' :
              match.type === 'ODI' ? 'bg-blue-100 text-blue-700' :
              match.type === 'T20I' ? 'bg-purple-100 text-purple-700' :
              'bg-orange-100 text-orange-700'
            }`}>
              {match.type}
            </span>
            {isLive && (
              <span className="flex items-center gap-1 text-xs font-bold text-red-500">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full live-dot"></span>
                LIVE
              </span>
            )}
            {isCompleted && <span className="text-xs text-gray-500">Result</span>}
            {isUpcoming && <span className="text-xs text-blue-600 font-medium">Upcoming</span>}
          </div>
          {isLive && match.matchDay && (
            <span className="text-xs text-gray-500">{match.matchDay}</span>
          )}
        </div>

        {/* Series */}
        {!compact && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-1">{match.series}</p>
        )}

        {/* Teams */}
        <div className="space-y-2">
          <TeamRow
            flag={match.team1.flag}
            name={match.team1.name}
            shortName={match.team1.shortName}
            score={match.team1.score}
            overs={match.team1.overs}
            batting={match.team1.batting}
            winner={isCompleted && match.winner === match.team1.shortName}
            compact={compact}
          />
          <TeamRow
            flag={match.team2.flag}
            name={match.team2.name}
            shortName={match.team2.shortName}
            score={match.team2.score}
            overs={match.team2.overs}
            batting={match.team2.batting}
            winner={isCompleted && match.winner === match.team2.shortName}
            compact={compact}
          />
        </div>

        {/* Status / result */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          {isLive && (
            <>
              <p className="text-xs font-semibold text-gray-800">{match.currentStatus}</p>
              {match.lastOver && (
                <p className="text-xs text-gray-500 mt-0.5">{match.lastOver}</p>
              )}
            </>
          )}
          {isCompleted && (
            <p className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <span>{match.resultIcon}</span> {match.result}
            </p>
          )}
          {isUpcoming && (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={11} />
              {match.startTime}
            </p>
          )}
        </div>

        {/* Venue */}
        {!compact && (match.venue) && (
          <p className="text-xs text-gray-400 mt-1 flex items-start gap-1">
            <MapPin size={11} className="mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{match.venue}</span>
          </p>
        )}
      </div>
    </Link>
  );
}

function TeamRow({ flag, name, shortName, score, overs, batting, winner, compact }) {
  return (
    <div className={`flex items-center justify-between ${batting ? 'opacity-100' : score ? 'opacity-80' : 'opacity-60'}`}>
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-lg leading-none">{flag}</span>
        <span className={`text-sm font-semibold truncate ${winner ? 'text-green-700' : 'text-gray-900'}`}>
          {compact ? shortName : name}
        </span>
        {batting && (
          <span className="text-xs bg-yellow-100 text-yellow-700 px-1 rounded font-medium">BAT</span>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {score && (
          <span className={`text-sm font-bold ${winner ? 'text-green-700' : 'text-gray-900'}`}>
            {score}
          </span>
        )}
        {overs && (
          <span className="text-xs text-gray-500">({overs})</span>
        )}
      </div>
    </div>
  );
}
