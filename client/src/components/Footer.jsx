import { Link } from 'react-router-dom';

const quickLinks = [
  { to: '/about', label: 'About' },
  { to: '/ev-charging', label: 'EV Charging' },
  { to: '/training', label: 'Training' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const services = [
  'Electrical Engineering',
  'Solar PV',
  'BESS',
  'EV Charging',
  'Architecture and Building Design',
  'Civil and Structural Engineering',
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-xl font-bold text-white">ME Technologies</h3>
          <p className="mt-3 text-sm">
            Engineering consultancy and training company. Smart Engineering Today. Sustainable Tomorrow.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Services</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Contact</h4>
          <p className="mt-3 text-sm">Phone / WhatsApp: 0316 6379325</p>
          <p className="mt-1 text-sm">
            <a href="https://linkedin.com/company/metechnologies" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
            {' | '}
            <a href="https://facebook.com/METechnologies45" target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a>
          </p>

          <form className="mt-4 flex" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); e.target.reset(); }}>
            <input
              type="email"
              required
              placeholder="Your email"
              className="w-full rounded-l px-3 py-2 text-sm text-gray-900"
            />
            <button className="rounded-r bg-[var(--color-primary)] px-3 py-2 text-sm font-semibold text-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm">
        <span>© {new Date().getFullYear()} ME Technologies. All rights reserved.</span>
        <span className="mx-2">|</span>
        <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
        <span className="mx-2">|</span>
        <Link to="/terms" className="hover:text-white">Terms</Link>
      </div>
    </footer>
  );
}