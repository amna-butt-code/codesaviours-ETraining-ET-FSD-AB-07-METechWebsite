import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';

const steps = ['Consultation', 'Site survey', 'Design & proposal', 'Installation', 'Support'];

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'ME Technologies | Smart Engineering Today. Sustainable Tomorrow.';
    api
      .get('/services')
      .then((res) => setServices(res.data))
      .catch(() => setError('Could not load services. Please try again later.'))
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

      <section className="bg-[var(--color-light)] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">Our Services</h2>

          {loading && <p className="mt-6">Loading services...</p>}
          {error && <p className="mt-6 text-red-600">{error}</p>}
          {!loading && !error && services.length === 0 && <p className="mt-6">No services yet.</p>}

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s._id}
                to={`/services/${s.slug}`}
                className="rounded bg-white p-6 shadow transition hover:shadow-lg"
              >
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

      <section className="bg-[var(--color-primary)] py-12 text-center text-white">
        <h2 className="text-3xl font-bold !text-white">Ready to start your project?</h2>
        <Link to="/contact" className="mt-6 inline-block rounded bg-white px-6 py-3 font-semibold text-[var(--color-primary)]">
          Contact Us
        </Link>
      </section>
    </>
  );
}