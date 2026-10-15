import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/projects/${slug}`)
      .then((res) => {
        setProject(res.data);
        document.title = `${res.data.title} | ME Technologies`;
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="p-10">Loading...</p>;

  if (notFound || !project)
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <Link to="/projects" className="mt-4 inline-block text-[var(--color-primary)] underline">
          Back to projects
        </Link>
      </div>
    );

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <Link to="/projects" className="text-sm text-[var(--color-primary)] underline">
          ← All projects
        </Link>
        <h1 className="mt-3 text-3xl font-bold">{project.title}</h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded bg-[var(--color-light)] p-4"><p className="text-sm">Capacity</p><p className="font-semibold">{project.capacity}</p></div>
          <div className="rounded bg-[var(--color-light)] p-4"><p className="text-sm">Sector</p><p className="font-semibold">{project.sector}</p></div>
          <div className="rounded bg-[var(--color-light)] p-4"><p className="text-sm">System</p><p className="font-semibold">{project.systemType}</p></div>
          <div className="rounded bg-[var(--color-light)] p-4"><p className="text-sm">City</p><p className="font-semibold">{project.city}</p></div>
        </div>

        <h2 className="mt-10 text-2xl font-semibold">About this project</h2>
        <p className="mt-3">{project.description}</p>

        <h2 className="mt-10 text-2xl font-semibold">Gallery</h2>
        {project.images.length === 0 ? (
          <p className="mt-3 text-sm">No images yet. They can be added from the admin panel.</p>
        ) : (
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {project.images.map((src) => (
              <img key={src} src={src.startsWith('http') ? src : `http://localhost:5000${src}`} alt={project.title} className="rounded" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}