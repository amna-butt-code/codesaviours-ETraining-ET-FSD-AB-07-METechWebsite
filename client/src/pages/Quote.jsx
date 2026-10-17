import { useEffect } from 'react';
import SmartQuote from '../modules/smartQuote/SmartQuote.jsx';

export default function Quote() {
  useEffect(() => {
    document.title = 'Get a Quote | ME Technologies';
  }, []);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-bold">Get a Free Solar Quote</h1>
        <p className="mt-3">Answer a few questions and get a rough solar estimate instantly.</p>
        <div className="mt-8">
          <SmartQuote />
        </div>
      </div>
    </section>
  );
}