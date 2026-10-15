import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';

export default function Training() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Training | ME Technologies';
    api
      .get('/courses')
      .then((res) => setCourses(res.data))
      .catch(() => setError('Could not load courses.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-4xl font-bold">Training Programs</h1>
        <p className="mt-3 max-w-2xl">
          Online training for undergraduate students and fresh graduates in solar design.
        </p>

        {loading && <p className="mt-8">Loading...</p>}
        {error && <p className="mt-8 text-red-600">{error}</p>}
        {!loading && !error && courses.length === 0 && <p className="mt-8">No courses yet.</p>}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <Link key={c._id} to={`/training/${c.slug}`} className="rounded bg-[var(--color-light)] p-6 transition hover:shadow-lg">
              <h2 className="text-xl font-semibold text-[var(--color-primary)]">{c.title}</h2>
              <p className="mt-2 text-sm">Duration: {c.duration}</p>
              <p className="text-sm">Tools: {c.tools.join(', ')}</p>
              <p className="mt-2 font-semibold">PKR {c.fee.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}