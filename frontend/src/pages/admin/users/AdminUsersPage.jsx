import { useState } from 'react'
import { adminUsersSeed } from '../adminMockData'
import './AdminUsersPage.css'

export function AdminUsersPage() {
  const [users, setUsers] = useState(adminUsersSeed)
  const toggleStatus = (id) =>
    setUsers((rows) =>
      rows.map((row) =>
        row.id === id
          ? { ...row, status: row.status === 'active' ? 'suspended' : 'active' }
          : row,
      ),
    )

  return (
    <section className="admin-users-page">
      <h1>Utilisateurs</h1>
      <div className="admin-list">
        {users.map((user) => (
          <article key={user.id} className="admin-row">
            <div><h2>{user.name}</h2><p>{user.role}</p></div>
            <div className="admin-row-actions"><span>{user.status}</span><button type="button" onClick={() => toggleStatus(user.id)}>Basculer</button></div>
          </article>
        ))}
      </div>
    </section>
  )
}
