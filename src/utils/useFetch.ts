import { ApiData } from '../interfaces';
import { useState, useEffect } from 'react';
export const useFetch = (url: string, options: object) => {
  const [response, setResponse] = useState<ApiData | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      //   setLoading(true);
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
