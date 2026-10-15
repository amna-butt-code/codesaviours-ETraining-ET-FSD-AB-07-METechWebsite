import { useState } from 'react';
import api from '../api.js';

export default function LeadForm({ source = 'contact', defaultService = '', title = 'Request a Consultation' }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    service: defaultService,
    message: '',
  });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [sending, setSending] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setStatus({ type: 'error', text: 'Please enter your name.' });
    if (form.phone.trim().length < 7) return setStatus({ type: 'error', text: 'Please enter a valid phone number.' });

    setSending(true);
    setStatus({ type: '', text: '' });
    try {
      const res = await api.post('/leads', { ...form, source });
      setStatus({ type: 'success', text: res.data.message });
      setForm({ name: '', phone: '', email: '', city: '', service: defaultService, message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        text: err.response?.data?.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setSending(false);
    }
  };

  const input = 'w-full rounded border border-gray-300 px-3 py-2';

  return (
    <form onSubmit={submit} className="rounded bg-white p-6 shadow">
      <h3 className="text-xl font-semibold">{title}</h3>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <input className={input} name="name" placeholder="Your name *" value={form.name} onChange={change} />
        <input className={input} name="phone" placeholder="Phone *" value={form.phone} onChange={change} />
        <input className={input} name="email" type="email" placeholder="Email" value={form.email} onChange={change} />
        <input className={input} name="city" placeholder="City" value={form.city} onChange={change} />
      </div>
      <input className={`${input} mt-4`} name="service" placeholder="Service" value={form.service} onChange={change} />
      <textarea
        className={`${input} mt-4`}
        name="message"
        rows="4"
        placeholder="Your message"
        value={form.message}
        onChange={change}
      />

      {status.text && (
        <p className={`mt-4 text-sm ${status.type === 'success' ? 'text-green-700' : 'text-red-600'}`}>
          {status.text}
        </p>
      )}

      <button
        disabled={sending}
        className="mt-4 rounded bg-[var(--color-primary)] px-6 py-2 font-semibold text-white disabled:opacity-60"
      >
        {sending ? 'Sending...' : 'Submit'}
      </button>
    </form>
  );
}