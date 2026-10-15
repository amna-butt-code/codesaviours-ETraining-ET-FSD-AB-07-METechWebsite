import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Services | ME Technologies';
    api
      .get('/services')
      .then((res) => setServices(res.data))
      .catch(() => setError('Could not load services.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <p className="mt-3 max-w-2xl">Engineering consulting across six areas, from design to support.</p>

        {loading && <p className="mt-8">Loading...</p>}
        {error && <p className="mt-8 text-red-600">{error}</p>}
        {!loading && !error && services.length === 0 && <p className="mt-8">No services yet.</p>}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s._id} to={`/services/${s.slug}`} className="rounded bg-[var(--color-light)] p-6 transition hover:shadow-lg">
              <h2 className="text-xl font-semibold text-[var(--color-primary)]">{s.title}</h2>
              <p className="mt-2 text-sm">{s.shortText}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}