import { useEffect } from 'react';
import LeadForm from '../components/LeadForm.jsx';

const offer = [
  'Load assessment and grid upgrades',
  'BESS for peak shaving',
  'Solar PV integration',
  'Smart EMS monitoring',
  'Multi-standard fast charging: CCS2, GB-T, Type-2, OCPP 1.6J',
];

const useCases = ['Homes', 'Offices', 'Fuel stations', 'Fleets'];

export default function EVCharging() {
  useEffect(() => {
    document.title = 'EV Charging | ME Technologies';
  }, []);

  return (
    <>
      <section className="bg-[var(--color-dark)] py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold !text-white">EV Charging Solutions</h1>
          <p className="mt-3 max-w-2xl text-gray-300">
            Complete EV charging setups from grid to charger, built to IEC 61851.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 grid gap-6 sm:grid-cols-2">
          <div className="rounded bg-[var(--color-light)] p-6">
            <h2 className="text-2xl font-semibold text-[var(--color-primary)]">AC chargers</h2>
            <p className="mt-2 text-3xl font-bold">7 to 22 kW</p>
            <p className="mt-1 text-sm">For homes, offices and parking areas.</p>
          </div>
          <div className="rounded bg-[var(--color-light)] p-6">
            <h2 className="text-2xl font-semibold text-[var(--color-primary)]">DC fast chargers</h2>
            <p className="mt-2 text-3xl font-bold">Up to 360 kW</p>
            <p className="mt-1 text-sm">For fuel stations, highways and fleets.</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-light)] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">What we offer</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {offer.map((o) => (
              <li key={o} className="rounded bg-white p-4 shadow">{o}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">Use cases</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u) => (
              <div key={u} className="rounded border p-5 text-center font-medium">{u}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-light)] py-16">
        <div className="mx-auto max-w-3xl px-4">
          <LeadForm source="contact" defaultService="EV Charging" title="EV charging enquiry" />
        </div>
      </section>
    </>
  );
}