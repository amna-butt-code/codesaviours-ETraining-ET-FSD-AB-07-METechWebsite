import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api.js';

function EnrollForm({ course, batch, onDone }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', university: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [sending, setSending] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setStatus({ type: 'error', text: 'Please enter your name.' });
    if (form.phone.trim().length < 7) return setStatus({ type: 'error', text: 'Please enter a valid phone number.' });
    if (!form.email.includes('@')) return setStatus({ type: 'error', text: 'Please enter a valid email.' });

    setSending(true);
    try {
      const res = await api.post('/enrollments', { ...form, course: course._id, batch: batch._id });
      setStatus({ type: 'success', text: res.data.message });
      setForm({ name: '', phone: '', email: '', university: '' });
      onDone();
    } catch (err) {
      setStatus({ type: 'error', text: err.response?.data?.message || 'Something went wrong.' });
    } finally {
      setSending(false);
    }
  };

  const input = 'w-full rounded border border-gray-300 px-3 py-2';

  return (
    <form onSubmit={submit} className="mt-4 rounded border bg-white p-4">
      <p className="font-semibold">Enroll in the batch starting {new Date(batch.startDate).toLocaleDateString()}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <input className={input} name="name" placeholder="Full name *" value={form.name} onChange={change} />
        <input className={input} name="phone" placeholder="Phone *" value={form.phone} onChange={change} />
        <input className={input} name="email" type="email" placeholder="Email *" value={form.email} onChange={change} />
        <input className={input} name="university" placeholder="University" value={form.university} onChange={change} />
      </div>
      {status.text && (
        <p className={`mt-3 text-sm ${status.type === 'success' ? 'text-green-700' : 'text-red-600'}`}>{status.text}</p>
      )}
      <button disabled={sending} className="mt-3 rounded bg-[var(--color-primary)] px-5 py-2 font-semibold text-white disabled:opacity-60">
        {sending ? 'Sending...' : 'Confirm enrollment'}
      </button>
    </form>
  );
}

export default function TrainingDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [openBatch, setOpenBatch] = useState(null);

  const loadBatches = (courseId) =>
    api.get('/batches').then((res) => setBatches(res.data.filter((b) => b.course && b.course._id === courseId)));

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/courses/${slug}`)
      .then(async (res) => {
        setCourse(res.data);
        document.title = `${res.data.title} | ME Technologies`;
        await loadBatches(res.data._id);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="p-10">Loading...</p>;

  if (notFound || !course)
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">Course not found</h1>
        <Link to="/training" className="mt-4 inline-block text-[var(--color-primary)] underline">
          Back to training
        </Link>
      </div>
    );

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <Link to="/training" className="text-sm text-[var(--color-primary)] underline">
          ← All courses
        </Link>
        <h1 className="mt-3 text-4xl font-bold">{course.title}</h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded bg-[var(--color-light)] p-4"><p className="text-sm">Duration</p><p className="font-semibold">{course.duration}</p></div>
          <div className="rounded bg-[var(--color-light)] p-4"><p className="text-sm">Mode</p><p className="font-semibold">Online</p></div>
          <div className="rounded bg-[var(--color-light)] p-4"><p className="text-sm">Tools</p><p className="font-semibold">{course.tools.join(', ')}</p></div>
          <div className="rounded bg-[var(--color-light)] p-4"><p className="text-sm">Fee</p><p className="font-semibold">PKR {course.fee.toLocaleString()}</p></div>
        </div>

        <h2 className="mt-10 text-2xl font-semibold">Course outline</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-6">
          {course.outline.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ol>

        <h2 className="mt-10 text-2xl font-semibold">Upcoming batches</h2>
        {batches.length === 0 && <p className="mt-3">No upcoming batches yet.</p>}

        <div className="mt-3 space-y-3">
          {batches.map((b) => {
            const left = b.totalSeats - b.seatsTaken;
            const full = left <= 0;
            return (
              <div key={b._id} className="rounded border p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">Starts {new Date(b.startDate).toLocaleDateString()} ({b.mode})</p>
                    <p className="text-sm">
                      {full ? <span className="font-semibold text-red-600">Full</span> : left <= 5 ? <span className="font-semibold text-orange-600">Only {left} seats left</span> : `${left} seats left`}
                    </p>
                  </div>
                  <button
                    disabled={full}
                    onClick={() => setOpenBatch(openBatch === b._id ? null : b._id)}
                    className="rounded bg-[var(--color-primary)] px-5 py-2 font-semibold text-white disabled:bg-gray-400"
                  >
                    {full ? 'Full' : 'Enroll'}
                  </button>
                </div>
                {openBatch === b._id && !full && (
                  <EnrollForm course={course} batch={b} onDone={() => loadBatches(course._id)} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}