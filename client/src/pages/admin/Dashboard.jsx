import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api.js';

const cards = [
  { key: 'newLeads', label: 'New leads' },
  { key: 'enrollments', label: 'Enrollments' },
  { key: 'posts', label: 'Blog posts' },
  { key: 'projects', label: 'Projects' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Dashboard | ME Admin';
    api
      .get('/stats')
      .then((res) => setStats(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/admin/login');
        } else {
          setError('Could not load stats.');
        }
      });
  }, [navigate]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {!stats && !error && <p className="mt-4">Loading...</p>}
      {stats && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.key} className="rounded bg-white p-6 shadow">
              <p className="text-sm">{c.label}</p>
              <p className="mt-2 text-4xl font-bold text-[var(--color-primary)]">{stats[c.key]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}