import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api.js';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/posts/${slug}`)
      .then((res) => {
        setPost(res.data);
        document.title = `${res.data.title} | ME Technologies`;
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="p-10">Loading...</p>;

  if (notFound || !post)
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-[var(--color-primary)] underline">
          Back to blog
        </Link>
      </div>
    );

  return (
    <article className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <Link to="/blog" className="text-sm text-[var(--color-primary)] underline">
          ← All articles
        </Link>
        <p className="mt-4 text-xs font-semibold uppercase text-[var(--color-primary)]">{post.category}</p>
        <h1 className="mt-2 text-3xl font-bold">{post.title}</h1>
        <p className="mt-2 text-sm">{new Date(post.publishedAt).toLocaleDateString()}</p>
        <div className="mt-6 whitespace-pre-line leading-relaxed">{post.content}</div>
      </div>
    </article>
  );
}