import { ApiData } from '../interfaces';
import { useState, useEffect } from 'react';

export const useFetch = (url: string, options: Record<string, unknown>) => {
  const [response, setResponse] = useState<ApiData | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(url, options);
        const json = await result.json();
        setResponse(json);
        setLoading(false);
        if (error) setError(null);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, []);

  return { response, error, loading };
};
