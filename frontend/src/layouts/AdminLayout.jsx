import { NavLink, Outlet } from 'react-router-dom'
import logoAllevent from '../assets/brand/logo-allevent.png'
import './admin-layout.css'

export function AdminLayout() {
  const links = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/users', label: 'Users' },
    { to: '/admin/prestataires', label: 'Prestataires' },
    { to: '/admin/activities', label: 'Activites' },
    { to: '/admin/reviews', label: 'Avis' },
    { to: '/admin/reports', label: 'Signalements' },
    { to: '/admin/ads', label: 'Ads' },
    { to: '/admin/commissions', label: 'Commissions' },
    { to: '/admin/disputes', label: 'Litiges' },
    { to: '/admin/statistics', label: 'Stats' },
    { to: '/admin/notifications', label: 'Notifications' },
  ]

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <NavLink to="/admin/dashboard" className="admin-brand">
          <img src={logoAllevent} alt="ALL EVENT" />
          <span>ALL EVENT Admin</span>
        </NavLink>
        <nav className="admin-nav" aria-label="Navigation administrateur">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'admin-nav-link active' : 'admin-nav-link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="admin-content">
        <Outlet />
      </main>
      <nav className="admin-mobile-tabbar" aria-label="Navigation mobile administrateur">
        {links.slice(0, 5).map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? 'admin-mobile-link active' : 'admin-mobile-link'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
