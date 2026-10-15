import { useEffect } from 'react';

const reasons = [
  'Engineers who work across solar, storage, EV charging and building design',
  'One team from site survey to design, installation support and monitoring',
  'Practical training for students and fresh graduates',
  'Clear proposals and honest advice',
];

const tools = ['MATLAB', 'Proteus', 'Multisim', 'SketchUp', 'PVsyst'];

const team = [
  { role: 'Lead Engineer' },
  { role: 'Solar Design Engineer' },
  { role: 'Training Instructor' },
];

export default function About() {
  useEffect(() => {
    document.title = 'About | ME Technologies';
  }, []);

  return (
    <>
      <section className="bg-[var(--color-dark)] py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold !text-white">About ME Technologies</h1>
          <p className="mt-3 max-w-2xl text-gray-300">
            An engineering consultancy and training company. Smart Engineering Today. Sustainable Tomorrow.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Our story</h2>
            <p className="mt-3">
              ME Technologies helps homes, businesses and industries use energy smartly. We design and support
              electrical, solar PV, battery storage and EV charging systems, and we train the next generation of
              solar designers.
            </p>
          </div>
          <div className="space-y-6">
            <div className="rounded bg-[var(--color-light)] p-6">
              <h3 className="text-xl font-semibold text-[var(--color-primary)]">Mission</h3>
              <p className="mt-2">Deliver reliable, affordable engineering solutions that make energy cleaner.</p>
            </div>
            <div className="rounded bg-[var(--color-light)] p-6">
              <h3 className="text-xl font-semibold text-[var(--color-primary)]">Vision</h3>
              <p className="mt-2">A sustainable future powered by smart engineering and skilled people.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-light)] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">Why choose us</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {reasons.map((r) => (
              <li key={r} className="rounded bg-white p-4 shadow">{r}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">Our team</h2>
          <p className="mt-2 text-sm">Sample cards. Replace with real team members later.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {team.map((m) => (
              <div key={m.role} className="rounded border p-6 text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-[var(--color-light)]" />
                <p className="mt-3 font-semibold">Sample Team Member</p>
                <p className="text-sm">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-light)] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">Software and tools we use</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {tools.map((t) => (
              <span key={t} className="rounded-full bg-white px-5 py-2 font-medium shadow">{t}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}