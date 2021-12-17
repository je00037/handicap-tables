import { useState } from 'react';

interface LazyFetchReturn {
  getData: (league: string | number, cache: any) => Promise<void>;
  loading: boolean;
  error: unknown;
}

export const useLazyFetch = (): LazyFetchReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const getData = async (league: string | number, cache: any) => {
    console.log('getData called');
    setLoading(true);
    const url = `https://v3.football.api-sports.io/standings?league=${league}&season=2021`;
    const options = {
      headers: {
        'x-apisports-key': '1ee142cfc34ceae31ba7758c4bd972f4',
      },
    };
    try {
      const result = await fetch(url, options);
      const json = await result.json();
      cache.current = [...cache.current, json];
      setLoading(false);
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
