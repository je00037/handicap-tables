import { useState } from 'react';
import { endpointBuilder } from '../utils/endpointBuilder';

export const useLazyFetch = (cache: any, setCache: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const getData = async (league: string | number) => {
    console.log('getData called');
    setLoading(true);
    const url = endpointBuilder(league);
    const options = {
      headers: {
        'x-apisports-key': '1ee142cfc34ceae31ba7758c4bd972f4',
      },
    };
    try {
      const result = await fetch(url, options);
      const json = await result.json();
      setCache([...cache, json]);
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
