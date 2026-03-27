import { Link, Outlet } from 'react-router-dom'

export function AdminLayout() {
  return (
    <div>
      <nav style={{ padding: '12px 24px', borderBottom: '1px solid #ddd' }}>
        <Link to="/admin/dashboard">Admin dashboard</Link> |{' '}
        <Link to="/admin/users">Users</Link> |{' '}
        <Link to="/admin/disputes">Disputes</Link>
      </nav>
      <Outlet />
    </div>
  )
}
