import { Link, Outlet } from 'react-router-dom'

export function PrestataireLayout() {
  return (
    <div>
      <nav style={{ padding: '12px 24px', borderBottom: '1px solid #ddd' }}>
        <Link to="/prestataire/dashboard">Dashboard</Link> |{' '}
        <Link to="/prestataire/activities">Activites</Link> |{' '}
        <Link to="/prestataire/statistics">Stats</Link>
      </nav>
      <Outlet />
    </div>
  )
}
