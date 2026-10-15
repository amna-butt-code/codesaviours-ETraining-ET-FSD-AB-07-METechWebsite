import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';

const sectors = ['All', 'Residential', 'Commercial', 'Industrial', 'Agriculture', 'EV'];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [sector, setSector] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Projects | ME Technologies';
    api
      .get('/projects')
      .then((res) => setProjects(res.data))
      .catch(() => setError('Could not load projects.'))
      .finally(() => setLoading(false));
  }, []);

  const shown = sector === 'All' ? projects : projects.filter((p) => p.sector === sector);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="mt-2 text-sm">Sample projects shown for demonstration. Real projects will replace them.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              className={`rounded-full px-4 py-1 text-sm font-medium ${
                sector === s ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-light)]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {loading && <p className="mt-8">Loading...</p>}
        {error && <p className="mt-8 text-red-600">{error}</p>}
        {!loading && !error && shown.length === 0 && <p className="mt-8">No projects found.</p>}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <Link key={p._id} to={`/projects/${p.slug}`} className="rounded bg-[var(--color-light)] p-6 transition hover:shadow-lg">
              <h2 className="text-lg font-semibold text-[var(--color-primary)]">{p.title}</h2>
              <p className="mt-3 text-sm">Capacity: {p.capacity}</p>
              <p className="text-sm">Sector: {p.sector}</p>
              <p className="text-sm">System: {p.systemType}</p>
              <p className="text-sm">City: {p.city}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}