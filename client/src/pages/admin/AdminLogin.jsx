import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api.js';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Is the server running?');
    } finally {
      setSending(false);
    }
  };

  const input = 'w-full rounded border border-gray-300 px-3 py-2';

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-light)] px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded bg-white p-8 shadow">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <input
          className={`${input} mt-6`}
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className={`${input} mt-4`}
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <button
          disabled={sending}
          className="mt-6 w-full rounded bg-[var(--color-primary)] py-2 font-semibold text-white disabled:opacity-60"
        >
          {sending ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}