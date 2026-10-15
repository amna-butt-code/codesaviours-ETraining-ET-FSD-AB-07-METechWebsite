import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';

const steps = ['Consultation', 'Site survey', 'Design & proposal', 'Installation', 'Support'];
const tools = ['MATLAB', 'Proteus', 'Multisim', 'SketchUp', 'PVsyst'];

const stats = [
  { end: 6, suffix: '', label: 'Consulting areas' },
  { end: 360, suffix: ' kW', label: 'Max DC fast charging' },
  { end: 5, suffix: '', label: 'Design and simulation tools' },
  { end: 3, suffix: '', label: 'Charging connector standards' },
];

function Counter({ end, suffix }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let cur = 0;
    const step = Math.max(1, Math.ceil(end / 40));
    const t = setInterval(() => {
      cur += step;
      if (cur >= end) {
        cur = end;
        clearInterval(t);
      }
      setN(cur);
    }, 30);
    return () => clearInterval(t);
  }, [end]);

  return (
    <span>
      {n}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [services, setServices] = useState([]);
  const [posts, setPosts] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'ME Technologies | Smart Engineering Today. Sustainable Tomorrow.';
    Promise.all([api.get('/services'), api.get('/posts'), api.get('/courses')])
      .then(([s, p, c]) => {
        setServices(s.data);
        setPosts(p.data.slice(0, 3));
        setCourse(c.data[0] || null);
      })
      .catch(() => setError('Could not load some content. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="bg-[var(--color-dark)] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold !text-white sm:text-5xl">
            Smart Engineering Today. Sustainable Tomorrow.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            Engineering consultancy and training in solar, battery storage, EV charging and more.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/quote" className="rounded bg-[var(--color-secondary)] px-6 py-3 font-semibold text-black">
              Get a Quote
            </Link>
            <Link to="/training" className="rounded border border-white px-6 py-3 font-semibold text-white">
              View Training
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-primary)] py-10 text-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-bold">
                <Counter end={s.end} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-light)] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">Our Services</h2>

          {loading && <p className="mt-6">Loading...</p>}
          {error && <p className="mt-6 text-red-600">{error}</p>}
          {!loading && !error && services.length === 0 && <p className="mt-6">No services yet.</p>}

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s._id} to={`/services/${s.slug}`} className="rounded bg-white p-6 shadow transition hover:shadow-lg">
                <h3 className="text-xl font-semibold text-[var(--color-primary)]">{s.title}</h3>
                <p className="mt-2 text-sm">{s.shortText}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">How We Work</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <div key={step} className="rounded border p-5 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] font-bold text-white">
                  {i + 1}
                </div>
                <p className="mt-3 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-light)] py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-2">
          <div className="rounded bg-white p-8 shadow">
            <h2 className="text-2xl font-bold">EV Charging</h2>
            <p className="mt-3">
              Complete EV charging setups from grid to charger. AC 7 to 22 kW and DC up to 360 kW, built to IEC 61851.
            </p>
            <Link to="/ev-charging" className="mt-5 inline-block font-semibold text-[var(--color-primary)] underline">
              Explore EV charging
            </Link>
          </div>

          <div className="rounded bg-white p-8 shadow">
            <h2 className="text-2xl font-bold">Training</h2>
            {course ? (
              <>
                <p className="mt-3 font-semibold">{course.title}</p>
                <p className="mt-1">
                  Learn {course.tools.join(' and ')} in {course.duration}. Online, for students and fresh graduates.
                </p>
                <Link to={`/training/${course.slug}`} className="mt-5 inline-block font-semibold text-[var(--color-primary)] underline">
                  View course and batches
                </Link>
              </>
            ) : (
              <p className="mt-3">Courses coming soon.</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">Latest from the Blog</h2>
          {!loading && posts.length === 0 && <p className="mt-6">No articles yet.</p>}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link key={p._id} to={`/blog/${p.slug}`} className="rounded bg-[var(--color-light)] p-6 transition hover:shadow-lg">
                <span className="text-xs font-semibold uppercase text-[var(--color-primary)]">{p.category}</span>
                <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm">{p.content.slice(0, 100)}...</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y py-10">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-sm font-semibold uppercase">Software we work with</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {tools.map((t) => (
              <span key={t} className="rounded-full bg-[var(--color-light)] px-5 py-2 font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-primary)] py-12 text-center text-white">
        <h2 className="text-3xl font-bold !text-white">Ready to start your project?</h2>
        <Link to="/contact" className="mt-6 inline-block rounded bg-white px-6 py-3 font-semibold text-[var(--color-primary)]">
          Contact Us
        </Link>
      </section>
    </>
  );
}