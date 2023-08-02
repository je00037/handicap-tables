import { useState } from 'react';
import { CacheRef } from '../interfaces';
import { fireAnalytics } from '../utils/fireAnalytics';
interface LazyFetchReturn {
  getData: (
    league: string | number | undefined,
    season: number | undefined,
    cache: CacheRef
  ) => Promise<void>;
  loading: boolean;
  error: unknown;
}

export const useLazyFetch = (): LazyFetchReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const getData = async (
    league: string | number | undefined,
    season: number | undefined,
    cache: CacheRef
  ) => {
    setLoading(true);
    fireAnalytics('API Call', `${league}`, 'Data Request');
    const url =
      season === 2022
        ? `https://v3.football.api-sports.io/standings?league=${league}&season=2022`
        : `https://v3.football.api-sports.io/standings?league=${league}&season=2023`;
    const options = {
      headers: {
        'x-apisports-key': '1ee142cfc34ceae31ba7758c4bd972f4',
      },
    };
    try {
      const result = await fetch(url, options);
      const json = await result.json();
      const response = json.response;
      const isError = response?.errors?.length > 0 || response?.results === 0;
      if (isError) {
        setError(true);
        setLoading(false);
      } else {
        cache.current = [...cache.current, response];
        setLoading(false);
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    getData,
    loading,
    error,
  };
};
