import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://api.football-data.org/v4/competitions/';
const API_TOKEN = '2338d6cde3d347f7813091f21eef54d5'; 

const useFetchCompetitions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: { 'X-Auth-Token': API_TOKEN },
        });
        setData(res.data.competitions || []);
      } catch (err) {
        setError('Failed to load competitions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchCompetitions;
