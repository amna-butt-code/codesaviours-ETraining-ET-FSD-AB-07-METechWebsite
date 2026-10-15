import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found | ME Technologies';
  }, []);

  return (
    <section className="py-24 text-center">
      <h1 className="text-6xl font-bold text-[var(--color-primary)]">404</h1>
      <p className="mt-4 text-xl">This page does not exist.</p>
      <Link to="/" className="mt-6 inline-block rounded bg-[var(--color-primary)] px-6 py-3 font-semibold text-white">
        Back to Home
      </Link>
    </section>
  );
}