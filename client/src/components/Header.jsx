import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/ev-charging', label: 'EV Charging' },
  { to: '/training', label: 'Training' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block py-2 font-medium hover:text-[var(--color-primary)] ${
      isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-dark)]'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="bg-[var(--color-dark)] text-white text-sm">
        <div className="mx-auto max-w-6xl px-4 py-1 flex justify-between">
          <span>Phone: 0316 6379325</span>
          <span className="hidden sm:inline">Smart Engineering Today. Sustainable Tomorrow.</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <img src="/logo.png" alt="ME Technologies" className="h-14 w-auto rounded bg-black" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/quote" className="rounded bg-[var(--color-primary)] px-4 py-2 font-semibold text-white">
            Get a Quote
          </Link>
        </nav>

        <button className="lg:hidden text-3xl" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t bg-white px-4 pb-4">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/quote" onClick={() => setOpen(false)} className="mt-2 inline-block rounded bg-[var(--color-primary)] px-4 py-2 font-semibold text-white">
            Get a Quote
          </Link>
        </nav>
      )}
    </header>
  );
}