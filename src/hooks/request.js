import { useState, useEffect } from 'react';

export const useRequest = (
  url,
  options = {
    body: null,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);

  const { body, method, headers } = options;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await (await fetch(url, { method, body, headers })).json();
        setData(res);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    error,
    loading,
    data,
  };
};
