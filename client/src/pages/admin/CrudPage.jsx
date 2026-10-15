import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api.js';

const API_ROOT = 'http://localhost:5000';
const imgSrc = (u) => (u.startsWith('http') ? u : API_ROOT + u);
const slugify = (s) =>
  String(s || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function CrudPage({ title, endpoint, fields, columns, slugFrom }) {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState('');
  const [options, setOptions] = useState({});

  const handle401 = (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      navigate('/admin/login');
      return true;
    }
    return false;
  };

  const load = () => {
    api
      .get(endpoint)
      .then((res) => {
        setRows(res.data);
        setError('');
      })
      .catch((err) => {
        if (!handle401(err)) setError('Could not load data.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = `${title} | ME Admin`;
    load();
    fields
      .filter((f) => f.type === 'relation')
      .forEach((f) => {
        api
          .get(f.optionsEndpoint)
          .then((res) => setOptions((o) => ({ ...o, [f.name]: res.data })))
          .catch(() => {});
      });
  }, []);

  const emptyForm = () => {
    const v = {};
    fields.forEach((f) => {
      v[f.name] = f.type === 'images' ? [] : '';
    });
    return v;
  };

  const toForm = (item) => {
    const v = {};
    fields.forEach((f) => {
      const x = item[f.name];
      if (f.type === 'list') v[f.name] = (x || []).join('\n');
      else if (f.type === 'images') v[f.name] = x || [];
      else if (f.type === 'date') v[f.name] = x ? String(x).slice(0, 10) : '';
      else if (f.type === 'relation') v[f.name] = x?._id || x || '';
      else v[f.name] = x ?? '';
    });
    return v;
  };

  const toPayload = () => {
    const p = {};
    fields.forEach((f) => {
      const x = form[f.name];
      if (f.type === 'list') p[f.name] = x.split('\n').map((s) => s.trim()).filter(Boolean);
      else if (f.type === 'number') p[f.name] = x === '' ? 0 : Number(x);
      else p[f.name] = x;
    });
    return p;
  };

  const startNew = () => {
    setForm(emptyForm());
    setFormError('');
    setEditing('new');
  };

  const startEdit = (item) => {
    setForm(toForm(item));
    setFormError('');
    setEditing(item);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      const payload = toPayload();
      if (editing === 'new') {
        if (slugFrom) payload.slug = slugify(form[slugFrom]);
        await api.post(endpoint, payload);
      } else {
        await api.put(`${endpoint}/${editing._id}`, payload);
      }
      setEditing(null);
      load();
    } catch (err) {
      if (!handle401(err)) setFormError(err.response?.data?.message || 'Could not save.');
    } finally {
      setSaving(false);
    }
  };

  const remove = (id) => {
    if (!window.confirm('Delete this item?')) return;
    api
      .delete(`${endpoint}/${id}`)
      .then(load)
      .catch((err) => {
        if (!handle401(err)) setError('Could not delete.');
      });
  };

  const upload = async (name, multiple, file) => {
    if (!file) return;
    const data = new FormData();
    data.append('image', file);
    setUploading(true);
    setFormError('');
    try {
      const res = await api.post('/upload', data);
      setForm((f) => ({ ...f, [name]: multiple ? [...f[name], res.data.url] : res.data.url }));
    } catch (err) {
      if (!handle401(err)) setFormError(err.response?.data?.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const inputClass = 'w-full rounded border border-gray-300 px-3 py-2';

  const renderField = (f) => {
    const value = form[f.name];
    const set = (v) => setForm({ ...form, [f.name]: v });

    switch (f.type) {
      case 'textarea':
        return <textarea className={inputClass} rows={f.rows || 4} required={f.required} value={value} onChange={(e) => set(e.target.value)} />;
      case 'list':
        return <textarea className={inputClass} rows={4} placeholder="One item per line" value={value} onChange={(e) => set(e.target.value)} />;
      case 'number':
        return <input type="number" min="0" className={inputClass} required={f.required} value={value} onChange={(e) => set(e.target.value)} />;
      case 'date':
        return <input type="date" className={inputClass} required={f.required} value={value} onChange={(e) => set(e.target.value)} />;
      case 'select':
        return (
          <select className={inputClass} required={f.required} value={value} onChange={(e) => set(e.target.value)}>
            <option value="">Select</option>
            {f.options.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        );
      case 'relation':
        return (
          <select className={inputClass} required={f.required} value={value} onChange={(e) => set(e.target.value)}>
            <option value="">Select</option>
            {(options[f.name] || []).map((o) => (
              <option key={o._id} value={o._id}>{o[f.optionLabel]}</option>
            ))}
          </select>
        );
      case 'image':
        return (
          <div>
            {value && <img src={imgSrc(value)} alt="" className="mb-2 h-24 rounded" />}
            <input type="file" accept="image/*" onChange={(e) => { upload(f.name, false, e.target.files[0]); e.target.value = ''; }} />
          </div>
        );
      case 'images':
        return (
          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              {value.map((u) => (
                <div key={u} className="relative">
                  <img src={imgSrc(u)} alt="" className="h-20 rounded" />
                  <button
                    type="button"
                    onClick={() => set(value.filter((x) => x !== u))}
                    className="absolute right-0 top-0 rounded-bl bg-red-600 px-1 text-xs text-white"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <input type="file" accept="image/*" onChange={(e) => { upload(f.name, true, e.target.files[0]); e.target.value = ''; }} />
          </div>
        );
      default:
        return <input className={inputClass} required={f.required} value={value} onChange={(e) => set(e.target.value)} />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>
        <button onClick={startNew} className="rounded bg-[var(--color-primary)] px-5 py-2 font-semibold text-white">
          Add new
        </button>
      </div>

      {editing && (
        <form onSubmit={save} className="mt-6 rounded bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">{editing === 'new' ? 'Add new' : 'Edit'}</h2>
          <div className="mt-4 space-y-4">
            {fields.map((f) => (
              <div key={f.name}>
                <label className="mb-1 block text-sm font-medium">
                  {f.label}
                  {f.required && ' *'}
                </label>
                {renderField(f)}
              </div>
            ))}
          </div>
          {formError && <p className="mt-4 text-sm text-red-600">{formError}</p>}
          <div className="mt-6 flex gap-3">
            <button disabled={saving || uploading} className="rounded bg-[var(--color-primary)] px-5 py-2 font-semibold text-white disabled:opacity-60">
              {saving ? 'Saving...' : uploading ? 'Uploading...' : 'Save'}
            </button>
            <button type="button" onClick={() => setEditing(null)} className="rounded border px-5 py-2">
              Cancel
            </button>
          </div>
        </form>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}
      {loading && <p className="mt-4">Loading...</p>}
      {!loading && !error && rows.length === 0 && <p className="mt-4">Nothing here yet. Click Add new.</p>}

      {rows.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded bg-white shadow">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((c) => (
                  <th key={c.label} className="px-3 py-2">{c.label}</th>
                ))}
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r._id} className="border-t">
                  {columns.map((c) => (
                    <td key={c.label} className="px-3 py-2 align-top">{c.render(r)}</td>
                  ))}
                  <td className="whitespace-nowrap px-3 py-2 align-top">
                    <button onClick={() => startEdit(r)} className="mr-3 text-[var(--color-primary)] underline">Edit</button>
                    <button onClick={() => remove(r._id)} className="text-red-600 underline">Delete</button>
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