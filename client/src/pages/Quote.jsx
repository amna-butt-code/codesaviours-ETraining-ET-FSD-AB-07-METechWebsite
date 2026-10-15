import { useEffect } from 'react';
import LeadForm from '../components/LeadForm.jsx';

export default function Quote() {
  useEffect(() => {
    document.title = 'Get a Quote | ME Technologies';
  }, []);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-bold">Get a Free Quote</h1>
        <p className="mt-3">Share a few details and our team will prepare a quote for you.</p>
        <div className="mt-8">
          <LeadForm source="quote" title="Quote request" />
        </div>
      </div>
    </section>
  );
}