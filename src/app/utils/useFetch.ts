import { useEffect, useState } from 'react';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDBiYjBhNmJjNDY0ODQ2NDY0MmM2NjIxZjk5MGU2ZCIsInN1YiI6IjY1NzZkNzlmYzYwMDZkMDEzYzc3NGFkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n4tOsbGxReV-cxWpri5i86EdQXaLYJ4foj9evHesf60',
  },
};
const useFetch = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const baseUrl = 'https://api.themoviedb.org/3/';
  // fetching data
  useEffect(() => {
    // console.log(data, 'rr');

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}${url}`, options);
        const data = await res.json();
        setData(data.results);
        // console.log(data, 'kk');
      } catch (error) {
        setError('Something went wrong');
        // console.log('gg');
      } finally {
        // console.log('oo');
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { loading, data, error };
};

export default useFetch;
