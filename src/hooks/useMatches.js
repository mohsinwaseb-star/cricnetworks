import { useState, useEffect } from 'react';
import { getCurrentMatches, normaliseMatch } from '../api/cricket';
import { allMatches, seriesFilters as staticFilters } from '../data/matches';

export function useMatches() {
  const [matches, setMatches] = useState(allMatches);
  const [filters, setFilters] = useState(staticFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCurrentMatches()
      .then((json) => {
        const normalised = (json.data || []).map(normaliseMatch);
        if (normalised.length === 0) return;

        setMatches(normalised);

        // Build series filter tabs from live data
        const seriesMap = {};
        normalised.forEach((m) => {
          if (!seriesMap[m.seriesKey]) {
            seriesMap[m.seriesKey] = { key: m.seriesKey, label: m.seriesName, count: 0 };
          }
          seriesMap[m.seriesKey].count += 1;
        });

        const dynamicFilters = [
          { key: 'All', label: 'Matches', count: normalised.length },
          ...Object.values(seriesMap),
        ];
        setFilters(dynamicFilters);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { matches, filters, loading, error };
}
