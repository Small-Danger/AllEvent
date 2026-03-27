import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

export function RequireAuth() {
  const { auth } = useAuth()
  const location = useLocation()

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export function RequireRole({ allowedRoles }) {
  const { auth } = useAuth()

  if (!allowedRoles.includes(auth.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
