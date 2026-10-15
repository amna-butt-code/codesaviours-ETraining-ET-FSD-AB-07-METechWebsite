import { useEffect } from 'react';

export default function Legal({ title, children }) {
  useEffect(() => {
    document.title = `${title} | ME Technologies`;
  }, [title]);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-sm">Sample text for demonstration. Replace with the company's official policy.</p>
        <div className="mt-6 space-y-4">{children}</div>
      </div>
    </section>
  );
}