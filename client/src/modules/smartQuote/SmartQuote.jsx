import { useState } from 'react';
import api from '../../api.js';
import { calculateEstimate } from './calculateEstimate.js';
import {
  cities, customerTypes, propertyTypes, systemTypes, sizeUnits, contactMethods,
} from './solarConfig.js';

const initial = {
  city: '', customerType: 'Residential', propertyType: 'House',
  propertySize: '', sizeUnit: 'marla', systemType: 'On-grid',
  summerBill: '', monthlyUnits: '', acCount: '',
  name: '', phone: '', email: '', contactMethod: 'Phone call',
};

const stepTitles = ['Location and property', 'Energy use', 'Your details'];

export default function SmartQuote() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initial);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (step === 0) {
      if (!form.city) return 'Please select your city.';
      if (!form.propertySize || Number(form.propertySize) <= 0) return 'Please enter your property size.';
    }
    if (step === 1) {
      if (!Number(form.monthlyUnits) && !Number(form.summerBill))
        return 'Please enter your monthly units (kWh) or your maximum summer bill.';
    }
    if (step === 2) {
      if (form.name.trim().length < 2) return 'Please enter your name.';
      if (form.phone.trim().length < 7) return 'Please enter a valid phone number.';
      if (form.email && !form.email.includes('@')) return 'Please enter a valid email.';
    }
    return '';
  };

  const next = () => {
    const msg = validate();
    if (msg) return setError(msg);
    setError('');
    setStep(step + 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) return setError(msg);

    const estimate = calculateEstimate(form);
    if (!estimate) return setError('Could not calculate an estimate from the values given.');

    setSending(true);
    setError('');
    const summary = [
      `Customer type: ${form.customerType}`,
      `Property: ${form.propertyType}, ${form.propertySize} ${form.sizeUnit}`,
      `System type: ${form.systemType}`,
      `Max summer bill: ${form.summerBill ? 'PKR ' + form.summerBill : 'not given'}`,
      `Monthly units: ${form.monthlyUnits ? form.monthlyUnits + ' kWh' : 'not given'}`,
      `Inverter ACs: ${form.acCount || 0}`,
      `Preferred contact: ${form.contactMethod}`,
      `Estimate: ${estimate.systemKw} kW, ${estimate.panels} panels, ${estimate.roofSqft} sq ft roof, savings about PKR ${estimate.savings}/month`,
    ].join('. ');

    try {
      const res = await api.post('/leads', {
        name: form.name,
        phone: form.phone,
        email: form.email,
        city: form.city,
        service: 'Solar PV',
        message: summary,
        source: 'quote',
      });
      setSaveMessage(res.data.message);
      setResult(estimate);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const restart = () => {
    setForm(initial);
    setStep(0);
    setResult(null);
    setError('');
  };

  const input = 'w-full rounded border border-gray-300 px-3 py-2';
  const label = 'mb-1 block text-sm font-medium';

  if (result) {
    return (
      <div className="rounded bg-white p-6 shadow">
        <h2 className="text-2xl font-bold">Your solar estimate</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded bg-[var(--color-light)] p-4">
            <p className="text-sm">Estimated system size</p>
            <p className="text-3xl font-bold text-[var(--color-primary)]">{result.systemKw} kW</p>
          </div>
          <div className="rounded bg-[var(--color-light)] p-4">
            <p className="text-sm">Number of panels</p>
            <p className="text-3xl font-bold text-[var(--color-primary)]">{result.panels}</p>
          </div>
          <div className="rounded bg-[var(--color-light)] p-4">
            <p className="text-sm">Roof area needed</p>
            <p className="text-3xl font-bold text-[var(--color-primary)]">{result.roofSqft} sq ft</p>
          </div>
          <div className="rounded bg-[var(--color-light)] p-4">
            <p className="text-sm">Rough monthly savings</p>
            <p className="text-3xl font-bold text-[var(--color-primary)]">PKR {result.savings.toLocaleString()}</p>
          </div>
        </div>
        <p className="mt-4 text-sm">
          This is a rough estimate based on {result.units} units per month. Final design and price are confirmed after a site survey.
        </p>
        <p className="mt-3 font-medium text-green-700">{saveMessage}</p>
        <button onClick={restart} className="mt-5 rounded border px-5 py-2">Start again</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded bg-white p-6 shadow">
      <p className="text-sm">Step {step + 1} of 3</p>
      <h2 className="text-2xl font-bold">{stepTitles[step]}</h2>
      <div className="mt-3 h-2 rounded bg-gray-200">
        <div className="h-2 rounded bg-[var(--color-primary)]" style={{ width: `${((step + 1) / 3) * 100}%` }} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {step === 0 && (
          <>
            <div>
              <label className={label}>City *</label>
              <select className={input} name="city" value={form.city} onChange={change}>
                <option value="">Select city</option>
                {cities.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Customer type</label>
              <select className={input} name="customerType" value={form.customerType} onChange={change}>
                {customerTypes.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Property type</label>
              <select className={input} name="propertyType" value={form.propertyType} onChange={change}>
                {propertyTypes.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className={label}>Property size *</label>
                <input className={input} type="number" min="0" name="propertySize" value={form.propertySize} onChange={change} />
              </div>
              <div>
                <label className={label}>Unit</label>
                <select className={input} name="sizeUnit" value={form.sizeUnit} onChange={change}>
                  {sizeUnits.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <label className={label}>Maximum summer bill (PKR)</label>
              <input className={input} type="number" min="0" name="summerBill" value={form.summerBill} onChange={change} />
            </div>
            <div>
              <label className={label}>Monthly units (kWh)</label>
              <input className={input} type="number" min="0" name="monthlyUnits" value={form.monthlyUnits} onChange={change} />
            </div>
            <div>
              <label className={label}>Number of inverter ACs</label>
              <input className={input} type="number" min="0" name="acCount" value={form.acCount} onChange={change} />
            </div>
            <div>
              <label className={label}>System type</label>
              <select className={input} name="systemType" value={form.systemType} onChange={change}>
                {systemTypes.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <p className="text-sm sm:col-span-2">Enter your monthly units, or your bill if you do not know the units.</p>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className={label}>Name *</label>
              <input className={input} name="name" value={form.name} onChange={change} />
            </div>
            <div>
              <label className={label}>Phone *</label>
              <input className={input} name="phone" value={form.phone} onChange={change} />
            </div>
            <div>
              <label className={label}>Email</label>
              <input className={input} type="email" name="email" value={form.email} onChange={change} />
            </div>
            <div>
              <label className={label}>Preferred contact method</label>
              <select className={input} name="contactMethod" value={form.contactMethod} onChange={change}>
                {contactMethods.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </>
        )}
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6 flex gap-3">
        {step > 0 && (
          <button type="button" onClick={() => { setError(''); setStep(step - 1); }} className="rounded border px-5 py-2">
            Back
          </button>
        )}
        {step < 2 ? (
          <button type="button" onClick={next} className="rounded bg-[var(--color-primary)] px-5 py-2 font-semibold text-white">
            Next
          </button>
        ) : (
          <button disabled={sending} className="rounded bg-[var(--color-primary)] px-5 py-2 font-semibold text-white disabled:opacity-60">
            {sending ? 'Sending...' : 'Get my estimate'}
          </button>
        )}
      </div>
    </form>
  );
}