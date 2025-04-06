import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);       // Store the data
  const [loading, setLoading] = useState(true); // Track loading
  const [error, setError] = useState(null);     // Catch errors

  useEffect(() => {
    if (!url){ return;} // If no URL provided, don't run

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [url]);

  return { data, loading, error };
};

export default useFetch;
