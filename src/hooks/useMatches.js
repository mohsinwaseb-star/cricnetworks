import { useState, useEffect } from 'react';
import { fetchMatches, normaliseMatch } from '../api/cricket';
import { allMatches, seriesFilters as staticFilters } from '../data/matches';

export function useMatches() {
  const [matches, setMatches] = useState(allMatches);
  const [filters, setFilters] = useState(staticFilters);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches()
      .then((data) => {
        if (!data) return; // API unavailable — keep static data

        const normalised = data.map(normaliseMatch);
        if (normalised.length === 0) return;

        setMatches(normalised);

        const seriesMap = {};
        normalised.forEach((m) => {
          if (!seriesMap[m.seriesKey]) {
            seriesMap[m.seriesKey] = { key: m.seriesKey, label: m.seriesName, count: 0 };
          }
          seriesMap[m.seriesKey].count += 1;
        });

        setFilters([
          { key: 'All', label: 'Matches', count: normalised.length },
          ...Object.values(seriesMap),
        ]);
      })
      .catch(() => {}) // silent fallback to static data
      .finally(() => setLoading(false));
  }, []);

  return { matches, filters, loading };
}
