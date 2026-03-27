import { NavLink, Outlet } from 'react-router-dom'
import logoAllevent from '../assets/brand/logo-allevent.png'
import './prestataire-layout.css'

export function PrestataireLayout() {
  const links = [
    { to: '/prestataire/dashboard', label: 'Dashboard' },
    { to: '/prestataire/activities', label: 'Activites' },
    { to: '/prestataire/availability', label: 'Disponibilites' },
    { to: '/prestataire/reservations', label: 'Reservations' },
    { to: '/prestataire/reviews', label: 'Avis' },
    { to: '/prestataire/statistics', label: 'Stats' },
    { to: '/prestataire/ads', label: 'Publicites' },
    { to: '/prestataire/revenue', label: 'Revenus' },
    { to: '/prestataire/settings', label: 'Parametres' },
    { to: '/prestataire/suggestions', label: 'Suggestions' },
  ]

  return (
    <div className="prestataire-shell">
      <header className="prestataire-header">
        <NavLink to="/prestataire/dashboard" className="prestataire-brand">
          <img src={logoAllevent} alt="ALL EVENT" />
          <span>ALL EVENT Pro</span>
        </NavLink>
        <nav className="prestataire-nav" aria-label="Navigation prestataire">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'prestataire-nav-link active' : 'prestataire-nav-link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="prestataire-content">
        <Outlet />
      </main>

      <nav className="prestataire-mobile-tabbar" aria-label="Navigation mobile prestataire">
        {links.slice(0, 5).map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? 'prestataire-mobile-link active' : 'prestataire-mobile-link'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
