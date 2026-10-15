import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api.js';

const statuses = ['New', 'Contacted', 'Closed'];

export default function RecordsTable({ title, endpoint, columns }) {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fail = (err, text) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      navigate('/admin/login');
    } else {
      setError(text);
    }
  };

  const load = () => {
    setLoading(true);
    api
      .get(endpoint, { params: { q: q || undefined, status: status || undefined } })
      .then((res) => {
        setRows(res.data);
        setError('');
      })
      .catch((err) => fail(err, 'Could not load data.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = `${title} | ME Admin`;
    load();
  }, [status]);

  const changeStatus = (id, value) => {
    api
      .put(`${endpoint}/${id}`, { status: value })
      .then((res) => setRows(rows.map((r) => (r._id === id ? { ...r, status: res.data.status } : r))))
      .catch((err) => fail(err, 'Could not update status.'));
  };

  const remove = (id) => {
    if (!window.confirm('Delete this record?')) return;
    api
      .delete(`${endpoint}/${id}`)
      .then(() => setRows(rows.filter((r) => r._id !== id)))
      .catch((err) => fail(err, 'Could not delete.'));
  };

  const input = 'rounded border border-gray-300 px-3 py-2';

  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>

      <form
        className="mt-6 flex flex-wrap gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          load();
        }}
      >
        <input className={`${input} w-64`} placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className={input} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button className="rounded bg-[var(--color-primary)] px-5 py-2 font-semibold text-white">Search</button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}
      {loading && <p className="mt-4">Loading...</p>}
      {!loading && !error && rows.length === 0 && <p className="mt-4">No records found.</p>}

      {rows.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded bg-white shadow">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((c) => (
                  <th key={c.label} className="px-3 py-2">{c.label}</th>
                ))}
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r._id} className="border-t">
                  {columns.map((c) => (
                    <td key={c.label} className="px-3 py-2 align-top">{c.render(r)}</td>
                  ))}
                  <td className="px-3 py-2 align-top">
                    <select
                      className="rounded border border-gray-300 px-2 py-1"
                      value={r.status}
                      onChange={(e) => changeStatus(r._id, e.target.value)}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2 align-top">
                    <button onClick={() => remove(r._id)} className="text-red-600 underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}