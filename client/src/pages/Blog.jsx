import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';

const PER_PAGE = 6;

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Blog | ME Technologies';
    api
      .get('/posts')
      .then((res) => setPosts(res.data))
      .catch(() => setError('Could not load posts.'))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(posts.map((p) => p.category))];

  const filtered = posts.filter(
    (p) =>
      (category === 'All' || p.category === category) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-4xl font-bold">Blog</h1>

        <input
          className="mt-6 w-full rounded border border-gray-300 px-3 py-2 sm:w-80"
          placeholder="Search articles"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCategory(c);
                setPage(1);
              }}
              className={`rounded-full px-4 py-1 text-sm font-medium ${
                category === c ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-light)]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading && <p className="mt-8">Loading...</p>}
        {error && <p className="mt-8 text-red-600">{error}</p>}
        {!loading && !error && shown.length === 0 && <p className="mt-8">No articles found.</p>}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <Link key={p._id} to={`/blog/${p.slug}`} className="rounded bg-[var(--color-light)] p-6 transition hover:shadow-lg">
              <span className="text-xs font-semibold uppercase text-[var(--color-primary)]">{p.category}</span>
              <h2 className="mt-2 text-lg font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm">{p.content.slice(0, 110)}...</p>
              <p className="mt-3 text-xs">{new Date(p.publishedAt).toLocaleDateString()}</p>
            </Link>
          ))}
        </div>

        {pages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded border px-4 py-2 disabled:opacity-40">
              Previous
            </button>
            <span>Page {page} of {pages}</span>
            <button disabled={page === pages} onClick={() => setPage(page + 1)} className="rounded border px-4 py-2 disabled:opacity-40">
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}