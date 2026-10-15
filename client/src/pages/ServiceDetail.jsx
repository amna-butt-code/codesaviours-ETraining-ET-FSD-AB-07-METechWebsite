import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api.js';
import LeadForm from '../components/LeadForm.jsx';

const steps = ['Consultation', 'Site survey', 'Design & proposal', 'Installation', 'Support'];

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/services/${slug}`)
      .then((res) => {
        setService(res.data);
        document.title = `${res.data.title} | ME Technologies`;
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="p-10">Loading...</p>;

  if (notFound || !service)
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">Service not found</h1>
        <Link to="/services" className="mt-4 inline-block text-[var(--color-primary)] underline">
          Back to services
        </Link>
      </div>
    );

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Link to="/services" className="text-sm text-[var(--color-primary)] underline">
          ← All services
        </Link>
        <h1 className="mt-3 text-4xl font-bold">{service.title}</h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p className="mt-3">{service.description}</p>

            <h2 className="mt-10 text-2xl font-semibold">Our process</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-6">
              {steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>

          <LeadForm source="contact" defaultService={service.title} title="Free Consultation" />
        </div>
      </div>
    </section>
  );
}