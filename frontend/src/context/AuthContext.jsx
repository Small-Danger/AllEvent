import { useMemo, useState } from 'react'
import { AuthContext } from './AuthContextInstance'

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: 'guest',
  })

  const value = useMemo(() => ({ auth, setAuth }), [auth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
