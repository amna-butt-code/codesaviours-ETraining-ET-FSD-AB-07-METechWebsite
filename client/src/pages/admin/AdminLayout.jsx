import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';

const links = [{ to: '/admin', label: 'Dashboard', end: true }];

export default function AdminLayout() {
  const navigate = useNavigate();

  if (!localStorage.getItem('token')) return <Navigate to="/admin/login" replace />;

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const linkClass = ({ isActive }) =>
    `block rounded px-3 py-2 ${isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-gray-700'}`;

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="bg-[var(--color-dark)] p-4 text-gray-200 md:w-56">
        <h2 className="mb-4 text-lg font-bold text-white">ME Admin</h2>
        <nav className="space-y-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="mt-6 rounded border border-gray-500 px-3 py-2 text-sm hover:bg-gray-700">
          Logout
        </button>
      </aside>
      <main className="flex-1 bg-[var(--color-light)] p-6">
        <Outlet />
      </main>
    </div>
  );
}