const API_KEY = 'a66a3353-cc76-41a6-8222-b583feed504b';
const BASE_URL = 'https://api.cricapi.com/v1';

async function get(endpoint, params = {}) {
  const query = new URLSearchParams({ apikey: API_KEY, offset: 0, ...params });
  const res = await fetch(`${BASE_URL}/${endpoint}?${query}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.status !== 'success') throw new Error(json.reason || 'API error');
  return json;
}

// Try multiple endpoints in order until one succeeds
export async function fetchMatches() {
  const endpoints = ['currentMatches', 'matches'];
  for (const ep of endpoints) {
    try {
      const json = await get(ep);
      if (json.data?.length) return json.data;
    } catch {
      // try next
    }
  }
  return null; // all failed — caller uses static data
}

export async function getSeriesInfo(id) { return get('series_info', { id }); }
export async function getMatchInfo(id) { return get('match_info', { id }); }
export async function getMatchScorecard(id) { return get('match_scorecard', { id }); }

export function normaliseMatch(m) {
  const teams = m.teams || [];
  const scores = m.score || [];

  const team1Name = teams[0] || 'TBA';
  const team2Name = teams[1] || 'TBA';

  const score1 = scores.find((s) => s.inning?.startsWith(team1Name));
  const score2 = scores.find((s) => s.inning?.startsWith(team2Name));

  const isLive = m.matchStarted && !m.matchEnded;
  const isCompleted = m.matchEnded;

  return {
    id: m.id,
    status: isLive ? 'live' : isCompleted ? 'result' : 'upcoming',
    type: m.matchType?.toUpperCase() || 'MATCH',
    seriesKey: m.series_id || 'other',
    seriesName: m.series || 'International',
    venue: m.venue?.split(',')[0] || '',
    team1: {
      name: team1Name,
      shortName: team1Name.length > 6 ? team1Name.slice(0, 6) : team1Name,
      flag: teamFlag(team1Name),
      score: score1 ? `${score1.r}/${score1.w}` : undefined,
      overs: score1 ? String(score1.o) : undefined,
    },
    team2: {
      name: team2Name,
      shortName: team2Name.length > 6 ? team2Name.slice(0, 6) : team2Name,
      flag: teamFlag(team2Name),
      score: score2 ? `${score2.r}/${score2.w}` : undefined,
      overs: score2 ? String(score2.o) : undefined,
    },
    result: isCompleted ? m.status : undefined,
    currentStatus: isLive ? m.status : undefined,
    startTime: !m.matchStarted ? m.dateTimeGMT : undefined,
    hasTable: false,
  };
}

const FLAGS = {
  India: '🇮🇳', England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', Australia: '🇦🇺', 'South Africa': '🇿🇦',
  Pakistan: '🇵🇰', 'New Zealand': '🇳🇿', 'West Indies': '🏳️', 'Sri Lanka': '🇱🇰',
  Bangladesh: '🇧🇩', Zimbabwe: '🇿🇼', Afghanistan: '🇦🇫', Ireland: '🇮🇪',
  Nepal: '🇳🇵', Oman: '🇴🇲', Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', UAE: '🇦🇪',
  Netherlands: '🇳🇱', USA: '🇺🇸',
};

function teamFlag(name) {
  if (!name) return '🏏';
  for (const [key, flag] of Object.entries(FLAGS)) {
    if (name.toLowerCase().includes(key.toLowerCase())) return flag;
  }
  return '🏏';
}
